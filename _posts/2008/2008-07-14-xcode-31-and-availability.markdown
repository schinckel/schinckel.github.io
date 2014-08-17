--- 
wordpress_id: 1503
layout: post
title: XCode 3.1 and "Availability"
time: "11:22:51"
date: 2008-07-14 11:22:51
tags: 
- macos-x
- asides
- programming
wordpress_url: http://schinckel.net/2008/07/14/xcode-31-and-availability/
---
You can't have a class with the name "Availability" in a project built with XCode 3.1.

You can with XCode 3.0, but CFNetwork, and I assume a heap of other classes use a class called "Availability" to define if objects are available in a particular version of the OS.
