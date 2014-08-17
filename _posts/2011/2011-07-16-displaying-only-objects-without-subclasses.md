---
date: 2011-07-16 00:10:19
time: "00:10:19"
layout: post
publish: true
tags: [django, admin, python, inheritance]
title: Displaying only objects without subclasses

---


Sometimes, the django.contrib.auth User model just doesn't cut it.

I have bounced around between ways of handling this sorry fact. My production system uses a nasty system of `Person`-`User` relationships (where, due to old legacy code, I need to keep the primary keys in sync), to monkey-patching `User`, using `UserProfile`s, and subclassing `User`.

First, a little on the nasty hack I have in place (and how that will affect my choices later on).

My project in work is a rostering system, where not everyone who is a `Person` in the system needs to be a `User`. For instance, most managers (who are `User`s) do not need their staff to be able to log in. However, they themselves must be a `Person` as well as a `User`, if they are to be able to log in, but also be rostered on.

Thus, there are many people in the system who are not `User`s. They don't have a username, and may not even have an email address. Not that having an email address is that useful in the django `User` model, as there is no unique constraint upon that.

So, I am currently kind-of using `Person` as a `UserProfile` object, but there are `Person` instances that do not have an associated `User`, and some of these are required to have an email address, and have first and last names. So, there is lots of duplication across these two tables. Which need to be kept in sync.

The solution I am looking at now moves in the other direction.

A `Person` is a subclass of `User`. It has the extra data that we need for our business logic (mobile phone number, company they work for), but I have also monkey-patched User to not require a username. We are moving towards using email addresses for login names anyway, so that isn't a problem. That has its own concerns (not everyone has a unique email address, but there are workarounds for that).

But not every `User` will have a `Person` attached. The admin team's logins will not (and this will be used to allow them to masquerade as another user for testing and bug-hunting purposes). So, we can't just ignore the User class altogether and do everything with the `Person` class.

This is all well and good. I have an authentication backend that will return a `Person` object instead of a `User` object (if one matches the credentials). Things are looking good.

Except then I look in the admin interface. And there we have all of the `Person` objects' related `User` objects, in the `User` table. It would be nice if we only had the 'pure' `User`s in here, and all `Person` objects were just in their category.

So, I needed a way to filter this list.

Luckily, django's admin has this capability. In my `person/admin.py` file, I had the following code:

{% highlight python linenos %}
from django.contrib import admin
from django.contrib import auth

class UserAdmin(auth.admin.UserAdmin):
    def queryset(self, request):
        return super(UserAdmin, self).queryset(request).filter(person=None)

admin.site.unregister(auth.models.User)
admin.site.register(auth.models.User, UserAdmin)
{% endhighlight %}

And, indeed, this works.

But then I found another `User` subclass. Now we needed a type of user that is distinct from `Person` (they are never rostered, are not associated with a given company, but do log into the system).

I wanted the changes to the admin to be isolated within the different apps, so I needed to be able to get the currently installed `UserAdmin` class, and subclass that to filter the queryset. So the code becomes (in both `admin.py` files):

{% highlight python linenos %}
from django.contrib import admin
from django.contrib import auth

BaseUserAdmin = type(admin.site._registry[auth.models.User])

class UserAdmin(BaseUserAdmin):
    def queryset(self, request):
        return super(UserAdmin, self).queryset(request).filter(foo=None)

admin.site.unregister(auth.models.User)
admin.site.register(auth.models.User, UserAdmin)
{% endhighlight %}

The only difference in the two files is the *foo*. This becomes whatever this sub-class's name is. Thus, it is `person` in the `person/admin.py` file, and `orguser` in the `orguser/admin.py` file.

The next step is to change the backend so that it will automatically downcast the logged in user to their child class. Other people have detailed this in the past: mostly the performance issue vanishes here because we are only looking at a single database query for a single object.