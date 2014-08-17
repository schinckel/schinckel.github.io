---
date: 2011-10-09 17:17:07
layout: post
publish: true
tags: [django, jquery, template, knockoutjs]
time: '17:17:07'
title: django and jQuery templates

---


KnockoutJS is a great way to create relationships between data objects, and interface elements. You can, for instance, bind a date value to an html ``input[type=date]`` element, and have it converted into a proper date object. You could then display data based on this, or do anything else you wanted.

KnockoutJS 1.2 (the currently stable version) defaults to using jQuery templates (jQuery-tmpl), which happen to use conflicting syntax to django templates.

For instance, if you were to have the following in your django template file:

{% highlight html+django %}
{{ "{{if foo > bar"}} }}
  <div>Stuff Here</div>
{{ "{{/if"}} }}
{% endhighlight %}

Then django would attempt to process that, as it uses bits that look like django's template engine's value placeholder.

A workaround to this is to look at doing something like wrapping any jQuery templates in something that prevents django from interpreting it.

But I don't like that solution. For starters, almost every text editor will try to syntax highlight data between ``<script>`` tags as javascript, even when explicitly marked as ``<script type="text/html">`` or any other non-javascript mime type.

So, it would be nicest (and cleanest) to be able to have each jQuery template item in a separate file in my project.

Enter ``{{ "{% jquery_template "}} %}``. With a custom django templatetag, you can not only have it include the template in your django template, but it will automatically add the script tags, and even add an id.

For instance, you can do:
{% highlight html+django %}
{{ "{% jquery_template 'path/to/template.html' 'templateName' "}} %}
{% endhighlight %}

This will include the data from ``path/to/template.html``, which it finds in _any_ template location, but wrapped in ``<script type="text/html" id="templateName">``.

I have a django app that contains this template tag, as well as some other useful stuff for jquery, and other javascript stuff (including knockoutjs). You can see this template tag at: <a href="https://bitbucket.org/schinckel/django-jquery/src/6d9d4c816e0c/jquery/templatetags/jquery_template.py">jquery_template.py</a>.

Hope it's useful.