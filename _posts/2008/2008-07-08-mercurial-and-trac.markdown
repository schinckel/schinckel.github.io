--- 
wordpress_id: 1482
layout: post
title: Mercurial and Trac
time: "16:46:07"
date: 2008-07-08 16:46:07
tags: 
- programming
- scm
- trac
wordpress_url: http://schinckel.net/2008/07/08/mercurial-and-trac/
---
I'm enamoured with Mercurial for all of my version control needs. I'd like Versions to work with it, but the response I got from the developer suggests it never will. "UI of Versions is designed completely around the concept of centralized version control " I can see that the same type of interface would work quite well with Mercurial, or another DVCS, without too many hassles.

Still, even just with the CLI, I'm coping.

A couple of days ago I started playing with Trac for bug tracking. I had used Bugzilla (not for my own projects, but I use it at work), and it doesn't work properly with Mercurial. The good news is that Trac does, almost out of the box.

The trac-post-commit-hook works fine, and allows me to have a repository linked in with my trac store, and when changes are checked in that have "fixes ticket:X", it automatically updates the trac for that ticket. It's a bit of a repetitive process to set it up (you have to manually edit both the repo/.hg/hgrc file, and the trac/trac.ini file to add support for each other, but it's easy enough to do).

The only annoyance is that the username isn't quite the same in both - so changes made in Trac have the username matt, whilst those made in mercurial have the default username there - which includes my full name and my email address.
