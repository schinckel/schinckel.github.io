--- 
wordpress_id: 1675
layout: post
title: Django Management.tmbundle
time: "14:59:38"
date: 2010-02-28 14:59:38
tags: 
- general
- testing
- textmate
- django
wordpress_url: http://schinckel.net/2010/02/28/django-managementtmbundle/
---
Did some work on my [Django Management.tmbundle][1] last night.

It now handles running tests when (a) The apps are not directly in the project root, but inside another folder, for instance; and (b) the app/tests.py file has been split into seperate files.

The main reason I made this was so that I could run tests and have clickable links in the results window for the location of failing tests.

There is still much to do on this. I am considering re-writing it in python rather than ruby, so I can programmatically find the app name, rather than guess it. I also want to refactor the hell out of it and make it much nicer.

Anyway, if you are interested, you can find the most recent version at [http://github.com/schinckel/Django-Management.tmbundle][1] - and I think it also appears in TextMate's getBundles bundle.

   [1]: http://github.com/schinckel/Django-Management.tmbundle

