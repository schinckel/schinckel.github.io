---
date: 2012-06-12 12:35:28
layout: post
publish: true
tags: [knockoutjs, javascript, persistence, client-dev]
title: KnockoutJS persistence using Simperium

---


I _really_ like KnockoutJS. I've said that lots of times, but I mean it. It does one thing, two-way bindings between a data model and the GUI elements, really well.

Perhaps my biggest hesitation in using it in a big project is that there is no built-in persistence layer. This would appear to be a situation where something like Backbone has an advantage.

And then, last week, I came across Simperium.

"So," I thought, "what if you were able to transparently persist KnockoutJS models using Simperium?"


{% highlight js %}
// Assume we have a SIMPERIUM_APP_ID, and a logged in user's access_token.
var simperium = new Simperium(SIMPERIUM_APP_ID, {token: access_token});
// mappingOptions is a ko.mapping mappingOptions object: really only useful
// if your bucket contains homogenous objects.
var store = new BucketMapping(simperium.bucket(BUCKET_NAME), mappingOptions);

var tony = store.all()[0];

var alan = store.create({
  name: "Alan Tenari",
  date_of_birth: "1965-02-06",
  email: "alan.tenari@example.com"
});
{% endhighlight %}

Now, `tony` is an existing object we loaded up from the server, and `alan` is one we just created.

Both of these objects are mapped using `ko.mapping`, but, this is the exciting bit, *every time* we make a change to any of their attributes, they are *automatically persisted back to simperium.*

There is a little more to it than that: we may want to only persist valid objects, for instance.

This totally gets me excited. And, I've already written a big chunk of the code that actually does this!

But for that, you'll just have to wait...