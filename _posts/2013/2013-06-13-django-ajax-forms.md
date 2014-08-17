---
date: 2013-06-13 16:40:33
layout: post
publish: true
tags: [django, forms, ajax]
title: Django AJAX Forms

---


I think the more [Django](http://www.djangoproject.com) code I write, the more I like one particular feature.

Forms.

Simple as that. Forms are the reason I keep coming back to django, and discard other web frameworks in other languages, even though I really want to try them.

One pattern I have been using a fair bit, which was touched on in another post, is using AJAX to handle form submission, and displaying the response.

Before we continue, a quick recap on what Django's forms offer us.

* A declarative approach to defining the fields a form has, including validation functions.
* Will render themselves to HTML input elements, as appropriate.
* Handle validation of incoming form-encoded (or otherwise provided) data.
* Fields can validate themselves, and can include validation error messages as part of the HTML output.
* (Model forms) handle instantiation of and updating of model instances.


A normal form-submission cycle contains a POST or GET request to the server, which responds with a fresh HTML page, which the browser renders. The normal pattern for successful POST requests is to redirect to a GET afterwards, to prevent duplicate submission of forms.

By doing an ajax request instead of a full-page request means we can:

* reduce the amount of data that is sent back from the server
* improve apparent performance by only re-rendering the relevant data
* reduce the amount of time spent rendering parts of the page that have not changed, such as menu, etc.

The way I have been doing it, in broad terms, is to have a template just for the form. If the request is an ajax request, then this will be rendered and returned. If it's not an ajax request, then the full page will be returned.

Some example code, for one way to do this:

{% highlight python %}
def view(request, pk):
  instance = MyModel.objects.get(pk=pk)
  
  if request.is_ajax():
    template = 'form.html'
  else:
    template = 'page.html'
  
  
  if request.method == 'POST':
    form = MyForm(request.POST, instance=instance)
    if form.is_valid():
      form.save()
      if not request.is_ajax():
        return redirect('redirect-name-here')
  else:
    form = MyForm(instance=instance)
  
  return render(request, template, {'form': form})
{% endhighlight %}

Our template files. ``page.html``:

{% highlight html %}{% raw %}
{% extends 'base.html' %}

{% block main %}
  {% include 'form.html' %}
{% endblock %}

{% block script %}
{# Assumes jQuery is loaded... #}
{# This should be in a seperate script file #}
<script>
$(document).on('submit', 'form.dynamic-form', function(form) {
  var $form = $(form);
  $.ajax({
    type: form.method,
    url: form.action,
    data: $form.serialize(),
    success: function(data) {
      $form.replace(data);
    }
  });
});
</script>
{% endblock %}{% endraw %}
{% endhighlight %}

And ``form.html``:

{% highlight html %}{% raw %}
<form action="/path/to/url/" method="POST" class="dynamic-form">
  {% csrf_token %}
  {{ form }}
  <button type="input">Submit</button>
</form>{% endraw %}
{% endhighlight %}

Obviously, this is a fairly cut-down example, but it gets the message across.

One thing I dislike in general about django is that failed form submissions are returned with a status code of 200: personally I think a 409 is more appropriate in most cases, but returning a 200 actually means this code is simpler.