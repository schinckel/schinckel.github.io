--- 
wordpress_id: 1690
layout: post
title: Django templates not loading?
time: "20:44:12"
date: 2010-04-13 20:44:12
tags: 
- general
- django
wordpress_url: http://schinckel.net/2010/04/13/django-templates-not-loading/
---
Had an annoying issue today after upgrading an installation of django to the trunk. All of a sudden, my admin interface would not load. I had errors stating that the template `admin/login.html` could not be loaded.

Now, django.contrib.admin was in settings.INSTALLED_APPS, and `django.template.loaders.app_directories.Loader` was in `settings.TEMPLATE_LOADERS`.

So, why was django throwing an exception? To find out, I stepped into a shell:

{% highlight pycon linenos %}
>>> from django.template.loader import find_template_loader
>>> loader = find_template_loader('django.template.loaders.app_directories.Loader')
>>> loader.load_template('admin/login.html')
{% endhighlight %}
    

This was where I realised something was wrong. I don't get the error now (as I have fixed it), but it complained about being not allowed to open the file. As in a permissions error.

Looking up the location in a new shell, I was able to see that all of the files in the `django.contrib.admin.templates` directory were only able to be read by root. For some reason, `python setup.py install` had set the mode of these files to _0600_, instead of the expected _0644_. A quick `sudo chmod -r ag+r templates` (from inside the `django.contrib.admin` directory) fixed it.
