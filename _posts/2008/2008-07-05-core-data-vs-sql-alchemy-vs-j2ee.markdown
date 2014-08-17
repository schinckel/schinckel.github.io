--- 
wordpress_id: 1480
layout: post
title: Core Data vs. SQL Alchemy vs. J2EE
time: "10:02:04"
date: 2008-07-05 10:02:04
tags: 
- python
- objective-c
- java
wordpress_url: http://schinckel.net/2008/07/05/core-data-vs-sql-alchemy-vs-j2ee/
---
Three languages. Three different Object Relational Mapping systems. One operating system.

Over the past couple of days, I've been madly learning how to create programs in Core Data, using Objective C and Cocoa. It's given me plenty of food for thought, and made me perhaps think that it's not that SQL Alchemy rocks my world, it's just that J2EE/EJB is just ORM done wrong.

I actually got exposure to SQL Alchemy in detail before J2EE - I first came across them at the same time, but using SQL Alchemy was at work, and I basically had to learn in 2 days what a full semester worth of J2EE taught me. Perhaps that was just because learning the python stuff was so damn easy.

Now that I understand just how cool an Object Relational Mapping is, getting into Core Data was easy. Creating the same schema in SQL Alchemy (actually, using Elixir, so it was just object creation), and then in a Core Data xcdatamodel - basically the same process, was even simpler in Core Data: simply because it is a GUI tool, and you can see the whole model in one go, instead of having to scroll through a text file examining classes.

But doing GUI programming using the ORM is where Core Data really shines. Using Cocoa Bindings, you can just plonk down an NSTableView, and tell the object where it gets it's data from. If you have two GUI widgets using the same data model, and you change selection in one, it even changes the selection in the other!

Core Data also helps look after Undo, Saving and all other sorts of goodness I haven't even come across yet.

The only thing that Core Data isn't good for is a multi-user system - or more precisely, a system where multiple users are accessing the data at the same time. I've used SOAP as the messenger format, where I had a rich client accessing services provided by my server, but this is cumbersome. I'll just use Pylons, or perhaps Django to do a web application - where the interface is largely a Web Browser. In this instance, it will probably be best to just stick to a python-based approach. I'm tempted by WebObjects, but that would still require me to use Java.

If only Apple would release a distributed Core Data. I might be able to do something kind of cool with Distributed Objects, for a rich client, at least, but for Web, I may as well do the whole thing in python.
