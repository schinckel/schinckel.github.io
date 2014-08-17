---
date: 2012-03-09 17:14:48
layout: post
publish: true
tags: [hypermedia, collection+json, django-forms]
time: '17:14:48'
title: Collection+JSON error objects

---


I'm still keen on the idea of implementing a rich hypermedia API based on django's forms.

One of the nicest things about the django forms is that they handle the validation of incoming data. Each form field has a `.clean()` method, which will clean the data. On a form, it is then possible to have extra methods, `.clean_FIELDNAME()`, which will process the incoming data again, meaning you don't need to subclass a field to add simple cleaning functionality. Finally, the form itself has a `.clean()` method, that can be used to clean composite data, say, ensuring that `start` is before `finish`.

The form validation code will create an `errors` property on the form, that will contain the fields that have errors, and any non-field errors (such as the last example above). When rendering an HTML page, and displaying a form that has errors, these are marked up with CSS classes that enable you to show which fields have invalid or missing data, and also display relatively friendly messages (which you can customise).

But Collection+JSON has a fairly simple `error` property on the collection object:

{% highlight js %}
{
  "collection": {
    "error": {
      "title": "Error saving your details",
      "code": "409",
      "message": "Your date of birth is invalid (19777-11-30)"
    }
  }
}
{% endhighlight %}

Compare this to the format I have been using for JSON responses:

{% highlight js %}
{
  "message": "Error saving your details",
  "detail": {
    "date_of_birth": "The value '19777-11-30' is not a valid date."
  }
}{% endhighlight %}

Programmatically, this allows me to attach the error messages to where they belong: the `message` value is shown in the main messages area of the client, the `detail` values for each field are attached to the fields for which they apply.