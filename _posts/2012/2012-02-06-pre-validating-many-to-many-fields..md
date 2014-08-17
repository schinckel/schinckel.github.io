---
date: 2012-02-06 23:18:56
layout: post
publish: true
tags: [django, forms, validation, m2m, signals]
time: '23:18:56'
title: Pre-validating Many to Many fields.

---


Django's form validation is great. You can rely on it to parse data that you got from the user, and ensure that the rules you have implemented are all applied. Model validation is similar, and I tend to use that in preference, as I often make changes from outside of the request-response cycle. Indeed, I've started to rewrite my API framework around using forms for serialisation as well as parsing.

One aspect of validation that is a little hard to grok is changes to many-to-many fields. For instance, the part of the system I am working on right now has `Tag`s that are applied to `Unit`s, but a change to business requirements is that these tags need to be grouped, and a unit may only have one tag from a given `TagGroup`.

Preventing units from being saved with an invalid combination of Tags is simple if you use the `django.db.models.signals.m2m_changed` signal.

{% highlight python %}
from django.db.models.signals import m2m_changed
from django.dispatch import receiver

@receiver(m2m_changed, sender=Tag.units.through)
def prevent_duplicate_tags_from_group(sender, instance, action, reverse, model, pk_set, **kwargs):
  if action != 'pre_add':
    return
  
  if reverse:
    # At this point, we know we are adding Tags to a Unit.
    tags = Tag.objects.filter(pk__in=pk_set).select_related('group')
    existing_groups = TagGroup.objects.filter(tags__units=instance).distinct()
    invalid_tags = set()
    for tag in tags:
      if tag.group in existing_groups:
        invalid_tags.add(tag)
      group_count = 0
      for other_tag in tags:
        if other_tag.group == tag.group:
          group_count += 1
      if group_count > 1:
        invalid_tags.add(tag)
    if invalid_tags:
      raise ValidationError(_(u'A unit may only have one Tag from a given Tag Group'))
  else:
    # At this point, we know we are adding Units to a Tag.
    units = Unit.objects.filter(pk__in=pk_set)
    group = instance.group
    invalid_units = []
    for unit in units:
      if unit.tags.exclude(pk=instance.pk).filter(group=group).exists():
        invalid_units.append(unit.name)
    if invalid_units:
      raise ValidationError(_(u'The unit%s "%s" already ha%s a Tag from group "%s"' % (
        "s" if len(invalid_units) > 1 else "",
        ", ".join(invalid_units),
        "ve" if len(invalid_units) > 1 else "s",
        group.name
      )))
{% endhighlight %}

Now, this on it's own is nice enough. However, if you try to save invalid data from within the admin interface, then you will get an ugly trackback. If only there was a way to get this validation code to run during the validation phase of a form. i.e., when you are cleaning it...

So, we can create a form:

{% highlight python %}
from django import forms
from models import Tag, prevent_duplicate_tags_from_group
class TagForm(forms.ModelForm):
  class Meta:
    model = Tag
    
  def clean_units(self):
    units = self.cleaned_data.get('units', [])
    if units:
      prevent_duplicate_tags_from_group(
        sender=self.instance.units,
        instance=self.instance,
        action="pre_add",
        reverse=False,
        model=self.instance.units.model,
        pk_set=units
      )
    return self.cleaned_data
{% endhighlight %}

You can create a complementary form on the other end (or, if you already have one, then just hook this into the field validator). The bonus here is that the validation errors will be put on the field with errors, in this case units.