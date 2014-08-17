---
date: 2014-08-06 21:09:31
layout: post
publish: true
tags: [python, django, review, ebook]
title: Review Django Essentials

---



[Django Essentials](http://www.packtpub.com/web-development/getting-started-django). Note it appears the name of this book has been changed from "Getting started with Django".

<img src="/images/2014/essential-django.jpg" width="100" style="float: right">
I'll be clear from the outset: I have some pretty strong issues about the first part of this book, and I'm going to be quite specific with the things that I think are wrong with it. Having said that, the later chapters are far better than the earlier ones.

I am not sure, however, that it's any more accessible than the [official documentation](http://docs.djangoproject.org). There's probably a market for a more thorough tutorial than the one on the Django website, however, I'm not sure this book, as it stands, is that tutorial.

How could this book be better?

I think it gets bogged down providing detail in areas that are just not that important at that point in time. I also think it misses a good overview of the product that is being built: indeed it's never clear, even after completing the book, exactly what the product is supposed to do.

In my opinion, the code examples are hard to read. This is a combination of the styling of the source code, and the layout. That bold, blue is quite jarring in comparison to the rest of the text, and the repeated lack of PEP8 compliance, especially when coupled with reading it on a narrow device, make it hard to follow the code. Multiple code blocks (which should be in separate files) flow together, making it hard to see where one stops and the next begins.

The book fails early on to push some basic Python standards and best practices. In some cases these are addressed later on, however it is not obvious what is gained by not starting from this point. Similarly, there are some security issues that should never have passed through editing. Again, these are addressed later, but I feel that the damage has already been done. Friends don't let friends store passwords in plain text; and very little is gained by disabling the CSRF protection.

But it's not just the source code that seems lacking. The technical translation at times varies between the obtuse and the absurd. Early chapters in particular (the ones that I think are more important when teaching basic concepts) contain sentences or paragraphs that required me to re-read several times in order for me to be able to translate it into something that made sense to me. And I've been writing Django code for about 6 years (and Python code for probably another 6 before it).

Would I recommend it?

After hitting the plain-text-password section, I said no. I actually have a couple of guys much newer to Django than me at work, and I did not want them to read the book at that point.

However, after I'd cooled down, and actually started to draft this review, I re-read the start, and read the rest. There is some good information, but I'm not sure that it's presented in a way that is better than the official documentation, or some other resources out there.

So, I'm really not sure I'd recommend it to a beginner. There are too many things early in the book that set up for future failures (or at least, unlearning). And I'm not sure I'd recommend it to an intermediate developer. It's not that it's _bad_ (with the caveats below), it's just not as good as what you can read on the Django website.


Some of the more important specific issues that I feel are wrong with this book follow. These are often things that beginners struggle with. You'll notice less stuff about the later chapters. That's because they are better.

* * *

Code standards.

Throughout the book, there are inconstencies with how individual models and modules are named. Whilst this seems pedantic, computers are pedantic, when it comes to textual source code. It _does_ matter if you use `Work_manager` in one place, and the `Workmanager` in another.

Further, in Python, we always (unless the project we are working on has different standards) use `snake_case` for module names, `TitleCase` for class names, and `snake_case` again for variables, methods and functions, and `ANGRY_SNAKE_CASE` for constants. There's just no reason to go against these guidelines.

Okay, I may have made up the name `ANGRY_SNAKE_CASE`.

Finally, Python code should be compliant to [PEP8](http://legacy.python.org/dev/peps/pep-0008/). I'm not sure that a single line of code in this book would pass through a PEP8 checker.

* * *

MVC/MVT

The section on "The MVC Framework" (tip: [Django isn't](https://docs.djangoproject.com/en/dev/faq/general/#django-appears-to-be-a-mvc-framework-but-you-call-the-controller-the-view-and-the-view-the-template-how-come-you-don-t-use-the-standard-names)) seems superfluous. It would be far better to avoid this term, and instead describe the typical flow of data that one might see in a request-response cycle handled by Django:

  1. The client sends a request to the server
  2. The server passes the request to the correct view function (according to the url)
  3. The view function performs the required work, and returns an HttpResponse object.
  4. The HttpResponse object is sent back to the server.

Depending upon the view, it may do any or all of the following:

  * Process data provided by the client using a Form
  * Load and/or save data to/from the database
  * Render an HTML template or return a JSON (or XML) response.
  * Perform any other action that is required

The whole concept of a Controller doesn't really make sense in the context of a web page, although purely within the client-side of a Single-Page-Application it could.

* * *

Installation.

I've [written about installation](http://schinckel.net/2011/05/14/installing-Django-%28or-any-Python-framework%2C-really%29/) before, notably discussing how every project should be installed into a new [virtualenv](http://virtualenv.readthedocs.org/en/latest/). Indeed, I even install [every command-line application in it's own environment](http://schinckel.net/2013/11/19/per-command-virtualenv/). And, most of the experienced Pythonistas I have come across always use a new virtualenv for each project, both in development and in deployment. So it was worriesome to see a non-best-practice approach used for installation.

Although this is addressed later in the book (in the chapter on deployment), I fail to understand the benefit of not mentioning it now. There are so many reasons to use virtualenv in development, and none I can think of for avoiding it.

* * *

Security

There are two things in this book that set off alarm bells for me, with respect to security. I've mentioned them above, but I'll go into a little more detail.

The more minor error is the disabling of CSRF checking. The inbuilt Django CSRF protection ensures a range of attacks are ineffective, and the mental cost of using this protection is fairly low: in any view that you are POSTing back to the server, you need to include the CSRF token. This is usually done as a form field, using the `csrf_token` template tag.

Disabling it is almost never a good idea.

Suggesting that you disable it "just for now" as the _only_ thing you change in the initial settings file is even worse. A beginning programmer may begin routinely disabling CSRF protection as they start a new project, and not re-enabling it. Bad form.

The severe error is storing user passwords in plain text. This flaw is so basic that, even though it is "fixed" later in the book, as is CSRF protection, by then I feel it is too late. Even hinting that either of these things is acceptable to do as an interim measure (do you have any idea how much "interim" or temporary code I have in production still, years after it was written?) makes me really struggle to continue reading.

However, I am glad I did.

* * *

URL routing and regular expressions

This book contains a reasonable explanation of regular expressions, but I think it would have been better suited to have a more concrete set of examples of how regular expressions can be used for URL routing in Django. For instance:

{% highlight Python %}
r'^tasks/$'

r'^task/([0-9a-z]+)/$'

r'^posts/(?P<year>\d{4})/(?P<month>\d{2})/$'
{% endhighlight %}

You could use a series of examples, like these, to describe some of the key rules of regular expressions, and at the same time discuss parameters. Alternatively, you could skip regular expressions at all at this point in time, and use simple strings.


When discussing URL routing, the following paragraph is a great example of a failure to explain what is essentially a simple process.

> "After having received a request from a web client, the controller goes through the list of URLs linearly and checks whether the URL is correct with regular expressions. If it is not in conformity, the controller keeps checking the rest of the list. If it is in conformity, the controller will call the method of the corresponding view by sending the parameters in the URL."

Phrased in a simpler manner:

"The URL resolver looks at each pattern in the order it is defined. If the regular expression of the url route matches the request's path, the matching view method is called with the request object and any other parameters defined, otherwise it is passed on to the next route."

* * *

Templates

This book presents a reasonable discussion of the Django template language. There are some parts that made me do a double-take (legacy of templates? Oh, you mean _inheritance_), and there are lots of important typos, missing characters, or just plain wrong source code.

And then there's `render_to_response`.

Back in the day, we used to use a function called `render_to_response()`, which required you to manually pass a `RequestContext` instance to it: we have since moved on to `render()`. There is no need really to mention `render_to_response()` in anything other than a footnote: "You might see older code that uses..."

Talking about the context itself is good, but I think it should be more explicit: "You pass three arguments to `render()`: the request object, the template path and a dict containing the variables from your view that you want available in the rendering context".

Oh, and later in the book, `locals()` is passed as the context. [The Zen of Python](http://legacy.python.org/dev/peps/pep-0020/): explicit is better than implicit. Yes, in the box immediately afterward, it is suggested that you don't do this.

Doing something, and then suggesting that you don't do it is counterproductive.


* * *

Models

Django's ORM gets some criticism at times. I find it's mostly good enough for my needs, indeed, it sometimes does a better job of writing queries than me. However, it is an Object Relational Mapper, and discussing how that works is simple terms would probably be useful. It's not strictly necessary to have a strong background in relational databases and SQL to use correctly, but understanding some of the implications of how accessing things from the ORM can cause issues, or indeed, how the data is even represented in the database can only be a positive.

> "To make a connection between databases and SQL, we can say that a model is represented by a table in the database, and a model property is represented by a field in the table."

Cumbersome language again, and not totally wrong, but probably slightly misleading. Perhaps:

"...a Model class is represented by a table in the database, and an instance of that Model is represented by a row/tuple. Fields on the model (which appear as special attributes) are the columns of that row."

A discussion of south is also somewhat welcome. Even though the soon to be released Django 1.7 contains a superior (but written by the same person) implementation of migrations, it's certainly still worth understanding a little about how south works.

However, there is one false statement when discussing south:

> "Never perform the Django `syncdb` command. After running `syncdb --migrate` for the first time, never run it again. Use `migrate` afterwards."

This is a broken statement. If you were to add a new app that did not have migrations, then without a `syncdb` command, the tables for it's models would not be created.

This chapter suddenly gets a whole lot worse as soon as a model is defined with a plain-text password field, but I've already discussed that.

* * *

`Django.contrib.admin`

I spend a lot of time trying to talk people out of using the admin module as anything other than a top-level admin tool. Really, this is a tool that is fantastic for viewing and maniplating data in the early stages of development, and great for emergency access for a developer or trusted admin to view or change data on a live system, but trying to push too much into it is problematic. I say that as someone who has a project that relies far too much on the admin.

It's also hard to not discuss the admin, as it really is a great tool, but it's really important to understand it's limitations.

I quote Django core contributor Russ Keith-Magee:

> "Django's admin is not meant to be the interface for your website"

* * *

QuerySets

Interestingly, the chapters on QuerySets and Forms are actually far better than those preceeding. The source code isn't formatted any better, but it really does seem that the translations make (mostly) more sense.

I do think the manner of adding data to the database is bunkum, however. Given that we just covered the admin interface, it would make sense to use this to add some data, before looking at QuerySets. And we could delve into `manage.py shell` in order to illustrate how QuerySets, their various methods, and some model methods actually work.

And while we are on anti-patterns: `queryset[:1].get()` is pointless. You might as well just use `queryset[0]`. It is exactly the same SQL, and easier to read.

* * *

Forms

And then we get to Forms. I'm a really big fan of Django's form handling: it's something that makes dealing with user input much safer, and simpler. And this chapter explains that, but, from an educational perspective, I'm cautious that showing someone the wrong way to do something first is counter-productive.

Sure, I understand that it makes a point, and having done something a laborious, error-prone way for some time, and then being shown a safer, faster, easier method is eye-popping, but I fear that for some percentage of readers, they will get a takeaway that not using Forms is a valid choice.

Even beginning with a ModelForm is probably a nice approach, as you can get a lot of functionality with almost no code at all.

* * *

CBV

The section on Class Based Views is okay too. These are something else that are often hard to understand, and the initial official documentation on them was sadly lacking. Once you have your head around how they work they can be really powerful, and this book takes the right approach in suggesting caution about not always using them. Similarly, it is great that these were not used as a starting point.

However, I find that the explanations and descriptions are not always clear. Certainly as an experienced Django user I can read and understand what is going on, but as a beginner I think this chapter would be hard to follow. Perhaps a simple discussion about what the different CBV are used for, and how the `ViewClass.as_view()` pattern works, and why it is required, and then some examples.

Perhaps a better approach would have been to have written Model and Form classes earlier, and then writing the function-based views to CRUD those objects, and then rewriting the exact same views using CBV.

* * *

`Django.contrib.auth`

Although far less impressive that the admin, I think that `auth` is a more important module. Especially now given we can easily swap out `auth.User`, to get the desired user functionality, I think this is something that should be given more weight. It doesn't need to necessarily come before the chapter about the admin, but it should be discussed, or at least introduced, before _anything_ is done with a `User`-ish model.

I think this book does not do justice to `Django.contrib.auth`. There are lots of views and forms that can (and should) be used to save writing your own code, which is more likely to have bugs. Also, even if the basic `User` model is used in the example, a discussion of how easy it is to swap out, and get "email as username" functionality is certainly deserved.

* * *

AJAX

I'm probably 50-50 on the AJAX chapter. I guess I understand why you'd want to include a chapter on it, but I worry that this chapter maybe doesn't do enough. If it's an introduction to AJAX I'm not sure it seems up to that.

I do often use jQuery, but it's probably not too tricky to rewrite the code to delete an object using vanilla Javascript. And if you are going to use jQuery, you should get the idioms right.

{% highlight js %}
var cases = $('nav ul li').each(function() {
  $(this).addClass('nav_item');
})
{% endhighlight %}

Can easily be written:

{% highlight js %}
$('nav ul li').addClass('nav_item');
{% endhighlight %}

And we probably shouldn't use `$(foo).html($(foo).html() + bar)`, when really we want to use `$(foo).append(bar)`.

Also, I don't think that using `csrf_exempt` is a great idea: the official documentation has details about how to use AJAX and still keep CSRF protection.


* * *

Thanks to:

* Maior in #django for proofreading.