---
date: 2013-06-13 17:01:48
layout: post
publish: true
tags: [django, form]
title: Neat and tidy read-only fields

---


I have a recurring pattern I'm seeing, where I have a field in a model that needs to be read-only. It usually is a ``Company`` to which an object belongs, but it also occurs in the case where an object belongs to some collection, and isn't permitted to be moved to a different collection.

Whilst there are some workarounds that apply the field's value to the instance after creating, it's nicer to be able to apply the read-only nature declaratively, and not have to remember to do something in the form itself.

Unfortunately, in django, normal field subclasses don't have access to the ``initial`` argument that was used to construct it. But ``forms.FileField`` objects do. So we can abuse that a little.

We also need a widget, that will always return ``False`` for questions about if the value has been changed, and re-render with the initial value at all times.

{% highlight python %}
from django import forms

class ReadOnlyWidget(forms.HiddenInput):
    def render(self, name, value, attrs):
      value = getattr(self, 'initial', value)
      return super(ReadOnlyWidget, self).render(name, value, attrs)
    
    def _has_changed(self, initial, data):
      return False

class ReadOnlyField(forms.FileField):
  widget = forms.HiddenInput
  
  def __init__(self, *args, **kwargs):
    forms.Field.__init__(self, *args, **kwargs)
  
  def clean(self, value, initial):
    self.widget.initial = initial
    return initial
{% endhighlight %}

So, that's all well and good. But a common use for me was for this field to be a related field: a ``Company`` as described above, or a ``User``.

Enter ``ReadOnlyModelField``, and ``ReadOnlyUserField``.

Now, ``ReadOnlyModelField`` is a bit tricky: it's not actually a class, but a factory function, so we will look at ``ReadOnlyUserField`` first:

{% highlight python %}
class ReadOnlyUserField(ReadOnlyField):
  def clean(self, value, initial):
    initial = super(ReadOnlyUserField, self).clean(value, initial)
    return User.objects.get(pk=initial)
{% endhighlight %}

Note, it will have a database query.

Now, we are ready to look at a more general case:

{% highlight python %}
def ReadOnlyModelField(ModelClass, *args, **kwargs):
  class ReadOnlyModelField(ReadOnlyField):
    def clean(self, value, initial):
      initial = super(ReadOnlyModelField, self).clean(value, initial)
      return ModelClass.objects.get(pk=initial)
  return ReadOnlyModelField(*args, **kwargs)
{% endhighlight %}

This is a bit tricky. We create a function that looks like a class, but actually creates a new class when it is called. This is so we can use it in a form definition:

{% highlight python %}
class MyForm(forms.ModelForm):
  company = ReadOnlyModelField(Company)
  
  class Meta:
    model = MyModel
{% endhighlight %}