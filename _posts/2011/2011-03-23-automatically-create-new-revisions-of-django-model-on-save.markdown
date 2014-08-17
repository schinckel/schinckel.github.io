--- 
wordpress_id: 1695
layout: post
title: Automatically create new revisions of django model on save.
time: "22:08:12"
date: 2011-03-23 22:08:12
tags: 
- python
- django
wordpress_url: http://schinckel.net/?p=1695
---
I have a use case I am investigating where saving an object should mark the original object as deleted, and save a new copy.

Using django, this is suprisingly easy to achieve.

Here is a simple model that does just that:
    
{% highlight python linenos %}
from django.db import models
class AutoSave(models.Model):
    name = models.CharField(max_length=64)
    active = models.BooleanField(default=True)
    previous = models.ForeignKey('AutoSave', null=True, blank=True,
        related_name='subsequent')

    def save(self, *args, **kwargs):
        if self.pk:
            self.previous_id = self.pk
            AutoSave.objects.filter(pk=self.pk).update(active=False)
            self.pk = None
        super(AutoSave, self).save(*args, **kwargs)
{% endhighlight %}

The important bits are that there is a boolean field called active, which can be used to soft-delete, as well as to indicate that this is the most recent revision of an object. There is also a reference to the previous version.

When an object is saved, we look for an existing primary key. Django uses this to determine if we are doing an INSERT or UPDATE. We want to get a reference to the current revision, then update the database version of that revision to be inactive, and then ensure the current data will create a new database record.

This is obviously a bit of a simplification, but the only way I would change it might be to see if no fields have changed, in which case we don't need to really save a new revision.
