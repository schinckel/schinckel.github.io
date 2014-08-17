--- 
wordpress_id: 1678
layout: post
title: django-bshell
time: "23:29:23"
date: 2010-03-28 23:29:23
tags: 
- python
- django
wordpress_url: http://schinckel.net/2010/03/28/django-bshell/
---
bpython is pretty cool. It gives you an improved python shell, with popups of completeable values. About the only drawback is that some command-line editing doesn't work that well, but I can live with that.

I made a django app that provides a new management command: bshell. This will start a new shell, using bpython, and import all of your models.

You can get it with:

`pip install django-bshell`  


And then install it into your django settings.INSTALLED apps. The app itself is called 'bshell'. Then you can just use:

`django-admin.py bshell`  


The code can be found on [bitbucket][1].

   [1]: http://bitbucket.org/schinckel/django-bpython/

