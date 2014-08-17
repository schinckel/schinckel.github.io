---
date: 2012-01-10 00:57:35
layout: post
publish: true
tags: [django, menu, django-menus]
time: "00:57:35"
title: Only show links if user can access the view

---


Most things I seem to develop have a top-level menu that runs across the top or side of the page, which has the various pages within them. In many cases, some of these will only be accessible to people who have permission to access the view to which they point. That is, I want to selectively display menu items based on if the logged in user can access the page linked to.

Previously, I have been doing this by having a check in the template that is essentially a duplicate of the check in the view. Specifically, the view check is usually a decorator (or multiple decorators), using things like ``login_required`` or ``user_passes_test``, which takes a callable that runs the test, when passed in the user object.

I already had a ``django-menus`` app, that generates the menu items, based on the view name (it creates the links, and you may optionally pass in a text value). But each of these was wrapped in things like:

{% highlight django %}
{{ "{% if request.user.is_staff "}} %}
{{ "  {% menu_item 'foo' 'Foo' "}} %}
{{ "{% endif "}} %}
{% endhighlight %}

The view ``foo`` is wrapped in a decorator:

{% highlight python %}
@user_passes_test(lambda user:user.is_staff)
def foo(request):
  # ... view code removed ...
{% endhighlight %}

So, I spent quite a while working out how to inspect the decorators wrapping a function, and if they were of the form that might be a test of permission/some other attribute, run the test. I've settled on the convention that a decorator function that takes a first argument of `user` or `u` (for `lambda u: u.is_staff`, for instance) is executed.

The project can be found at [django-menus](https://bitbucket.org/schinckel/django-menus/src/ffd7db7bf428/menus/templatetags/menu_item.py).
