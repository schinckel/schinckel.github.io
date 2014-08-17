---
date: 2012-06-01 21:28:36
layout: post
publish: true
tags: [django, jquery]
time: '21:28:36'
title: The Organism Application

---


I had an email from a self-confessed django beginner, asking for some assistance. Here is my solution, as I worked through it.

## The Application ##

The application is designed to allow tracking information related to identifying various organisms. An organism may have many identifying features, such as on a tree, the height, and the leaf morphology, or on a bird, the colour of the feathers, size of the egg and so on. To make it simpler for the users, it would be useful to classify organisms as belonging to a type, which can then be used to limit the available choices of identifying features: if an organism is a bird, then we only show those features that make sense for a bird.

To do all of this, we can have a class structure that looks somewhat like:

{% highlight python %}
# models.py
from django.db import models

class OrganismType(models.Model):
    description = models.CharField(max_length=200)

class IdentificationField(models.Model):
    type = models.ForeignKey(OrganismType, related_name='id_fields')
    name = models.CharField(max_length=200)
    
    class Meta:
        unique_together = ('type', 'name')

class Organism(models.Model):
    common_name = models.CharField(max_length=200)
    latin_name = models.CharField(max_length=200, unique=True)
    type = models.ForeignKey(OrganismType, related_name='organisms')

class IdentificationDetail(models.Model):
    organism = models.ForeignKey(Organism, related_name="id_details")
    field = models.ForeignKey(IdentificationField)
    description = models.CharField(max_length=250)
    
    class Meta:
        unique_together = ('organism', 'field')
{% endhighlight %}

You'll see I've also included a couple of `unique_together` constraints: I've assumed that each field for a given organism should only appear once.

## Bending the admin to our will ##

Next, we can put all of this into the admin. This is really quite simple, but, as we will see, has it's limits.

{% highlight python %}
# admin.py
from django.contrib import admin

from models import OrganismType, Organism, IdentificationField, IdentificationDetail

class IdentificationFieldInline(admin.TabularInline):
    model = IdentificationField
    extra = 0

class OrganismTypeAdmin(admin.ModelAdmin):
    inlines = [IdentificationFieldInline]

class IdentificationDetailInline(admin.TabularInline):
    model = IdentificationDetail
    extra = 0

class OrganismAdmin(admin.ModelAdmin):
    inlines = [IdentificationDetailInline]    
    list_display = ('common_name', 'latin_name', 'type')
    list_filter = ('type',)

admin.site.register(OrganismType, OrganismTypeAdmin)
admin.site.register(Organism, OrganismAdmin)
{% endhighlight %}

I've removed the extra empty forms on the formsets, it looks much cleaner. I've also used a couple of the nice features of the admin to make display of stuff better.

At this point, thanks to the magic of django, you now have an administrative interface. But, it doesn't quite do what we want: that is, we haven't limited which identification fields will be available in the organism's inlines.

To do that, we need to fiddle with the formset.

{% highlight python %}
# forms.py
from django import forms

from models import IdentificationDetail, Organism

class IdentificationDetailFormSet(forms.models.BaseInlineFormSet):
    def __init__(self, *args, **kwargs):
        super(IdentificationDetailFormSet, self).__init__(*args, **kwargs)
        for form in self.forms:
            self.update_choices(form)
    
    # We need to override the constructor (and the associated property) for the
    # empty form, so dynamic forms work.
    def _get_empty_form(self, **kwargs):
        form = super(IdentificationDetailFormSet, self)._get_empty_form(**kwargs)
        self.update_choices(form)
        return form
    empty_form = property(_get_empty_form)
    
    # This updates one form's 'field' field queryset, if there is an organism with type
    # associated with the formset. Otherwise, make the choice list empty.
    def update_choices(self, form):
        if 'type' in self.data:
            id_fields = OrganismType.objects.get(pk=self.data['type']).id_fields.all()
        elif self.instance.pk and self.instance.type:
            id_fields = self.instance.type.id_fields.all()
        else:
            id_fields = IdentificationDetail.objects.none()
        
        form.fields['field'].queryset = id_fields
{% endhighlight %}

This process is something I've [talked about before](http://schinckel.net/2011/07/20/filtering-querysets-in-django.contrib.admin-forms/) (and finding that post was what pointed the questioner in my direction), but I'll discuss it again anyway. This is perhaps a more concrete example anyway.

We want to change the queryset available to a given field (in this case, confusingly called `field`), based on the value of a related object. In this case, we want to set the queryset of an identification detail's `field` to all of the available identification fields on the related organism's type. Whew!

As it turns out, it's easier to see this in the code. Note also that if there is no selected organism type (as would be the case when an empty form is presented), no fields can be selected.

This alone would work: except that changing the organism's type should change the available list of field types. There are two approaches that can be used: have all of the data available in the page somewhere, and use JavaScript to filter the available list of field types, or fetch the data dynamically from the server (again, using JavaScript) at the time the type is changed. If I were using something like KnockoutJS, then the former would be easier, and improve the responsiveness: the change would be immediate. Since I'm not using anything that doesn't come with django, I'll fetch the data on each change.

So, we are going to need some JavaScript. When we do the end-user page, it's easy to see how to put that in, but we need to understand how to override django's admin templates in order to inject it in this case.

The django documentation has some nice detail about how to do this: [Overriding admin templates](https://docs.djangoproject.com/en/dev/ref/contrib/admin/#overriding-admin-templates). In this case, we need to create a file within our app at `templates/admin/organisms/organism/change_form.html`. We want to just add data to the regular template, so we just inherit from it.

{% highlight html %}{% raw %}
{% extends 'admin/change_form.html' %}

{% block after_related_objects %}
{{ block.super }}
<script>
django.jQuery(function($){
  $('#id_type').change(function(evt){
    $.ajax({
      url: "/admin/organisms/organismtype/" + this.value + '/fields/',
      type: 'get',
      success: function(data) {
        $('tr.form-row td.field-field select').html(data);
      }
    });
  });
});
</script>
{% endblock %}
{% endraw %}{% endhighlight %}

The script here adds a `change` event handler to the organism type `<select>` element, that hits the server, and gets the list of fields for that type. It then sets the content of the inline identification detail `field` fields to the data the server returned. This clears whatever had been stored there previously, but that is probably the behaviour we want in this case. Note that I am hard-coding the URL for now: we'll see a way to handle that in a better way later.

Only one thing remains: to actually write the view that returns the desired content of the `<select>` element. For now, we will put this into the admin class of the organism type. Again, later we'll move this to a proper seperate view, but doing it this way shows how easy it is to extend the admin interface.

Back in our `admin.py` file, we want to change the `OrganismTypeAdmin` class:

{% highlight python %}
# admin.py

from django.contrib import admin
from django.conf.urls import patterns, url
from django.http import HttpResponse

# [snip]

class OrganismTypeAdmin(admin.ModelAdmin):
    inlines = [IdentificationFieldInline]
    
    def get_urls(self, **kwargs):
        urls = super(OrganismTypeAdmin, self).get_urls(**kwargs)
        urls = patterns('', 
            url(r'^(.*)/fields/$', self.get_fields, name='organisms_organismtype_fields'),
        ) + urls
        return urls
    urls = property(get_urls)
    
    def get_fields(self, request, *args, **kwargs):
        data = "<option value>---------</option>"
        if args[0]:
            data += "".join([
                "<option value='%(id)s'>%(name)s</option>" % x 
                for x in OrganismType.objects.get(pk=args[0]).id_fields.values()
            ])
        return HttpResponse(data)
{% endhighlight %}

We can use the fact that the admin model object provides its own `urls`, and we can override the method that generates them. We need to put our `fields` view before the existing ones (and allow empty strings where we want the primary key), else it will be matched by another route.

Finally, we write the view itself. If there was no primary key provided, we return a "null" option, otherwise we include that and the actual list of choices.



## Doing it for real ##

Of course, in a real environment, we probably don't want to give access to the admin interface to anyone but trusted users. And even then, limit that to as few as possible. In this case, I would suggest that the admin users would be creating the OrganismType objects, but creating Organism objects would be done by regular users. Which means we really only have a couple of pages that need to be written for the outside world:

* View a list of organisms.
    * Filter the list of organisms by OrganismType
    * Search for an organism by common name or latin name
    * Search for an organism by some other means (feather colour, etc)
* Create a new organism
* Edit an existing organism
* Fetch a list of field types for a given organism type (the `get_fields` view above.)

This may come in a future post: I had forgotten about this and need some time to get back into it.
