--- 
wordpress_id: 1260
layout: post
title: VirtualHost in Apache
time: "09:29:32"
date: 2007-09-21 09:29:32
tags: 
- web-design
wordpress_url: http://schinckel.net/2007/09/21/virtualhost-in-apache/
---
I'm working on a website at the moment, and to make stuff easier I created a new _VirtualHost_ entry in my `/etc/httpd/httpd.conf` file. However, after creating it, and putting a new entry into `/etc/hosts`, I was still unable to access it. The machine name resolved fine, but was showing the root of the main server, not the virtual host.

`[Fri Sep 21 09:15:51 2007] [error] Cannot resolve host name memake --- ignoring!`  


Turns out the hostname entry must be put in before the `httpd` master process is (re)started, else it whinges about not being able to find the hostname. Restarting the server again made it work perfectly.

Moral of the story: `/etc/hosts` before /etc/httpd/httpd.conf
