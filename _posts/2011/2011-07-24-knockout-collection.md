---
date: 2011-07-24 22:21:27
layout: post
publish: true
tags: [knockoutjs, jquery, ajax]
time: '22:21:27'
title: Knockout Collection

---


I am loving KnockoutJS. It makes it super easy to bind data values to UI elements in a declarative manner. You no longer have to worry about callbacks updating your data model and/or your view widgets.

The addition to KnockoutJS that I have been working on is a 'collection', that can be used to contain a set of objects, which can be fetched from a server, and each of which has it's own resource URI that will be used to update or delete it.

For instance, we may have a collection URI:

    GET "http://example.com/people/"

When we access this using a `GET` request, we might see something like:

{% highlight json linenos %}
[
  {
    "first_name": "Adam",
    "last_name": "Smith",
    "links": [
      {"rel":"self", "uri": "http://example.com/people/552/"}
    ]
  },
  {
    "first_name": "John",
    "last_name": "Citizen",
    "links": [
      {"rel":"self", "uri": "http://example.com/people/32/"}
    ]
  }  
]
{% endhighlight %}

Each linked resource contains the full (or as much as the logged-in user is able to see) representation. Example:

    GET "http://example.com/people/552/"

{% highlight json linenos %}
{
  "first_name": "Adam",
  "last_name": "Smith",
  "date_of_birth": "1910-02-11",
  "email": "adam.smith@example.com",
  "links": [
    {"rel":"self", "uri": "http://example.com/people/552/"}
  ]
}
{% endhighlight %}

Now, this is just the beginning. Obviously, we want to turn all of these fields into observables. I also wanted to know when any data had changed (so the "Save" button can be disabled when the object is not dirty). Clearly, being able to write the data back to the server, as well as create new objects, and delete them. Further, I needed to be able to do conditional reads and writes (only allow the object to be saved if no-one else has touched it since we last fetched it).

The place where the ko.mapping plugin broke down for me was that updating the resource from the full representation didn't add the new fields that came back from the server. It may be that indeed this is possible (I think it is), but at the time, I could not see how to do this. It may be that I will rewrite this to use the ko.mapping stuff, but I'm not so sure right now.

Anyway, after a couple of revisions, I have a working framework.

To use it, you can just do:

{% highlight javascript linenos %}
// Add a dependentObservable called 'name'.
var processPerson = function(item) {
  item.name = ko.dependentObservable(function(){
    return item.first_name() + ' ' + item.last_name();
  });
};

var people = ko.collection({
  url: "http://example.com/people/",
  processItem: processPerson
});
{% endhighlight %}

There is one main caveat at this stage:

* It is expected that each object will have a 'name' property. If your server does not return one, you'll need to setup a dependentObservable as shown in processPerson above.


First, the ko.collection object:

{% highlight javascript linenos %}
ko.collection = function(options) {
  // Let jQuery know we always want JSON
  $.ajaxSetup({
    contentType: 'application/json',
    dataType: 'json',
    cache: false // This is browser cache! Needs to be set for Firefox.
  });
  
  options = options || {};
  var url = options.url;                  // Allow passing in a url.
  var processItem = options.processItem;  // Allow passing in a function to process each item after it is fetched.
  var etag;
  
  
  // Initial setup. We need to set these early so we can access them, even
  // if we have no data for them.
  var self = {
    items: ko.observableArray([]),
    selectedItem: ko.observable(null),
    selectedIndexes: ko.observableArray([]),
    filters: ko.observable({})
  };
  
  /*
  Message handling.
  
  We have a messages observableArray, but we use this dependent observable
  to access it. This allows us to have messages that expire.
  
  self.messages() => provide access to the array of messages.
  self.messages({
    type: "error|notice|warning|whatever",    => This will usually be used to apply a class
    message: "Text of message",               => This text will be displayed
    timeout: 1500                             => If this is non-zero, message expires (and 
                                                 is automatically removed after this many 
                                                 milliseconds)
  });
  
  Every message object gets given a callback function (.remove()), that,
  when executed, well immediately remove that message, and get rid of the
  timer that normally removes that message after timeout.
  
  The messages object is also given a flush() function, that will remove
  all of the messages within it.
  
  Not sure if I should move this to a seperate plugin?
  */
  var messages = ko.observableArray([]);
  self.messages = ko.dependentObservable({
    read: function() {
      return messages();
    },
    write: function(message) {
      var timeout;
      message.remove = function() {
        messages.remove(message);
        clearTimeout(timeout);
      };
      messages.remove(function(item) {
        return item.message === message.message;
      });
      messages.push(message);
      if (message.timeout) {
        timeout = setTimeout(function(){
          messages.remove(message);
        }, message.timeout);
      }
    }
  });
  self.messages.flush = function() {
    $.each(messages, function(message){
      message.remove();
    });
  };
    
  /*
  filteredItems : a subset of self.items() that has been passed through
                  all of the self.filters(), and selects only those that
                  match. A filter must be an object of the form:
                  {
                    value: ko.observable(""),
                    attr: "name",
                    test: function(test_value, obj_value) {}
                  }
                  
                  The filtering code handles getting the correct values to
                  pass to the test function, the attr is the name of the 
                  attribute on each member of self.items() that will be
                  tested.
                  Having 'value' passed in means we can have a default
                  value when app starts.
  */
  self.filteredItems = ko.dependentObservable(function() {
    var filteredItems = self.items();
    $.each(self.filters(), function(name, filt){
      filteredItems = ko.utils.arrayFilter(filteredItems, function(item){
        if (!filt.attr || !item[filt.attr]) {
          return true;
        }
        return filt.test(filt.value(), item[filt.attr]());
      });
    });
    return filteredItems;
  });
  
  /*
    This is really only used by a select[multiple] object, and is used in
    conjunction with selectedIndexes.
    
    TODO: make this a writeable dependentObservable.
  */
  self.selectedItems = ko.dependentObservable(function() {
    return self.items().filter(function(el){
      return $.inArray(self.items().indexOf(el), self.selectedIndexes()) >= 0;
    });
  });
  
  /*
    Filter self.items() finding only those that have at least one attribute
    that is marked as dirty.
  */
  self.dirtyItems = ko.dependentObservable(function() {
    return self.items().filter(function(el){
      return el.isDirty();
    });
  });
  
  /*
    Filter self.items(), finding only those that have at least one attribute
    marked as conflicted.
  */
  self.conflictedItems = ko.dependentObservable(function() {
    return self.items().filter(function(el){
      return el.hasConflicts();
    });
  });
  
  self.setSource = function(newUrl) {
    url = newUrl;
  };
  
  /*
    Fetch all items from the url we have for the index.
    
    It is allowable that the index does not return the full body of each
    item, but instead only contains perhaps a name, and links for that
    item. Then, we can use self.selectedItem().fetch() to get the full
    data for the item.
  */
  self.fetchItems = function() {
    if (!url) {
      return;
    }
    var headers = {};
    if (etag) {
      headers['If-None-Match'] = etag;
    }
    $.ajax({
      url: url,
      type: "get",
      headers: headers,
      statusCode: {
        200: function(data, textStatus, jqXHR) {
          // Successful. If we already had objects, then
          // we need to update that list.
          $.each(self.items(), function(i, item){
            // Is there an item in the new data items list that matches
            // the item we are now looking at?
            var matchingItem = data.filter(function(el){
              links = el.links.filter(function(link){
                return link.rel==="self";
              });
              return links[0] && links[0].uri === item._url();
            })[0];
            if (matchingItem) {
              // Update the item that matched.
              item.updateData(matchingItem);
              if (processItem) {
                processItem(item);
              }
              // Remove from data.
              data.splice(data.indexOf(matchingItem), 1);
              // Not sure if this should be here.
              // item.isDirty(false);
            } else {
              // Not found in incoming data: remove from our local store.
              // Will this break $.each(self.items(), ...) ?
              self.items.remove(item);
            }
          });
          
          // Any items that we have left in data (which will be all if we
          // haven't loaded this up before) now need to be added to items().
          // On a clean fetch, this will be the first code that is run.
          $.each(data, function(i, el){
            var item = ko.collectionItem(el, self);
            if (processItem) {
              processItem(item, el);
            }
            self.items.push(item);
          });
          
          // Finally, update the etag.
          etag = jqXHR.getResponseHeader('Etag');
        }
      }
    });
  };
  
  /*
    A shortcut method that allows us to bind an action to fetch the
    data from the server for the currently selected item.
  */
  self.fetchSelectedItemDetail = function(evt) {
    if (self.selectedItem && self.selectedItem()) {
      self.selectedItem().fetch();
    }
  };
  
  /*
    Create an item. I haven't implemented this yet, because I haven't 
    figured out a way to see what fields are needed to be created when
    there are no currently loaded items. I'm thinking about using a
    Wizard in my application, so this might be overridden by the app.
  */
  self.createItem = function(evt) {
    console.log("ADDING ITEM (NOT FINISHED YET)");
    // The trick here is knowing what fields need to be created.
    // self.items.push(ko.collectionItem({}));
  };
  
  /*
    Permanently remove the selectedItem, and delete it on the server.
  */
  self.removeSelectedItem = function(evt) {
    if (self.selectedItem && self.selectedItem()) {
      var sure = confirm("This will permanently remove " + self.selectedItem().name());
      if (sure){
        self.selectedItem().destroy();        
      }
    }
  };
  
  /*
    Iterate through self.items(), finding those that match all of the data
    we pass in.
    
    For instance, you can do things like: 
    
      viewModel.findMatchingItems({date_of_birth: "1995-01-01"})
    
    This is used internally to find matches for objects when updating. Not
    sure why it is exposed as a public member function though.
  */
  self.findMatchingItems = function(options) {
    return self.items().filter(function(el){
      var match = true;
      $.each(options, function(opt, val) {
        if (el[opt]() !== val) {
          // Returning false causes $.each to stop, too.
          return match = false;
        }
      });
      return match;
    });
  };
    
  if (url) {
    self.fetchItems();
  }
  
  return ko.observable(self);
};
{% endhighlight %}

Second, the ko.collectionItem object. This may be eventually hidden in the collection object, as it isn't really intended to be used seperately.

{% highlight javascript linenos %}
ko.collectionItem = function(initialData, parentCollection) {
  var self = {
    isFetched: ko.observable(false)
  };
  var links = [];
  var etag = null;
  var url = null;
  var attributes = ko.observableArray([]);
  var collection = parentCollection;
  var dirtyFlag = ko.observable(false);
  
  /* Private methods */
  
  /*
    Given the incoming 'data' for this object, look through the fields for
    things that differ between the server representation and the client
    representation. Store both values for any differences in an attribute
    of the observable called conflicts().
    
    For each conflict, create a member function on the observable that
    allows you to resolve the conflict. When the last conflict is resolved,
    our etag is updated to the value the server gave us.
    
    This method returns true if all conflicts could be resolved (ie, the
    data in all fields was the same, just the etag had changed).
  */
  var parseConflicts = function(data, newEtag) {
    $.each(data, function(attr, value){
      if (attr !== "links") {
        if ($.compare(value, self[attr]() === undefined ? "" : self[attr]())) {
          // Server and client values match.
          // We need to do some funky stuff with undefined values, and treat
          // them as "". I don't really like this, but it works for now.
          self[attr].conflicts([]);
          self[attr].resolveConflict = function(){};
        } else {
          self[attr].conflicts([value, self[attr]() === undefined ? "" : self[attr]()]);
          self[attr].resolveConflict = function(chosenValue) {
            // Mark the entire object as dirty, so we can allow it to be
            // saved, even if we set it to the original value we had (which
            // differed from the server's value).
            self.isDirty(true);
            self[attr](chosenValue);
            self[attr].conflicts([]);
            if (!self.hasConflicts()) {
              // If this was the last conflict, we can use the new etag from
              // the server.
              etag = newEtag;
            }
          };
        }        
      }
    });
    var conflicts = self.hasConflicts();
    if (!conflicts) {
      etag = newEtag;
    }
    return !conflicts;
  };
  
  /*
  Given an object containing errors, we want to apply each of these
  errors onto the relevant field. We want to remove any errors that are
  already on any field.
  
  If we have any errors leftover, we need to notify globally, using the
  parentCollection's messages object.
  */
  var markErrors = function(errors) {
    $.each(attributes(), function(i,attr){
      if (!self[attr].errors) {
        self[attr].errors = ko.observableArray([]);
      }
      if (errors[attr]) {
        self[attr].errors(errors[attr]);
        delete errors[attr];
      } else {
        self[attr].errors([]);
      }
    });
    
    $.each(errors, function(field){
      parentCollection.messages({type:"error", message: field + ": " + errors[field].join("<br>"), timeout: 3000});
    });
  };
  
  /*
    Get the attributes ready for sending to the server.
    
    We can't just iterate through properties, as some will not apply. We
    use the convention that we will only send back properties that the
    server sent to us.
  */
  var prepareAttributes = function() {
    var data = {};
    $.each(attributes(), function(i,attr){
      data[attr] = self[attr]();
    });
    return data;
  };
  /* Public methods */
  
  /*
    Update the data fields associated with this object from the provided
    data.
    
    This may create new attributes, which need to be noted so we can send
    those values back to the server.
    
    We can mark all updated attributes as not dirty, not conflicted, and
    not having errors.
  */
  self.updateData = function(data) {
    if (data.links) {
      // We want to store the links, but not attach them to the object.
      links = data.links;
      delete data.links;
      $.each(links, function(i, obj){
        if (obj.rel === "self") {
          url = obj.uri;
        }
      });
    }
    
    $.each(data, function(attr, value){
      if (attributes().indexOf(attr) < 0) {
        self[attr] = ko.observable(value);
        self[attr].errors = ko.observableArray([]);
        self[attr].conflicts = ko.observableArray([]);
        ko.dirtyFlag(self[attr], false);
        // Need to add this last to cause the dirtyFields dependentObservable
        // to work correctly when editing the last field.
        attributes.push(attr);
      } else {
        self[attr](value);
        self[attr].errors([]);
        self[attr].conflicts([]);
        self[attr].isDirty.reset();
      }
    });
    // Put the links back in case a post-processor needs them.
    data.links = links;
  };
  
  self.serialize = function(evt) {
    return JSON.stringify(prepareAttributes());
  };
  
  /*
    Discard any local changes, and pull the data from the server.
  */
  self.revert = function(evt) {
    etag = null;
    self.fetch();
    parentCollection.messages({type:'warning', message:'The object "' + self.name() + '" was reverted to the version stored on the server.', timeout: 5000});
  };
  
  /*
    Attempt to save the data to the server.
    
    Only permitted to do this if we have successfully fetched the data
    at some point.
    
    Notes: We use POST instead of PUT, in case we do not have access to
           all of the fields of the object. PUT implies the complete resource
           is being updated.
           Errors may come back in {'field-errors': []}, or {'detail':[]}.
           Currently, this makes assumptions about server type, which are
           bad. I need to refactor the error handling code. (400,409)
           Precondition Failed (412) needs to be handled differently, as
           we need to fetch the data from the server if none was provided
           as to the current state of the resource.
           
  */
  self.save = function(evt) {
    if (self.isFetched()) {
      $.ajax({
        url: url,
        type: 'post', // We can't PUT in case we don't know about all fields.
        headers: {'If-Match': etag},
        data: self.serialize(),
        statusCode: {
          200: function(data, textStatus, jqXHR) {
            // Object saved.
            // Incase some fields were reformatted by the server, redo our data.
            self.updateData(data);
            etag = jqXHR.getResponseHeader('Etag');
            parentCollection.messages({type:'success', message:'The object "' + self.name() + '" was saved.', timeout: 2500});
            self.isDirty(false);
          },
          201: function(data, textStatus, jqXHR) {
            // Object saved for the first time (created)
            // Incase some fields were reformatted by the server, redo our data.
            self.updateData(data);
            etag = jqXHR.getResponseHeader('Etag');
            url = jqXHR.getResponseHeader('Location');
            parentCollection.messages({type:'success', message:'The object "' + self.name() + '" was created.', timeout: 2500});
            self.isDirty(false);
          },
          400: function(jqXHR, textStatus, errorThrown) {
            var data = JSON.parse(jqXHR.responseText);
            if (data['field-errors']) {
              markErrors(data['field-errors']);
            }
            parentCollection.messages({type:'error', message:'The object "' + self.name() + '" could not be saved. Please check the highlighted field(s).', timeout: 10000});
          },
          409: function(jqXHR, textStatus, errorThrown) {
            // Errors saving the data. Likely to be validation errors.
            // We should have a detail object with info to display.
            var data = JSON.parse(jqXHR.responseText);
            if (data.detail) {
              markErrors(data.detail);
            }
            parentCollection.messages({type:'error', message:'The object "' + self.name() + '" could not be saved. Please check the highlighted field(s).', timeout: 10000});
          },
          412: function(jqXHR, textStatus, errorThrown) {
            // Data was changed on server since we last fetched it.
            // There may be conflicts to deal with.
            // See if the server gave us a current version back...
            var data, serverEtag;
            if (jqXHR.responseText) {
              data = JSON.parse(jqXHR.responseText);
            } else {
              $.ajax({
                url: url,
                async: false,
                success: function(newData, textStatus, jqXHR) {
                  data = newData;
                  serverEtag = jqXHR.getResponseHeader('Etag');
                }
              });
            }
            if (parseConflicts(data, serverEtag)) {
              // We were able to resolve all of the conflicts, now we can
              // try to re-save; but only if it was the first time we saved,
              // to prevent inifinite recursion.
              if (evt) {
                self.save();
              }
            } else {
              parentCollection.messages({type:'error', message:'The object "' + self.name() + '" has been modified on the server. Please check the changed field(s) and select the appropriate value(s).', timeout: 10000});
            }
          }
        }
      });
    }
  };
  
  /*
    Permanently delete the object from the server.
  */
  self.destroy = function(evt) {
    if (self.isFetched() && etag) {
      console.log("DELETING ITEM");
      $.ajax({
        url: url,
        type: 'delete',
        headers: {'If-Match': etag},
        success: function(data, textStatus, jqXHR) {
          if (collection) {
            collection.items.remove(self);
          }
          parentCollection.messages({type:'success', message:'The object "' + self.name() + '" was deleted.', timeout: 2500});
        },
        error: function(jqXHR, textStatus, errorThrown) {
          // Display error message about not being able to delete?
          parentCollection.messages({type:'error', message:'The object "' + self.name() + '" could not be deleted.', timeout: 10000});
        }
      });
    }
  };
  
  /*
    (Re)Fetch the resource from the server.
    
    Handle conflicts if the arise (when the object has already been fetchd)
  */
  self.fetch = function(evt) {
    var headers = {};
    if (etag) {
      headers['If-None-Match'] = etag;
    }
    $.ajax({
      type: 'get',
      url: url,
      headers: headers,
      statusCode: {
        200: function(data, textStatus, jqXHR) {
          // If we have an etag already, this means the object has been
          // updated on the server, and we need to look for conflicts.
          if (etag) {
            var serverEtag = jqXHR.getResponseHeader('Etag');
            // If we were unable to handle all conflicts, we need to exit.
            if (!parseConflicts(data, serverEtag)) {
              parentCollection.messages({type:'error', message:'The object "' + self.name() + '" has been modified on the server. Please check the changed field(s) and select the appropriate value(s).', timeout: 10000});
              return;
            };
          }
          
          // Otherwise, we can update the data and the etag.
          self.updateData(data);
          etag = jqXHR.getResponseHeader('Etag');
          self.isFetched(true);
        },
        304: function() {
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        parentCollection.messages({type:"error", message:"There was an error fetching the data from the server"});
      }
    });
  };
  
  
  
  /* Dependent Observables */
  self.dirtyFields = ko.dependentObservable(function(){
    return ko.utils.arrayFilter(attributes(), function(attr){
      return self[attr] && self[attr].isDirty && self[attr].isDirty();
    });
  });
  
  self.conflictedFields = ko.dependentObservable(function() {
    return ko.utils.arrayFilter(attributes(), function(attr){
      return self[attr] && self[attr].conflicts && self[attr].conflicts().length > 0;
    });
  });
  
  var filterAttributes = function(property) {
    return function() {
      return ko.utils.arrayFilter(attributes(), function(attr){
        return self[attr] && self[attr][property] && self[attr][property]().length > 0;
      }).length > 0;
    };      
  };
  
  self.hasErrors = ko.dependentObservable(filterAttributes('errors'));
  self.hasConflicts = ko.dependentObservable(filterAttributes('conflicts'));
  
  /*
    An object is dirty when:
      - any of its fields/attributes are dirty. (we aks them), OR
      - we have explicitly marked it as dirty.
      
    We need to do the latter for when we have merged a conflict, by choosing
    our value, which differed from the server. The local model would
    normally think it wasn't dirty, but it differs from the server, and
    does need to be saved.
  */
  self.isDirty = ko.dependentObservable({
    read: function() {
      return self.dirtyFields().length > 0 || dirtyFlag();
    },
    write: function(value) {
      dirtyFlag(value);
      if (!value) {
        $.each(attributes(), function(attr){
          if (self[attr] && self[attr].isDirty) {
            console.log(attr);
            self[attr].isDirty.reset();          
          }
        });
      }
    }
  });
  
  /*
    Can this object be saved back to the server?
    Only when it is dirty, and has been fetched.
  */
  self.canSave = ko.dependentObservable(function() {
    return self.isDirty() && self.isFetched();
  });
  
  self._etag = function(){return etag;};
  self._attributes = function(){ return attributes();};
  self._url = function() {return url;};
  
  if (initialData) {
    self.updateData(initialData);
  }
  
  return self;
};
{% endhighlight %}