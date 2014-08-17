--- 
wordpress_id: 1345
layout: post
title: Life as a Coder
time: "23:25:33"
date: 2008-01-14 23:25:33
tags: 
- python
- php
wordpress_url: http://schinckel.net/2008/01/14/life-as-a-coder/
---
I never thought I'd manage to find a job coding in python for a living. But that is what my full-time job is, right now, anyway.

I can't really talk about the work I'm doing, since it is a commercial enterprise, but I can talk about what sort of things I am coding. I have spent the last couple of weeks rebuilding a server in python that uses SOAP to communicate with the outside world (well, a client application, anyway) over SSL connections. Python is used so it is easily extensible, without having to recompile. Eventually it will be dynamic, where new modules can be added to a database, and depending on the userid of a request, a different function will be called. It's really quite exciting.

I've come across a couple of new software programs - one of which is NX (nomachine) Client, which is a remote tunnel for X windowing. I can remote in via this to work from home, as well as ssh or sftp. Which is fairly cool. Speedier than VNC, since I think the local X-Windowing system is responsible for some of the drawing tasks. Feels about the same over ADSL as ARD does over WLAN.

In my "free" time I've been doing a couple of other things, both programming tasks. The first is a web application for an art gallery to create HTML and PDF invitations and newsletters. Originally I planned to use a web app so that it could eventually be rolled out as a blog-alike - in fact originally it was just going to be a WordPress installation with some minor modifications. It turned out to be easier to rewrite it from scratch. I have learned from this process that PHP is crap: it's never clear about the way to do stuff, and many functions have weird names. count_chars, for instance, doesn't really count the characters, unless you decide that things like #@! aren't characters. In which case you want strlen. Which had me tricked for some time, since I stopped looking once I had found count_chars. Python and len(anything) is much better.

Speaking of python (again), I've also been working on a Regular Expression helper - similar to the one that comes with Komodo IDE. I started (and pretty much finished, in a matter of hours, to the extent it solved my first use problem) this after having to load up Komodo just to get a visual representation of which bits of a text block were being matched by a regex. Still some kinks to work out - I need to figure out how to put stuff into an outline view, so I can see more than just matches, but match groups. Then it will be all good.

In the process of my work job, I downloaded SOAP Client, a freeware tool for testing SOAP packets. It was all good until I tried sending HTTPS requests, which it fails unfathomably on (cannot connect to endpoint...). I emailed the author, and he then promptly released the source code. I've snaffled that from Google Code, and I'll try to hack through it a bit to implement SSL connections. Not sure how to go about it at this stage - dunno if it is with WebKit or something else I need to do. I also plan to add in the ability to edit the SOAP request manually before it is sent off to the server.

I start Uni in a couple of weeks - I'm doing an introductory Java course in intensive mode, which I expect to be fairly easy. I'm really only doing it so I can do the meatier sounding subjects, like Programming Language Concepts and Systems Programming. I really think I'm going to enjoy this course. I will be interested when I come to the Internet Computing subject, since I've been doing a fair bit of that in various forms over the past few years. Be interesting to see what the academics think it means.

Well, that's been my life over the time period since coming back from the beach for a 10 day holiday over New Year. Apart from squeezing in a few games of Touch Football here and there, I've pretty much been chained to my laptop.

And loving it.
