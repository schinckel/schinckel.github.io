---
date: 2013-06-14 21:05:38
layout: post
publish: true
tags: [django, html, forms, fieldsets]
title: Django Fieldsets

---

  
HTML forms contain a construct called a ``fieldset``. These are generally used to segment a form: splitting a form into groups of fields that are logically grouped. Each fieldset may also have a legend.

Django's forms have no concept of a fieldset natively, but with a bit of patching, we can make every django form capable of rendering itself using fieldsets, yet still be backwards compatible with non-fieldset-aware templates.

Ideally, we would like to be able to render a form in a way similar to:

{% highlight html %}
{% raw %}
<form>
  {% for fieldset in form.fieldsets %}
  <fieldset>
    <legend>{{ fieldset.title }}</legend>
    
    <ul>
      {% for field in fieldset %}
        <li>
          {{ field.label_tag }}
          {{ field }}
          {{ field.help_text }}
          {{ field.errors }}
        </li>
      {% endfor %}
    </ul>
  </fieldset>
  {% endfor %}
  
  <!-- submit button -->
</form>
{% endraw %}
{% endhighlight %}

And, it would make sense to be able to declare a form's fieldsets in a manner such as:

{% highlight python %}
class MyForm(forms.Form):
  field1 = forms.BooleanField(required=False)
  field2 = forms.CharField()
  
  class Meta:
    fieldsets = (
      ('Fieldset title', {
        'fields': ('field1', 'field2')
      }),
    )
{% endhighlight %}

This is similar to how fieldsets are declared in the django admin.

We can't just simply create a subclass of ``forms.Form``, and do everything there, as the metaclass stuff doesn't work correctly.  Instead, we need to duck-punch.

First, we want to redefine the metaclass ``__init__`` method, so it will accept the ``fieldsets`` attribute.

{% highlight python %}
from django import forms
from django.forms.models import ModelFormOptions

_old_init = ModelFormOptions.__init__

def _new_init(self, options=None):
  _old_init(self, options)
  self.fieldsets = getattr(options, 'fieldsets', None)

ModelFormOptions.__init__ = _new_init

{% endhighlight %}

Next, we will need a ``Fieldset`` class:

{% highlight python %}
class Fieldset(object):
  def __init__(self, form, title, fields, classes):
    self.form = form
    self.title = title
    self.fields = fields
    self.classes = classes
  
  def __iter__(self):
    # Similar to how a form can iterate through it's fields...
    for field in self.fields:
      yield field

{% endhighlight %}

And finally, we need to give every form a ``fieldsets`` method, which will yield each fieldset, as a ``Fieldset`` defined above:

{% highlight python %}
def fieldsets(self):
  meta = getattr(self, '_meta', None)
  if not meta:
    meta = getattr(self, 'Meta', None)
  
  if not meta or not meta.fieldsets:
    return
  
  for name, data in meta.fieldsets:
    yield Fieldset(
      form=self,
      title=name,
      fields=(self[f] for f in data.get('fields',(,))),
      classes=data.get('classes', '')
    )

forms.BaseForm.fieldsets = fieldsets
{% endhighlight %}

I am using this code (or something very similar to it), in projects. It works for me, but your mileage may vary…