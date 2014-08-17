--- 
wordpress_id: 491
layout: post
title: Cross Browser Script Up
time: "23:34:47"
date: 2005-10-14 23:34:47
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2005/10/14/cross-browser-script-up/
---
My script is now up and running, and cross-browser. I'll leave the Catchpa slightly disabled for the time being so I can test it a bit more on different machines. You'll also notice a nice little floating toolbar - this is only supposed to appear on the site when a user is logged in, but it seems to be there all of the time at the moment. The script is about 56k, which I think is too big, however I've had some issues with the compression utility I was using, so I'll roll my own solution. It is all in one file again, (easier to manage updating it), and I think the browser caches it, so it should only be slow on the first load. Things I need to do: 

  * Set it up so the true.gif and false.gif images are preloaded, so there is no delay on the first time a user clicks on a checkbox.
  * Have a tag in the template for enabling/disabling checkbox replacement.
  * Fix up admin toolbar.

I'm sure there's probably other stuff I need to do... 
