---
date: 2012-01-20 22:00:18
layout: post
publish: true
tags: [python, decorators, metaprogramming, django]
time: '22:00:18'
title: Get decorators wrapping a function

---


I mentioned a week or so ago about my django templatetag that will only display a menuitem or link if the logged in user has access to the view that it points to. In passing, I stated how it was rather complicated to do this test.

The complicated bit is finding out all of the decorators that are wrapping a given function. Fortunately, python is a dynamic language, and this type of introspection, whilst not completely simple, is possible.

The key lies in the property that all function objects in python have: `func_closure`. According to the python docs:

> `func_closure` is `None` or a tuple of cells that contain binding for the function's free variables

Depending upon where you read this, it may or may not be writable. Luckily, we don't need to be able to write to this, only read from it.

If `func_closure` is not `None`, then it will be a tuple of ``<cell>`` objects. To do anything useful, we'll need to look at their `cell_contents` attribute. If that is callable, then it's a good candidate for a decorator.
  
Because of the way decorators work, if you have multiple decorators on a function, each one wraps the next one. Thus, we'll need to have some recursion in there.

At a first draft, we might end up with something like:

{% highlight python %}
def get_decorators(function):
  # If we have no func_closure, it means we are not wrapping any other functions.
  if not function.func_closure:
    return [function]
  decorators = []
  # Otherwise, we want to collect all of the recursive results for every closure we have.
  for closure in function.func_closure:
    decorators.extend(get_decorators(closure.cell_contents))
  return [function] + decorators
{% endhighlight %}

It's important that we return the original function in the base case of the recursive function, as eventually, every closure will fold down to a single callable. It has the side effect that `get_decorators` will get all of the decorators, and the function they ultimately wrap.

You could probably also do this as a generator.

For basic django function views, this will work fine. For class-based views, we need to do something a little extra.

In the case I was writing this function for, I knew it would only be looking for a `get()` method on the class-based view, which makes things a little simpler. That, and the `dispatch()` method were the only places I would need to look on the class for decorators. Also, I only wanted decorators that were callable: since I would actually call a subset of them to test if the user could access the view.

{% highlight python %}
def get_callable_cells(function):
  callables = []
  # Under some circumstances, I wound up with an object that has the name `view_func`: 
  # this is the view function I need to access.
  if not hasattr(function, 'func_closure'):
    if hasattr(function, 'view_func'):
      return get_callable_cells(function.view_func)
  # If we have no more function we are wrapping
  if not function.func_closure:
    return [function]
  for closure in function.func_closure:
    contents = closure.cell_contents
    # Class-based views have a dispatch method
    if hasattr(contents, 'dispatch'):
      callables.extend(get_callable_cells(contents.dispatch.__func__))
      if hasattr(contents, 'get'):
        callables.extend(get_callable_cells(contents.get.__func__))
    callables.extend(get_callable_cells(contents))
  return [function] + callables
{% endhighlight %}

The other trick I'm using there is to use the `__func__` property of the `dispatch` and `get` methods of the view class.

From there, in my case, I wanted those callable cells that look like they take a `user` as their first argument:

{% highlight python %}
def get_tests(function):
  return [
    x for x in get_callable_cells(function)
    if x.func_code.co_varnames[0] in ["user", "u"]
  ]
{% endhighlight %}

So, this works for things that look like:

{% highlight python %}
class ViewClass(ParentClass):
  @login_required
  @permission_required('app_label.permission_name')
  def dispatch(self, *args, **kwargs):
    return super(ViewClass, self).dispatch(*args, **kwargs)
  
  @user_passes_test(lambda u: u.is_staff)
  def get(self, *args, **kwargs):
    # do stuff here
    pass
{% endhighlight %}

As well as:

{% highlight python %}
@login_required
@permission_required('app_label.permission_name')
@user_passes_test(lambda u: u.is_staff)
@render('foo/bar.html')
def view_function(request, *args, **kwargs):
  # do stuff here
{% endhighlight %}

It will pick up that the `@render` decorator is not asking for a user.

It works with the `@user_passes_test` decorator, because that is passed a function that has the first argument of `u`. It works with the `@permission_required` decorator for basically the same reason, although that has a function inside a function that actually has the argument of `user`.

Finally, it works for the `@login_required` decorator, as that calls `user_passes_test`.