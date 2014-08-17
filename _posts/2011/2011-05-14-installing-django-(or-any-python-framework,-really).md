---
date: 2011-05-14 10:22:42
time: "10:22:42"
publish: true
tags: [django, python, virtualenv, development, deployment]
title: Installing django (or any python framework, really)
layout: post

---


## TL;DR

{% highlight bash linenos %}
$ pip install virtualenv
$ virtualenv /path/to/django_project/
$ . /path/to/django_project/bin/activate
$ pip install django
{% endhighlight %}

I hang around a fair bit in #django now on IRC. It's open most of the time I am at work: if I am waiting for something to deploy, I'll keep an eye out for someone that needs a hand, or whatever. Yesterday, I attempted to help someone out with an issue with django and apache: I ended up having to go home before it got sorted out.

One of the things that came up was how to actually install django. The person was following instructions on how to do so under Ubuntu, but they weren't exactly 'best practice'.

One of the things I wish I had been around when I first started developing using python is ``virtualenv``.  This tool allows you to isolate a python environment, and install stuff into it that will not affect other virtual environments, or the system python installation.

Unfortunately, it does not come standard with python. If it were part of the standard library, it may reduce the likelihood of someone not using it. The upside of it not being in the standard library is that it gets updated more frequently.

## Installing virtualenv

First, see if virtualenv is installed:

{% highlight bash linenos %}
$ virtualenv --version
{% endhighlight %}

If not, you'll need to install it. You can install it using ``pip`` or ``easy_install``, if you have either of those installed. If you are a super-user on your machine (ie, it is _your_ computer), then you may want to use sudo. You can have it installed just in your user account, which you might need to do on a shared computer.

You'll probably also want to install pip at the system level. I do this first, and use it to install virtualenv, fabric and other packages that I need to use outside of a virtualenv (mercurial springs to mind). Do note that a virtualenv contains an install of pip by default, so this is up to you: once you have virtualenv installed, you can use pip in _every_ virtualenv to install packages.

## Setting up a virtual environment

I recommend using virtualenv for both development and deployment.

I think I use virtualenv slightly differently to most other people. My project structure tends to look like:

{% highlight bash linenos %}
/home/user/development/<project-name>/
    bin/
    fabfile.py
    include/
    lib/python2.6/site-packages/...
    project/
        # Project-specific stuff goes here
    src/
        # pip install -e stuff goes here
    tmp/
{% endhighlight %}

Thus, my $VIRTUAL_ENV is actually also my $PROJECT_ROOT. This means that everything is self contained. It has the negative side-effect of meaning if I clone my project, I need to install everything again. This is not such a bad thing, as I use Fabric to automate the setup and deployment processes. It takes a bit of time, but using a local pypi mirror makes if fairly painless.

Obviously, I ignore ``bin/``, ``lib/`` and the other virtualenv created directories in my source control.

However, since we are starting from scratch, we won't have a fabfile.py to begin with, and we'll just do stuff manually.

{% highlight bash linenos %}
$ cd /location/to/develop
$ virtualenv my_django_project
{% endhighlight %}

That's it. You now have a virtual environment.

## Installing django/other python packages

You'll want to activate your new virtualenv to install the stuff you will need:

{% highlight bash linenos %}
$ cd my_django_project
$ . bin/activate
(my_django_project)$
{% endhighlight %}
    
Notice the prompt changes to show you are in a virtual environment.

Install the packages you need (from now on, I'll assume your virtualenv is active):

{% highlight bash linenos %}
    $ pip install django
{% endhighlight %}

There has been some discussion about having packages like psycopg2 installed at the system level: I tend to install everything into the virtualenv.

So that's it. You now have django installed in a virtual environment. I plan to write some more later about my deployment process, as well as how I structure my django projects.