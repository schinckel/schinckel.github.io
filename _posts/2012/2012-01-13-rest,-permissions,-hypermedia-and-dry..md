---
date: 2012-01-13 23:30:57
layout: post
publish: true
tags: [REST, hypermedia, HATEOAS]
time: '23:30:57'
title: REST, permissions, hypermedia and DRY.

---


I've been working through the whole concept of REST over the past couple of years. I really like the fact that in theory the API should be clean, well designed, and resource-based.

One of the first takeaways I got from this whole school of thought is that it becomes the verbs in HTTP that become important. That is, given a resource, say at ``http://api.example.com/foo/1/``, we can use `GET` on that resource to view it, `DELETE` to remove it, and `PUT` (or `POST`) to update it.

Since I prefer JSON to XML, I'll use that for the resource representation examples.

We might get the following back when we do a `GET` on `http://api.example.com/user/1/`:

{% highlight js %}
{
  "username": "barry",
  "first_name": "Barry",
  "last_name": "Citizen",
  "links": [
    {
      "rel": "self",
      "uri": "http://api/example.com/user/1/"
    }
  ]
}
{% endhighlight %}

I like the concept of having a `links` attribute, that contains links representing changes of state. But one thing that bothered me, from a UI perspective, is that I need to be able to know beforehand if the user has write/delete access on a resource. How can this best be represented?

I thought one way might be to have:

{% highlight js %}
{
  ...
  "links": [
    {
      "rel": "self",
      "uri": "<whatever>",
      "actions": ["get", "put", "delete"]
    }
  ]
}
{% endhighlight %}

But I haven't seen anything that does something similar to this. And, I have been leaning more towards using `POST` rather than `PUT` in lots of cases, as the business logic of my project is that often a user will not have access to the full data associated with a resource. `PUT` implies that the data that is being sent should replace the resource entirely. 

For instance, a manager of a shop who has staff that she shares with another shop may not have access to the other shop's data, and therefore may not know anything about that shop. In fact, we have at least one case where some managers _must_ not know that another particular shop exists. Thus, she would send back an incomplete list of shops that her employee works at, thus removing him from the ones she cannot see.

As an aside, which I discovered while writing this article, there is also some discussion that it is valid to use `PUT` to update the bits we know about: [RESTful architecture: what should we PUT?](http://alexscordellis.blogspot.com/2010/11/restful-architecture-what-should-we-put.html).


So, is this a valid way of representing what actions are permissable on a URI? Or is there a standard?

I then remembered that, [REST in Practice][RiP] talks about link types. On page 117:

[RiP]: http://restinpractice.com/default.aspx

### self

The uri value can be used to GET the latest resource representation of the order.
### update 

Consumers can change the order using a POST to transfer a representation to the linked resource.

### cancel 
This is the uri to be used to DELETE the order resource should the consumer wish to cancel the order.

There is also a link elsewhere in the book to [Link Relations](http://www.iana.org/assignments/link-relations/link-relations.xml). There, we see instead of an `update` link, an `edit` link, but no remove or delete links. And this seems to fly against the whole concept of using the verb, rather than the URL, as in my case, those three URLs would _all be the same_. Besides, this seems to be a bit anti-DRY.

However, maybe this _is_ the best solution: making the resource:

{% highlight js %}
{
  "username": "barry",
  "first_name": "Barry",
  "last_name": "Citizen",
  "links": [
    {"rel": "self", "uri": "http://api/example.com/user/1/"},
    {"rel": "edit", "uri": "http://api/example.com/user/1/"}
  ]
}
{% endhighlight %}

The implication here is that the `edit` URI can also be used to delete the object, but that still doesn't solve my issue. If we know the user may not delete a resource, then we can prevent access to the control that would be used to delete it.

Indeed, [RFC 5023](http://tools.ietf.org/html/rfc5023#section-9.1) specifically talks about the _Member URI_, which is (a) returned in the `Location` header when an object is created, and then goes on to talk about sending `PUT` and `DELETE` requests to the Member URI. But there is no mention about access control.

*****

So then as I think more about it, [HATEOAS](http://en.wikipedia.org/wiki/HATEOAS) is all about navigating around using links to control system state. Thus, it makes sense to have seperate links for edit and delete. And, according to Jim Webber, one of the authors of [Rest in Practice][RiP]:

> Side note: it's best not to conflate links with URIs. A link is a hypermedia control, a URI is an identifier and usually an address, and we're interested in links with well-known semantics and not very interested in the format of the URIs.

(From the REST in Practice [discussion group](https://groups.google.com/forum/#!topic/restinpractice/hE3wQ2U9UaQ)).

*****

The other concern I have is that it would be nice to know what query parameters we can send to a resource collection to filter it. I have put a bit of thought into using URLs for the `rel` attribute, and those in turn being a resource that can be read using a `GET` request. This would then provide information like:

* What parameters can be passed to this collection resource to filter it.
* What data needs to be sent to this collection resource in order to create a new object resource. This would be field names, and the data types.

Indeed, I started to plan something like this that could be automatically generated (at least the second part of it) from within [django-repose](https://bitbucket.org/schinckel/django-repose/). The idea is that the process of registering an `ApiView` class also automatically registered the reltype url route.

Having said all of that, the code I have been working on lately looks explicitly for `rel=self`, and uses that to store the URL that should be operated on.

*****

I'm going to end this now: mainly because I have just run across [JSON Linking with HAL](http://blog.stateless.co/post/13296666138/json-linking-with-hal), and I'm going to re-work how I generate and handle links.