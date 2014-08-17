--- 
wordpress_id: 847
layout: post
title: Commenting from IE
time: "19:16:47"
date: 2006-04-06 19:16:47
tags: 
- blogsome
wordpress_url: http://schinckel.net/2006/04/06/commenting-from-ie/
---
I have come to notice that commenting may not work properly from IE at the moment. I've got a JavaScript that does a heap of stuff - one of the things it does is re-enable Comments if JavaScript is turned on. However, since this function is called later than the one that creates the Links List, it doesn't get called if the latter fails. Which it does under IE's broken implementation of JavaScript. I've updated the script, and I hope this one works. If it doesn't please [email][1] me - if you don't have access to another browser and can't leave a comment. 

   [1]: mailto:matt@schinckel.net

