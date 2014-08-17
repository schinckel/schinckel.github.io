---
date: 2011-07-20 23:45:15
layout: post
publish: true
tags: [django, admin, queryset]
time: "23:45:15"
title: Filtering querysets in django.contrib.admin forms

---


I make extensive use of the django admin interface. It is the primary tool for our support team to look at user data for our product, and I have stretched it in many ways to suit my needs.

One problem I often come back to is a need to filter querysets in forms and formsets. Specifically, the objects that should be presented to the admin user in a relationship to the currently viewed object should be filtered. In most cases, this is something as simple as making sure the Person and the Units they work at are within the same company.

There is a simple bit of boilerplate that can do this. You need to create a custom form, and attach this to the ModelAdmin for the parent object:

{% highlight python linenos %}
from django.contrib import admin
from django import forms
from models import Person, Unit

class PersonAdminForm(forms.ModelForm):
    class Meta:
        model = Person
    
    def __init__(self, *args, **kwargs):
        super(PersonAdminForm, self).__init__(*args, **kwargs)
        # This is the bit that matters:
        self.fields['units'].queryset = self.instance.company.units

class PersonAdmin(admin.ModelAdmin):
    form = PersonAdminForm
{% endhighlight %}

In actuality, it is a little more complicated than this: you need to test if the selected object has a company, and really, if the user has changed the company (or selected it on a new person), you should use that instead. So the code looks a bit more like:

{% highlight python linenos %}
company = None
if self.data.get('company', None):
    try:
        company = Company.objects.get(pk=self.data['company'])
    except Company.DoesNotExist:
        pass
else:
    try:
        company = self.instance.company
    except Company.DoesNotExist:
        pass
if company:
    self.fields['units'].queryset = company.units.all()
{% endhighlight %}

Now, having to write all of that every time you have to filter the choices available wears rather thin. And wait until you need to do it to a formset instead: you need to also do stuff to the empty_form, so that when you dynamically add an inline form, it has the correct choices.

Enter `FilteringForm`, and her niece `FilteringFormSet`:

{% highlight python linenos %}
from django import forms
from django.core.exceptions import ObjectDoesNotExist

class FilterMixin(object):
    filters = {}
    instance_filters = {}
    def apply_filters(self, forms=None):
        # If we didn't get a forms argument, we apply to ourself.
        if forms is None:
            forms = [self]
        # We need to apply instance filters first, as they allow us to
        # select an attribute on our instance to be the queryset, and
        # then apply a filter onto that with filters.
        for field, attr in self.instance_filters.iteritems():
            # It may be using a related attribute. person.company.units
            tokens = attr.split('.')
            
            source = None
            # See if there is any incoming data first.
            if self.data.get(tokens[0], ''):
                try:
                    source = self.instance._meta.get_field_by_name(tokens[0])[0].rel.to.objects.get(pk=self.data[tokens[0]])
                except ObjectDoesNotExist:
                    pass
            # Else, look for a match on the object we already have stored
            if not source:
                try:
                    source = getattr(self.instance, tokens[0])
                except ObjectDoesNotExist:
                    pass
            
            # Now, look for child attributes.
            if source:
                for segment in tokens[1:]:
                    source = getattr(source, segment)
                if forms:
                    for form in forms:
                        form.fields[field].queryset = source
        
        # We can now apply any simple filters to the queryset.
        for field, q_filter in self.filters.iteritems():
            for form in forms:
                form.fields[field].queryset = form.fields[field].queryset.filter(q_filter)
    

class FilteringForm(forms.ModelForm, FilterMixin):
    def __init__(self, *args, **kwargs):
        super(FilteringForm, self).__init__(*args, **kwargs)
        self.apply_filters()

class FilteringFormSet(forms.models.BaseInlineFormSet, FilterMixin):
    filters = {}
    instance_filters = {}
    
    def __init__(self, *args, **kwargs):
        super(FilteringFormSet, self).__init__(*args, **kwargs)
        self.apply_filters(self.forms)
    
    def _get_empty_form(self, **kwargs):
        form = super(FilteringFormSet, self)._get_empty_form(**kwargs)
        self.apply_filters([form])
        return form
    empty_form = property(_get_empty_form)
{% endhighlight %}

Now, to use all of this, you still need to subclass, but you can declare the filters:

{% highlight python linenos %}
class PersonAdminForm(FilteringForm):
    class Meta:
        model = Person
    
    instance_filters = {
        'units': 'company.units'
    }
{% endhighlight %}

You can also have non-instance filters, and they will be applied after the instance_filters:

{% highlight python linenos %}
from django.db import models

class PersonAdminForm(FilteringForm):
    class Meta:
        model = Person
    
    instance_filters = {
        'units': 'company.units'
    }
    filters = {
        'units': models.Q(is_active=True)
    }
{% endhighlight %}

I think it might be nice to be able to add an extra set of filtering for the empty form in a formset, so you could make it that only choices that hadn't already been selected, for instance, were the only ones available. But that isn't an issue for me right now.