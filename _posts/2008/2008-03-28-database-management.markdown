--- 
wordpress_id: 1388
layout: post
title: Database Management
time: "18:15:11"
date: 2008-03-28 18:15:11
tags: 
- rants-and-raves
wordpress_url: http://schinckel.net/2008/03/28/database-management/
---
Databases are interesting. That's not really what I mean, databases are kinda boring. But necessary.

Accessing databases, however, can be interesting. Not in the sense that it is something you'd like to be spending time on, but more in the "May you live in interesting times" Chinese curse sense.

I know enough about databases to design simple ones, and access complicated ones using something like SQL. I'm not saying I'm an SQL Wizard, but I can generally fudge around enough to actually get at the data I want. It's really something I'd rather not do, fiddle around in SQL, but sometimes it's a necessity.

I do like tools that make accessing databases more "fun". There are two types that I've been using a bit lately.

The first are wrappers that make database tuples appear as objects. For instance, SQLAlchemy in python, and Java Entity Classes allow you to basically fetch an object from the database, operate on it, and ensure that the data is pumped back into the database. It's a really neat way to handle data, and allows great persistence of objects in OO programming.

The other is a GUI tool designed for accessing a particular DBMS or set of DBMSs. For instance, MySQL comes with an administrator program, which does a passable job. Lately, however, I've been required to access a PostgreSQL database. And there is a great tool for that: Navicat. With the latest version, you can even access a PGSL database over an SSH tunnel, all without having to set the tunnel up yourself.

For instance, I have a machine at my work that I can ssh into, but I can't directly access the development machine that has the PGSL database on it. I can set up the database as if I were on the work LAN, and then set up the SSH tunnel into the machine I can access. First time, without any hassles, and I was connected to the database. Securely. Over the internet.

I also tried another application I downloaded. But it was written in Java.

Java apps on the Mac really don't fit. I haven't used too many on Windows, but as soon as you launch a Java application in OS X, you know it's a Java app. It doesn't feel right. It doesn't use the right file open and save panels. That have all of my shortcuts that make it possible for me to work on several different projects and keep sane, and well organised.

I've fiddled with a couple of other Java apps, and almost without exception I have thrown them out immediately. There was a clunky merge application, which lasted one run. Same with PowerArchitect. It just interferes enough with my workflow that I can't make it happen.

Hell, it seems like a well-written application written for Windows, and running in Wine or VMWare seems to feel better than just about every Java application I have ever used. Well, maybe not every one. I guess a Java application that didn't feel like a Java application would slip under my radar.

Which is what I'd want.
