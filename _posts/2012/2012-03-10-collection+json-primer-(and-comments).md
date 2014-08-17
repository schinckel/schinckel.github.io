---
date: 2012-03-10 17:46:59
layout: post
publish: true
tags: [collection+json]
time: '17:46:59'
title: Collection+JSON Primer (and comments)

---


[Collection+JSON](http://amundsen.com/media-types/collection/format/), created by Mike Amundsen, is a standard way of creating hypermedia APIs. There were a few things I didn't pick up correctly reading through his great book, or the spec.

First, let us look at a partial example document.

{% highlight js %}
{
  collection: {
    version: "1.0",
    href: "http://api.example.com/",
    links: [],
    items: [],
    queries: [],
    template: {},
    error: {}
  }
}
{% endhighlight %}

I'm not so keen on having the version number in the document itself, as this refers to the version of Collection+JSON, rather than the version of the document. In my mind, the version of Collection+JSON should be contained within the media-type (`Content-Type: application/vnd.collection+json;version=1.0`), just as the version of the document is contained within the Etag header (`Etag: 026e10f644ba4b06`). Anyway, I'll let that slide for now.

Secondly, having the `href` of the collection seems a little superfluous. I'm assuming there will always be an entry in `links` that has a `rel=self`, which should give you the same value. Again, not a big issue.

What I was a little unclear on was the difference between `links` and `queries`. We can have a look at a couple of examples:

{% highlight js %}
links: [
  {href: "http://api.example.com", rel: "self", prompt: "Home", name: "home", render: "link"},
  {href: "http://api.example.com", rel: "users", prompt: "Users", name: "users", render: "link"}
],
queries: [
  {href: "http://api.example.com", rel: "search", prompt: "Enter search string", data: [
    {name: "search", value: ""}
  ]}
]
{% endhighlight %}

The difference between links and queries to me seems somewhat artificial. Sure, in this case, my query has data fields, but it seems that this is not always necessary. The example Mike uses in his book:

{% highlight js %}
queries: [
  {href: "...", rel: "all", prompt: "All tasks"},
  {href: "...", rel: "open", prompt: "Open tasks"},
  {href: "...", rel: "closed", prompt: "Closed tasks"},
  {href: "...", rel: "date-due", prompt: "Date Due", data: [
    {name: "dateStart", value: "", prompt: "Start Date"},
    {name: "dateStop", value: "", prompt: "Stop Date"}
  ]},
]
{% endhighlight %}

I'm not quite sure when I should be using a link, and when I should be using a query? In this example, it looks like a query is a filter on the collection: maybe that is the difference?

The other sticking point I have is that both queries and lists are GET requests: the data attribute is simply the query string applied to the URL. Before I continue, we need to look at the items and template attributes of the collection object. In this case, we have a single-object collection, including a write template for it.

{% highlight js %}
items: [
  {
    href: "...",
    data: [
      {name: "first_name", value: "Matthew", prompt: "First name"},
      {name: "last_name", value: "Schinckel", prompt: "Last name"},
      {name: "email": value: "matt@schinckel.net", prompt: "Email address"},
      {name: "gender", value: "male", prompt: "Gender"}
    ]
  }
],
template: {
  data: [
    {name: "first_name", value: "Matthew", prompt: "First name"},
    {name: "last_name", value: "Schinckel", prompt: "Last name"},
    {name: "email", value: "matt@schinckel.net", prompt: "Email address", regexp: "^[^@]+@[^@]+\.[^@]+"},
    {name: "gender", value: "male", prompt: "Gender", options: [
      {value: "male", text: "Male"}, 
      {value: "female", text: "Female"}
    ]}
  ]
}
{% endhighlight %}

Again, we see duplicate information. In this case, the template is populated: if it were a 'proper' collection rather than a single object, the template would be used for creating new objects in the collection, so I'm prepared to let this one go. You'll also notice that I'm using a couple of undocumented features: regexp and options. These enable us to either present a list of choices to the user, or have client-side validation based on a regular expression.
 
To update an object, we can use a PUT (or POST) to the object's href, and we send the name/value parts of the updated template data:

{% highlight js %}
{
  template: {
    data: [
      {name: "first_name", value: "Matthew"},
      {name: "last_name", value: "Schinckel"},
      {name: "gender", value: "male"},
      {name: "email", value: "matt@schinckel.net"}
    ]
  }
}
{% endhighlight %}

To create a new object, we send the same type of data in a POST request to a collection's href. To delete an object, we can send a DELETE request to the object's href.

Finally, we come to the error property. I wrote last night how I think this is a little limiting: [Collection+JSON error objects](http://schinckel.net/2012/03/09/collection%2Bjson-error-objects/). Anyway, an error looks like:

{% highlight js %}
error: {
  title: "Error saving your details",
  code: "409",
  message: "Your date of birth is invalid (19977-11-30 is not a valid date)"
}
{% endhighlight %}

After writing most of this, I did come across [Collection+JSON - Examples](http://amundsen.com/media-types/collection/examples/), but I may have described it in a slightly different manner. It still doesn't elaborate on the difference between links and queries, however.