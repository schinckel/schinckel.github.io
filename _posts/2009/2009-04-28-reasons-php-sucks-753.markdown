--- 
wordpress_id: 1657
layout: post
title: "Reasons PHP sucks #753"
time: "19:30:57"
date: 2009-04-28 19:30:57
tags: 
- php
wordpress_url: http://schinckel.net/2009/04/28/reasons-php-sucks-753/
---
> Another good example of a PHP “quirk” is the way PHP handles constants. It was one of the major factors affecting performance. Just removing all the constants allowed us to improve the performance by almost 2x (we left one constant to be precise).

From [The Need for Speed][1].

That's right - PHP is up to 2X faster if you don't use constants. You know, that means hardcode values in...

   [1]: http://blog.openx.org/06/the-need-for-speed/

