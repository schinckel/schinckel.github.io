---
date: 2012-04-26 00:13:24
layout: post
publish: true
tags: [django, hypermedia, "collection+json", "class-based-views"]
time: '00:13:24'
title: 'Hypermedia APIs in Django: Leveraging Class Based Views'

---


It seems that I keep rewriting code that generates APIs from django. I think I'm getting closer to actually getting it right, though :)

I'm rather keen on Collection+JSON at the moment, and spent some time over easter writing an almost complete Collection+JSON client, using KnockoutJS. It loads up a root API url, and then allows navigation around the API using links. While working on this, it occurred to me that Collection+JSON really encodes the same information as a web page:

* every `<link>` or `<a href=...></a>` element is either in `links` or `queries`.
* form-based queries map nicely to `queries` elements that have a `data` attribute.
* `items` encapsulates the actual data that should be presented.
* `template` contains data that can be used to render a form for creating/updating an object.

Ideally, what feels best from my perspective is to have a pure HTML representation of the API, which can be rendered by browsers with JS disabled, and then *all of the same urls* could also be fetched as Collection+JSON. Then, you are sharing the code, right up to the point where the output is generated.

To handle this, I've come up with a protocol for developing django Class Based Views that can be represented as Collection+JSON or plain old HTML. Basically, your view needs to be able to provide `links`, `queries`, `items`. `template` comes from a form object (called `form`), and by default `items` is the `queryset` attribute.

### leveraging views

I subscribe the idea that the less code that is written the better, and I believe that the API wrapper should (a) have minimal code itself, and (b) allow the end developer to write as little code as possible. Django is a great framework, we should leverage as much as is possible of that well written (and well tested) package.

The part of a hypermedia API that is sometimes ignored by web developers is handling the media type selection. I believe this is the domain of the "Accept" and "Content-Type" headers, not anything to do with the URL. Thus, I have a mixin that allows for selecting the output format based on the Accept header. It uses the inbuilt `render_to_response` method that a django View class has, and handles choosing how to render the response. As it should.

The other trick is how to get the links, queries, items and template into the context. For this, we can use `get_context_data`. We can call `self.get_FOO(**kwargs)` for FOO in each of those items. It is then up to the View class to handle those methods.

By default, a Model-based Resource is likely to have a form class, and a model class or a queryset. These can be used to get the items, and in the case of the form, the template. Even in the instance of the queryset (or model), we use the form class to turn the objects into something that can be rendered.

Finally, so it's super-easy to use the same pattern as with django's Views (`generic.CreateView`, for instance), I have a couple of classes: `ListResource` and `DetailResource`, which map directly onto `CreateView` and `UpdateView`. In the simplest case, you can just use:

{% highlight python %}
urlpatterns = patterns('',
    url(r'^foo/$', ListResource.as_view(model=Foo)),
    url(r'^foo/(<?P<pk>\d+)/$', DetailResource.as_view(model=Foo))
)
{% endhighlight %}

There is also a `Resource`, which just combines the resource-level bits with `generic.TemplateView`. You can use `ResourceMixin` with any other class-based-view, but make sure it appears earlier than the django view class, to make sure we get the correct method resolution order.

### links

There is still the matter of the `links` attribute. Knowing what to put into this can be a bit tricky. I've come to realise that this should contain a list of the valid states that can be accessed when you are in a given state. You will want to use django's `reverse` function to populate the `href` attribute:

{% highlight python %}
class Root(Resource):
    template_name = 'base.html'
    
    def get_links(self):
        return [
            {"rel": "root", "href": reverse('root'), "prompt": "Home"},
            {"rel": "user", "href": reverse('user'), "prompt": "You"},
            {"rel": "links", "href": reverse('tasks:list'), "prompt": "Task List"},
        ]
{% endhighlight %}

Note that you actually need to provide the view names (and namespaces, if appropriate) to reverse. Similarly, for any queries, you would want to use `reverse`, to make it easier to change the URL later. Also, django will complain if you have not installed something you reference, meaning your links and queries should never 404.

I'm still toying with the feature of having an automatic list of links that should be used for every view. Obviously, this should only contain a list of states that can be moved to from _any_ state within the system.

For rendering HTML, you may need to change your templates: actually, you _should_ change your templates. Instead of using:

{% highlight html %}
<a href="{{ "{% url 'foo' "}} %}">Foo Link</a>
{% endhighlight %}

You would reference that items in your `links` array:

{% highlight html %}
<a href="{{"{{ links.foo.href "}}}}">{{"{{ links.foo.prompt "}}}}</a>
{% endhighlight %}

I have used a little bit of magic here too: in order to be able to access links items according to their `rel` attribute, when rendering HTML, we use a sub-class of `list` that allows for `__getattr__` to look through the items and find the first one that matches by `rel` type.

### enter django-hypermedia

As you may surmise from the above text: I've already written a big chunk of this. It's not complete (see below), but you can see where it is at now: [django-hypermedia](https://bitbucket.org/schinckel/django-hypermedia).

There is a demo/test project included, that has some functionality. It shows how you still need to do things "the django way", and then you get the nice hypermedia stuff automatically.

### what is still to come?

I've never really been happy with Collection+JSON's error object, so I haven't started handling that yet. I want to be able to reference where the error lies, similar to how django's forms can display their own errors.

I want to flesh out the demo/test project. It has some nice bits already, but I want to have it so that it also uses my nice KnockoutJS client. Pretty helps. :)