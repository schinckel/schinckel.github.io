--- 
wordpress_id: 545
layout: post
title: Toolbox Script Issues
time: "12:11:44"
date: 2005-11-04 12:11:44
tags: 
- javascript
wordpress_url: http://schinckel.net/2005/11/04/toolbox-script-issues/
---
This is more of a personal note, rather than a blog post, but still... 

  * timemods.js parts do not work in IE 5.5
  * quicktags.js does not remove some text (as required) in IE 5.5
  * floater.js has some issues with IE - clicking the shrink/grow checkbox when not at the top of the page is buggy. It then moves the box down too far, and keeps moving it down when scrolling
  * In IE, the buttons are too wide. This might actually be a CSS issue, rather than a script issue.

Unfortunately, I don't have an installation of IE 5.5 to figure out why the first one is so. I'm not that worried about it as it is a modification that can be lived without. Ditto for the second: it just removes the info about what tags are acceptable, and the buttons are just for these. The third one is the one that annoys me - I spent a fair bit of time getting the floater code to work properly, and I thought I had ironed out all of the bugs. It's also very frustrating that IE doesn't respect the `position:fixed `CSS attribute. That makes everything so much easier. (I think this is the section with the code bug. It may not be an IE specific bug, but since IE is the only browser that actually uses the `object.makeFixed(); `method, it's the only browser that displays this bug). The final one may have something to do with Installed Fonts. I'm not that sure. And since in general text is a little too wide in IE (such as in the sidebar, where some stuff wraps onto a second line) this looks to be the case. 
