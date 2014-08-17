---
date: 2014-03-28 09:45:03
layout: post
publish: true
tags: [django, CBV, decorators]
title: Get the class of a Django view function

---

  
  
I needed to be able to get the class of a view function, once it had been instantiated via `MyView.as_view()`. I'd done something similar in the past to get the base callable view, but this was slightly different.

{% highlight python %}
from django.views.generic.base import View

def get_class(func):
    if not getattr(func, 'func_closure', None):
        return
        
    for closure in func.func_closure:
        contents = closure.cell_contents
        
        if not contents:
            continue
        
        if getattr(contents, '__bases__', None) and issubclass(contents, View):
            return contents
        
        result = get_class(contents)
        if result:
            return result
{% endhighlight %}

This is a recursive function that does a depth-first search on the function object, until it finds an object that is a class, and is a subclass of ``django.views.generic.base.View``.

You can use it like:

{% highlight python %}
from django.core.urlresolvers import resolve
view = resolve('/path/to/url')

view_class = get_class(view.func)
{% endhighlight %}
