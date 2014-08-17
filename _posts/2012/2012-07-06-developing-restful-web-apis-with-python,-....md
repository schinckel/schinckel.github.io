---
date: 2012-07-06 16:21:40
layout: post
publish: true
tags: [review, rest, API, django, hypermedia]
title: Developing RESTful Web APIs with Python, ...

---


This week's [Python Weekly](http://us2.campaign-archive1.com/?u=e2e180baf855ac797ef407fc7&id=bbe8f42215&e=04306b42c9) has a link to a presentation by [Nicola Iarocci](), called [Developing RESTful Web APIs with Python, Flask and MongoDB](https://speakerdeck.com/u/nicola/p/developing-restful-web-apis-with-python-flask-and-mongodb).

I have a few minor concerns with some aspects of the content.

> No form validation

This concerns me. I've recently started using django's forms for my validation layer for API calls, and also for the generation of the serialised output. It's not completely flawless, but it seems to be working quite well. It certainly is more robust than my hand-rolled scheme of validating data, and using code that is better tested than my own is always a bonus.

Instead, as we see later, there is a data validation layer. It has basically the same goal as django's forms, but is somewhat more nested, rather than using classes. Also, using classes makes it easier to have inheritance, a great way to have shared rules. You could do this using the same function in your custom validation, but this feels disconnected.

> MongoDB  
> scalable, high-performance, ...

The integrity of my data is important to me. It's very rare that the db is the limiting factor in my system's performance, and having stuff written to disk as soon as it is 'real' is kind-of critical.

> `http://api.example.com/v1/contacts/`

Okay, this is where I jump on my high horse: "versioning should happen in the media-type". Or even better, resources should be forwards and backwards compatible, and clients should be written to handle (or ignore) changes to schemata.

> `@mimerender( ... )`

A decorator that has 5 arguments? That will be applied to every view function? Surely there's a way to do this without having to decorate every function. Django CBV FTW here.

> "Thu, 1 Mar 2012 10:00:49 UTC"

Egad. I can't think of a reason to have *machine readable* dates in any format other than ISO 8601. Purely for the reason of being able to sort dates whilst they are still strings.

> PATCH  
> Why not PUT?

Why not POST? 

This is something that has been debated for ages. I think I kind-of agree with the author: PATCH is more explicitly a partial update. It does make me think about using some type of diff, but I guess using concurrency control covers the same ground.

> `"<link rel='parent' ... />"`

Okay, HTML/XML inside a JSON object? 

Why not have:

{% highlight js %}
{
  "rel": "parent",
  "title": "...",
  "href": "..."
}
{% endhighlight %}

At least that way you'll be able to parse the data out natively.

> "updated": "...",  
> "etag": "..."

I'm not sure if it is necessary/warranted/desired to have the etag as part of the representation. Especially if the etag is generated from the content: that would kind-of preclude it.

Personally, I generate etags from a higher resolution timestamp (possibly hashed with the object id, class or whatever). Whilst etags are opaque, having them as human readable helps with troubleshooting.

To me, this seems to be metadata, and should not be part of the object. I think you could argue a case that within Collection+JSON you could add this in, for convenience. It certainly would make it easier not to have to store the etag in a seperate variable on the client, for one.


The discussion about Concurrency Control is quite good. Which reminds me: I enjoyed most of this presentation. I have some minor nitpicks, but some of those I understand the author's choices. Some I don't (date format). It's certainly better than the REST API Design Rulebook, which is a load of junk.