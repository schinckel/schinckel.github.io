---
date: 2013-06-13 17:28:48
layout: post
publish: true
tags: [django, finite-state-machine, proxy-models, class-swizzling]
title: Django Proxy Model State Machine

---

  
Finite State Machines (fsm) are a great way to model something that has, well, a finite number of known states. You can easily specify the different states, and the transitions between them.

Some time ago, I came across a great way of doing this in python: [Dynamic State Machines](http://harkablog.com/dynamic-state-machines.html). This maps well onto an idea I have been toying with lately, replacing a series of linked models representing different phases in a process with one model type. Initially, I had thought to just use a `type` flag, but actually changing the class seems like a better idea.

One aspect of django's models that makes it easy to do this is the concept of a Proxy Model. These are models that share the database table, but have different class definitions. However, usually a model instance will be of the type that was used to fetch it:

{% highlight python %}
class ModelOne(models.Model):
  field = models.CharField()
  
class ModelOneProxy(ModelOne):
  class Meta:
    proxy = True

ModelOneProxy.objects.get(pk=1) # Returns a ModelOneProxy object.
ModelOne.objects.all() # Returns all ModelOne objects.
{% endhighlight %}

However, by using a type field, we can, at the time it is fetched from the database, turn it into the correct type.

{% highlight python %}
class StateMachineModel(models.Model):
  status = models.CharField(max_length=64)
  
  def __init__(self, *args, **kwargs):
    super(StateMachineModel, self).__init__(*args, **kwargs)
    self.__class__ = class_mapping[self.status]
{% endhighlight %}

However, having to store a registry of ``status`` : ``<ProxyModelClass>`` objects is not much fun.

Enter ``__subclasses__``.

{% highlight python %}
  @property
  def _get_states(self):
    """
    Get a mapping of {status: SubClass, ...}
    
    The status key will be the name of the SubClass, with the
    name of the superclass stripped out.
    
    It is intended that you prefix your subclasses with a meaningful
    name, that will be used as the status value.
    """
    return dict([
      (
        sub.__name__.lower().replace(self.__class__.__name__, ''),
        sub
      ) for sub in self.__class__.__subclasses__()
    ])
  
  # in __init__, above, replace the last line with:
    self.__class__ = self._get_states[self.status]
{% endhighlight %}

Now, we need to change the underlying class when the type gets changed

{% highlight python %}
  def __setattr__(self, attr, value):
    if attr == 'status':
      states = self._get_states
      if value in states:
        self.__class__ = states[value]
    return super(StateMachineModel, self).__setattr__(attr, value)
{% endhighlight %}

As the docstring on ``_get_states`` indicates, it looks at the subclass name, and compares it to the superclass name to work out the values that will be stored as the status (and used to dynamically change the class).

This has a fairly large implication: you cannot fetch database objects of any of the subclass types directly: you would need to:

{% highlight python %}
SuperClass.objects.filter(status="prefix")
{% endhighlight %}

Of course, you could use queryset methods to do this: that's what I have been doing.

This is still a bit of a work in progress: it's not well tested, but is an interesting idea.

The full version of this model class, which is slightly different to above:

{% highlight python %}
from django.db import models

class StateMachineModel(models.Model):
    status = models.CharField(max_length=64)
    
    class Meta:
        abstract = True
    
    def __init__(self, *args, **kwargs):
        self._states = dict([
            (sub.__name__.replace(self.__class__.__name__, '').lower(), sub)
            for sub in self.__class__.__subclasses__()
        ])
        super(StateMachineModel, self).__init__(*args, **kwargs)
        self._meta.get_field_by_name('status')[0]._choices = [(x, x) for x in self._states.keys()]
        self._set_state()
            
    def _set_state(self):
        if getattr(self, 'status', None) in self._states:
            self.__class__ = self._states[self.status]
    
    def __setattr__(self, attr, value):
        if attr == 'status':
            self._set_state()
        return super(StateMachineModel, self).__setattr__(attr, value)
{% endhighlight %}