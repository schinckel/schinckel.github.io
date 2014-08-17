---
date: 2013-07-28 18:00:53
layout: post
publish: true
tags: [django, ORM, STI, inheritance, metaprogramming]
title: Django Single Table Inheritance on the cheap.

---

  
There was a recent question on Stack Overflow about Django Single Table Inheritance (STI). It got me thinking about how to use my FSM-proxy stuff to just be about STI.

Note: this only works when all sub-classes have the same fields: the example we are going to use
here is different to a state machine, in that an object may not change state after it has been created.

{% highlight python %}
class Sheep(models.Model):
  type = models.CharField(max_length=4)
  tag_number = models.CharField(max_length=64)

class Ram(Sheep):
  class Meta:
    proxy = True
  
class Ewe(Sheep):
  class Meta:
    proxy = True
{% endhighlight %}

In this case, we can fetch all sheep as ``Sheep.objects.all()``. However, this gives us the objects as ``Sheep`` instances, when we want those with `type='ram'` to return `Ram` instances, and those with `type='ewe'` to return `Ewe` instances.
  
We can do this, by the magic of ``type().__subclasses__()``.

{% highlight python %}
class Sheep(models.Model):
  # fields as above
  
  def __init__(self, *args, **kwargs):
    super(Sheep, self).__init__(*args, **kwargs)
    # If we don't have a subclass at all, then we need the type attribute to match
    # our current class. 
    if not self.__class__.__subclasses__():
      self.type = self.__class__.__name__.lower()
    else:
      subclass = [x for x in self.__class__.__subclasses__() if x.__name__.lower() == self.type]
      if subclass:
        self.__class__ = subclass[0]
      else:
        self.type = self.__class__.__name__.lower()
    
{% endhighlight %}

This will automatically downcast `Sheep` objects to the correct subclass, based upon the `type` field.

It also sets the `type` field on objects that are instantiated without one (based on the current instance class). This enables us to do things like:

{% highlight python %}
# Fetch all Sheep, downcast to correct subclass.
>>> Sheep.objects.all()
[<Ram: Ram object>, <Ram: Ram object>, <Ewe: Ewe object>]

# Automatically set the type on a class.
>>> Ram()
<Ram: Ram object>
>>> Ram().type
'ram'
>>> Sheep()
<Sheep: Sheep object>
>>> Sheep().type
'sheep'

# Automatically set the class on a valid subclass/type
>>> Sheep(type='ram')
<Ram: Ram object>
# Force the type field on an invalid type argument. [see below]
>>> Ram(type='ewe')
<Ram: Ram object>
>>> Sheep(type='foo')
<Sheep: Sheep object>
>>> Sheep(type='foo').type
'sheep'
{% endhighlight %}

The assumption I have made here is that when instantiating a class, and the type value is not a valid value (our class, or one of our subclasses), then it changes the type field to the current class.

The other assumption is that the parent class is also valid. In this case, it wouldn't be, as sheep must be either ewes or rams (or wethers, but that's another story).


We also need to be able to fetch `Ewe` and `Ram` objects using their manager. This is just as simple as filtering on the type.

{% highlight python %}
class ProxyManager(models.Manager):
  def get_query_set(self): # Note: get_queryset in Django1.6+
    return super(ProxyManager, self).get_query_set().filter(type=self.model.__name__.lower())

class Ram(Sheep):
  objects = ProxyManager()
  class Meta:
    proxy = True

class Ewe(Sheep):
  objects = ProxyManager()
  class Meta:
    proxy = True
{% endhighlight %}

Now, we can do:

{% highlight python %}
>>> Ram.objects.all()
[<Ram: Ram object>, <Ram: Ram object>]
{% endhighlight %}

Clearly, the models have been simplified: I have not shown any model methods that would be the different behaviours that the subclasses have.