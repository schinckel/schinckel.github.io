---
date: 2011-10-09 16:54:30
layout: post
publish: true
tags: [django, inheritance]
time: '16:54:30'
title: Why CustomUser subclasses are not such a good idea

---

### Background

The system I work on has People who may or may not be Users, and very infrequently Users who may not be a Person. In fact, an extension to the system has meant that there will be more of these: a User who needs to be able to generate reports (say, a Franchisor who needs to only be able to access aggregate data from franchises, that might belong to multiple companies) who is never rostered on for shifts, which is what the Person class is all about.

Anyway, the long and the short of this was that I thought it might be a good idea to look at sub-classing User for ManagementUser.

I guess I should have listened to those smarter than me who shouted that sub-classing User is not cool. Although they never gave any concrete reasons, but now I have one.

You cannot easily convert a superclass object to a specialised sub-class. Once a user is a User, it's hard to make them into a ManagementUser.

It can be done: the following code will take a User (or any parent class) object, a User (or whatever) subclass, and any other keyword arguments that should be passed into the constructor. It saves the newly upgraded object, and returns it.

{% highlight python linenos %}
def create_subclass(SubClass, old_instance, **kwargs):
    new_instance = SubClass()
    for field in old_instance._meta.local_fields:
        setattr(new_instance, field.name, getattr(old_instance, field.name))
    new_instance.save()
    return new_instance()
{% endhighlight %}

However, it really should check that there isn't an existing instance, and maybe some other checks.

### What advantages does sub-classing have?

The biggest advantage, or so I thought, was to have it so you can automatically downcast your models on user login, and then get access to the extended user details. For instance, if your authentication backend automatically converts User to Person, then you can get access to the Person's attributes (like the company they work for, their shifts, etc) without an extra level of attribute access:

{% highlight python linenos %}
# request.user is always an auth.User instance:
request.user.person.company
# request.user might be a person, etc.
request.user.company
{% endhighlight %}

But it turns out that even this is bad. Now, in guard decorators on view functions, you cannot just test the value of an attribute, as not all users will have that attribute. Instead, you need to test to see if the attribute exists, and then test the attribute itself.

### So, what do you do instead?

The preferred method in django for extending User is to use a UserProfile class. This is just a model that has a OneToOneField linked back to User. I would look at doing a very small amount of duck-punching just to make getting a hold of the profile class:

{% highlight python linenos%}
import logging
from django.contrib.auth.models import User
from django.db import models

class Person(models.Model):
    user = models.OneToOneField(User, related_name="_person")
    date_of_birth = models.DateField(null=True, blank=True)

def get_person(user):
    try:
        return user._person
    except Person.DoesNotExist:
        pass

def set_person(user, person):
    user._person = person

if hasattr(User, 'person'):
    logging.error('Model User already has an attribute "person".')
else:
    User.person = property(get_person, set_person)

{% endhighlight %}

By having the person's related name attribute as _person, we can wrap read access to it in an exception handler, and then use a view decorator like:

{% highlight python linenos %}
@user_passes_test(lambda u:u.person)
def person_only_view(request, **kwargs):
    pass
{% endhighlight %}

We know this view will only be available to logged in users who have a related Person object.

I will point out that I am duck-punching/monkey-patching here. However, I feel that this particular method of doing it is relatively safe. I check before adding the property, and in reality I probably would raise an exception rather than just log an error.