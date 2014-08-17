---
date: 2012-02-10 11:41:09
layout: post
publish: true
tags: [django, admin, templates]
time: '11:41:09'
title: Adding data to admin templates

---


It came up in the #django IRC channel the other day about how to extend a django admin template to show other information, possibly related to an object, but not necessarily editable.

I use this in production: we have a Company object, which has Location objects associated with it. The django validation is stricter than the data may have been created for these objects, so from time to time a field is missing, and the django admin will not allow saving it.

So, I wanted to be able to display some information about each related object, with links to various bits and pieces. Having the inline Location data is great, except for when it is missing something, that we may not have received from the customer yet.

The trick is that you'll need to override the admin template for that model.

In this case, our class is in `app_name.ModelName`, so we need to put the following structure into our template directory:

{% highlight text %}
    templates/
      admin/
        app_name/
          modelname/
            change_form.html
{% endhighlight %}

Within that file, I have the content (spaces between `%` and `{`,`}` are there because I can't remember how to escape them in Liquid Templates...):

{% highlight django %}
{ % extends "admin/change_form.html" % }
{ % block after_related_objects % }
  ... the extra stuff is here ...
{ % endblock % }
{% endhighlight %}

In my case, I have the following html structure, and it looks nice:

{% highlight html %}
<div class="inline-group">
  <h2>Units</h2>
  <table width="100%">
    <thead>
      <tr>
        <th>Name</th>
        ...
      </tr>
    </thead>
    <tbody>
      ... loop through stuff here ...
    </tbody>
  </table>
</div>
{% endhighlight %}

The other trick is that the admin change view gives us an object, called `original`, which we can use to do lookups on related objects and the like.

The django admin is awesomesauce, and does most of what I need an administration interface to do. There are lots of places where you do need to extend it, and this is just one way of doing that.