---
date: 2013-03-22 22:15:54
layout: post
publish: true
tags: [django, cbv, ajax]
title: Django AJAX Edit Mode

---


I can't even remember where I saw this, but the suggestion was that viewing and editing data are different operations, and should be different modes. 

For instance, when viewing some data, you would need to explicitly decide to enter the edit mode. In a web page, this would be by following a link to a page that had a form that allowed for editing. Attempting to submit the form would result in either the same page being displayed, along with any validation errors, or being redirected back to the viewing page.

This is the pattern I've been working on implementing with a module for our work system. However, we can reduce the amount of data sent, and the amount of page redraw, by using dynamic element replacement. So, we can have some AJAX that loads in the edit form in-place, and replaces the view form. Saving it then either returns the edit form with validation errors, or the view form again.

We can do all of this with one view. Depending upon how it is accessed, it will return either a different template, or render the template differently.

## Solution One: render a different template.

{% highlight python %}
# views.py
from django.views import generic

class AjaxEditView(generic.UpdateView):
  model = MyModel
  
  def get_template_names(self):
    if self.request.is_ajax():
      if 'edit' in self.request.GET:
        return 'partial/edit.html'
      return 'partial/display.html'
    return 'detail.html'
  
  def get_success_url(self):
    return reverse('mymodel_detail', kwargs={'pk': 1})
{% endhighlight %}

The disadvantages of this are that we need to name the url route, and use it here in this view, and that we have different templates. The templates are almost identical, however:

{% highlight html %}{% raw %}
<!-- partial/display.html -->
{% load url from future %}

<form method="GET" action="{% url 'mymodel_detail' object.pk %}">
  <button>EDIT</button>
  <input type="hidden" name="edit" value="1">
  
  <table>
    {% for field in form %}
      <tr>
        <th>{{ field.label }}</th>
        <td>{{ field.value }}</td>
      </tr>
    {% endfor %}
  </table>
</form>
{% endraw %}{% endhighlight %}

{% highlight html %}{% raw %}
<!-- partial/edit.html -->
{% load url from future %}

<form method="POST" action="{% url 'mymodel_detail' object.pk %}">
  <button type="submit">SAVE</button>
  <a class="cancel" href="{% url 'mymodel_detail' object.pk %}">CANCEL</a>
  
  {% csrf_token %}
  
  <table>
    {% for field in form %}
    <tr>
      <th>{{ field.label }}</th>
      <td>{{ field.errors }}{{ field }}</td>
      <td>{{ field.help_text }}</t>
    </tr>
    {% endfor %}
  </table>
  
</form>
{% endraw %}{% endhighlight %}

The ``partial/display.html`` template has a few things of note: it has a ``method="GET"``, and a single ``<input>`` element, which tells the view to render the response on a ``GET`` request ready for editing.

The ``partial/edit.html`` template has a link/button for cancelling. In this case, we could look at the form for the location we should load, but this is a bit more explicit.

## Solution Two: context_data variable

The other solution uses just one AJAX template, but adds to the ``context`` of the view if it should be rendered in editable form or not.

{% highlight python %}
# views.py
from django.views import generic

class AjaxEditView(generic.UpdateView):
  model = MyModel
  
  def get_context_data(self, **context):
    context['edit'] = self.request.GET.get('edit', False)
    return super(AjaxEditView, self).get_context_data(**context)
    
  def get_template_names(self):
    if self.request.is_ajax():
      return 'partial/form.html'
    return 'detail.html'
  
  def get_success_url(self):
    return reverse('mymodel_detail', kwargs={'pk': 1})
{% endhighlight %}

And our template looks like:

{% highlight html %}{% raw %}
<!-- partial/form.html -->
{% load url from future %}

<form method="{% if edit %}POST{% else %}GET{% endif %}" 
      action="{% url 'user_detail' object.pk %}">
  
  <button type="submit">
    {% if edit %}SAVE{% else %}EDIT{% endif %}
  </button>
  
  {% if edit %}
    <a class="cancel" href="{% url 'user_detail' object.pk %}">
      CANCEL
    </a>
    {% csrf_token %}
  {% else %}
    <input name="edit" type="hidden" value="1">
  {% endif %}
  
  <table>
    {% for field in form %}
    <tr>
      <th>{{ field.label }}</th>
      <td>
        {% if edit %}
          {{ field.errors }}{{ field }}
        {% else %}
          {{ field.value }}
        {% endif %}
      </td>
      {% if edit %}
      <td>{{ field.help_text }}</td>
      {% endif %}
    </tr>
    {% endfor %}
  </table>
  
</form>
{% endraw %}{% endhighlight %}

The downside of this one is that the template is much more complicated. I've been using the latter in a work project, but I may switch later.

The last part that ties all of this together is the Javascript. It's fairly simple, written using jQuery:

{% highlight js %}
$(function() {
  // Submit handler. Simply submit the form, and replace the
  // form in it's entirety with the response from the server.
  $(document).on('submit', 'form', function(evt) {
    var form = evt.target;
    var $form = $(form);
    evt.preventDefault();
    $.ajax({
      url: form.action,
      type: form.method,
      data: $form.serialize(),
      success: function(data){
        $form.replaceWith($.parseHTML(data));
      }
    });
  });
  
  // Cancel editing button handler. Do an ajax fetch on the
  // url of the button, and replace the parent form with
  // the response from the server.
  $(document).on('click', '.cancel', function(evt) {
    evt.preventDefault();
    $.ajax({
      url: evt.href,
      success: function(data){ 
        $(evt.target).closest('form').replaceWith($.parseHTML(data));
      }
    });
  });
});
{% endhighlight %}

The other thing that it is possible to do is make it so that the edit button will only display if the logged in user is permitted to edit that object.

In practice, I'm combining multiple display/edit views within one view (for related concepts: for instance Bank account details, Tax File Number and Superannuation details in the one page, but they have seperate models). I have some ideas about a nice way to handle this, but that's for another post.

There is a project available on bitbucket that demonstrates this: [dynamic-form-demo](https://bitbucket.org/schinckel/dynamic-form-demo). There is a seperate branch for each solution outlined above.