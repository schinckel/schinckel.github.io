---
date: 2012-06-11 09:35:59
layout: post
publish: true
tags: [python, metaclass, django, registration, inheritance]
time: '09:35:59'
title: Metaclass magic registry pattern

---


The Registry Pattern is something I use relatively frequently. In django, for instance, we see it used for the admin interface, and I used very derivative code for my first API generation tool: `django-rest-api`. For our integration with external POS and other systems, we need to register importers, so that the automated stats fetching is able to look for units that need to fetch data from an external system's website, or parse incoming email headers for matching delivered data.

I had been using something similar to:

{% highlight python %}
from base import BaseStatsImporter, register

class FooStatsImporter(BaseStatsImporter):
    # ...

register(FooStatsImporter)
{% endhighlight %}

This is all well and good, but it is annoying. I need to remember to register each class after I declare it.

Then I discovered the magic of `__metaclass_`, used with `__new__`:

{% highlight python %}
class RegistryMetaClass(type):
    def __new__(cls, clsname, bases, attrs):
        new_class = super(cls, RegistryMetaClass).__new__(cls, clsname, bases, attrs)
        register(new_class)
        return new_class
        
class BaseStatsImporter(object):
    __metaclass__ = RegistryMetaClass
    
    # ...
{% endhighlight %}

As long as your subclasses don't override `__metaclass__`, then every new subclass will be added to the registry.

Obviously, this is magic, and in some cases the explicit way would be better.