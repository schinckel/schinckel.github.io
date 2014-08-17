---
date: 2012-03-09 13:16:52
layout: post
publish: true
tags: [django, json, hateoas, hypermedia]
time: '13:16:52'
title: Django and Collection+JSON

---


Recently, I have been reading (and re-reading) [Building Hypermedia APIs with HTML5 and Node][HYPER1]. There's lots to like about this book, especially after reading (and mostly discarding) [REST API Design Rulebook][RULE1].

There is one thing that bugs me, and that is the way that templates are used to generate the JSON. As I said to Mike Amundsen:

<blockquote class="twitter-tweet"><p>Something just feels wrong about using templates to generate JSON, even collection+JSON /cc @<a href="https://twitter.com/mamund">mamund</a></p>&mdash; Matthew Schinckel (@schinckel) <a href="https://twitter.com/schinckel/status/177634104135794688" data-datetime="2012-03-08T05:57:25+00:00">March 8, 2012</a></blockquote>
<script src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>

His response was that he sometimes used JSON.stringify, at other times templates. But it got me thinking. I have written lots of code that serialises Django models, or more recently forms into JSON and other formats. Getting a nice Collection+JSON representation actually maps quite nicely onto these django constructs, as we often have the metadata that is required for the fields.

Consider the following (simple) django model:

{% highlight python %}
class Article(models.Model):
    title = models.CharField('Title of Article', max_length=128)
    content = models.TextField('Content of Article')
    author = models.ForeignKey('auth.User', verbose_name='Author of Article')
    
    @permalink
    def get_absolute_url(self):
        return reverse('article_detail', kwargs={'pk', self.pk})
{% endhighlight %}

I don't normally supply `verbose_name`s, but I have in this case. We'll see why in a minute.

Now, what I would declare is the obvious JSON representation of this is something like:

{% highlight js %}
{
  "title": "Title goes here",
  "content": "Content goes here",
  "author": 1,
  "href": "…"
}
{% endhighlight %}

But, I'm quite interested in Collection+JSON. We might see something like:

{% highlight js %}
{
  "collection": {
    "version": "1.0",
    "href": "…",
    "links": [
      {"href":"…", "rel":"…", "prompt":"…", "name":"…", "render":"string"}
    ],
    "items": [
      {
        "href": "…",
        "data": [
          {"name":"title", "value":"Title goes here", "prompt":"Title of Article"},
          {"name":"content", "value":"Content goes here", "prompt":"Content of Article"},
          {"name":"author", "value":"1", "prompt":"Author of Article"},
        ],
        "links": []
      }
    ]
  }
}
{% endhighlight %}

From a django `ModelForm`, we should be able to easily generate each member of `items`:

{% highlight python %}
links = getattr(form, 'links', [])
return {
    "data": [
        {"name":f.name, "prompt":f.label, "value":f.value()} for f in form
    ],
    "href": ,
    "links": links
}
{% endhighlight %}

The only bit that we are missing out of the form/field data is data type, or more specifically in this case, the available choices that are permitted for the author field. Now, this is missing from the Collection+JSON spec, so I'm not sure how to handle that.

I think this is actually an important problem: if we have a discoverable/hypermedia API, how do we indicate to the client what are valid values that can be entered for a given field?

For those not familiar with django: the `verbose_name` on a model field is used for the default label on a form field. If you were not using a model, you could just supply a label in the form class.

The other part that is a little hard to think about now are the other attributes: `href`, and `links`. Now, these may actually coalesce into one, as `links.self.href` should give us `href`. Perhaps we have to look on the form object for a links property. But, in django, it's not really the domain of the form to contain information about that. For now, I'm going to have a `links` property on my forms, but that feels dirty too.


[HYPER1]: http://shop.oreilly.com/product/0636920020530.do "Building Hypermedia APIs with HTML5 and Node"
[RULE1]: http://shop.oreilly.com/product/0636920021575.do "REST API Design Rulebook"