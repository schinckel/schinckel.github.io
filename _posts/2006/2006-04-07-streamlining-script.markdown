--- 
wordpress_id: 850
layout: post
title: Streamlining Script
time: "10:25:59"
date: 2006-04-07 10:25:59
tags: 
- javascript
- asides
wordpress_url: http://schinckel.net/2006/04/07/streamlining-script/
---
I've got a heap of stuff in the toolbox script that does nothing anymore - at least on my site - so I think I might streamline it a bit by removing a large number of the functions that are no longer required. For instance, I don't need to create Gravatars in JavaScript, since there's a Smarty Plugin to do this - which also negates the need for the md5 stuff. At the moment, the script is 56k, which is a little too bulky. 
