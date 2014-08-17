---
date: 2013-02-07 01:52:05
layout: post
publish: true
tags: [jquery, django, ajax, forms, file-upload]
title: jQuery dynamic forms

---


Some javascript, currently using jQuery, that will convert a form into an ajax form.

First up, a shim to enable ``FormData`` for non-compliant browsers. Based on [formdata.js](https://github.com/francois2metz/html5-formdata/blob/master/formdata.js "FormData"), but with some changes. Man, callback based code is a bitch when all you need to do is get some value, and have to work around that.

{% highlight js %}
(function(w, $) {
  // Don't override if it is native.
  if (w.FormData)
    return;
      
  function FormData(form) {
    var fd = this;
    this.fake = true;
    this.boundary = "--------FormData" + Math.random();
    this._fields = [];
    this.contentType = 'multipart/form-data; boundary=' + this.boundary;
          
    if (form) {
      var $form = $(form);
      $.each($form.serializeArray(), function(i, obj){
        fd.append(obj.name, obj.value);
      });
      $form.find('[type=file]').each(function(i, file) {
        fd.append(file.name, file.files[0]);
      });
    }
  }
    
  // A listener to automatically add the binary version of the data. This may suck.
  $('[type=file]').change(function updateData(change) {
    var reader = new FileReader();
    reader.onload = function(load) {
      $(change.target.files[0]).data('binary-file-data', load.target.result);
    }
    reader.readAsBinaryString(change.target.files[0]);
  });
    
  // The interface FormData provides...
  FormData.prototype.append = function(key, value) {
    this._fields.push([key, value]);
  }
    
  // But, we will actually look more like a string to XMLHttpRequest.
  FormData.prototype.toString = function() {
    var boundary = this.boundary;
    var body = '';
    $.each(this._fields, function(i, field) {
      body += '--' + boundary + '\r\n';
      if (field[1].name) {
        var file = field[1];
        body += "Content-Disposition: form-data; name=\""+ field[0] +"\"; filename=\""+ file.name +"\"\r\n";
        body += "Content-Type: "+ file.type +"\r\n\r\n";
        body += $(file).data('binary-file-data') + "\r\n";
      } else {
        body += "Content-Disposition: form-data; name=\""+ field[0] +"\";\r\n\r\n";
        body += field[1] + "\r\n";
      }
    });
          
    body += "--" + boundary +"--";
    return body;
  }
  w.FormData = FormData;
})(window, jQuery);
{% endhighlight %}

Now, for the jQuery code. This will override the submit event on all forms. If there are any ``<input type=file>`` elements, then it will use a ``FormData`` object, else it will just ``.serialize()`` the object. The response will override the ``.html()`` content of the form, but not the form itself.

{% highlight js %}
$('form').submit(function(evt) {
  evt.preventDefault();
  var form = evt.target, $form = $(form), data;
  var options = {
    cache: false,
    type: form.method,
    url: form.action,
    done: function(data) {
      $form.html(data);
    },
    fail: function(xhr, status, error) {
      console.log(status, error, xhr);
    }
  };
    
  if ($form.find('[type=file]').length) {
    data = new FormData(form);
    // Native FormData objects set this automatically (how???), but we need to manually do it.
    options.contentType = data.contentType || false;
    options.processData = false;
  } else {
    data = $form.serialize();
  }
  options.data = data;
  $.ajax(options);
});
{% endhighlight %}