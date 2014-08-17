--- 
wordpress_id: 453
layout: post
title: Instant Preview in Mozilla Browsers
time: "00:36:10"
date: 2005-10-03 00:36:10
tags: 
- blogging
- javascript
wordpress_url: http://schinckel.net/2005/10/03/instant-preview-in-mozilla-browsers/
---
I've noticed that the Preview code that both the WordPress Dash, and my Comment Preview uses (okay, I stole it from there!) is really slow - read as unusable in Instant Preview mode - under Mozilla browsers (on Mac, at least). There is a noticeable lag between typing and the characters appearing on the screen, in the Text Box, let alone in the Preview Box. I wonder if it would be possible to rewrite the script so that it wasn't `onkeyup`, but every 5 seconds, or something like that. Or possibly make it so it doesn't redraw the whole lot? Perhaps the best would be that it only redraws when keys have been pressed, but not in the last 3 seconds. I'm not sure if any of these can actually be done! 
