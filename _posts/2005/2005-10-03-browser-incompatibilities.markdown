--- 
wordpress_id: 455
layout: post
title: Browser Incompatibilities
time: "19:20:42"
date: 2005-10-03 19:20:42
tags: 
- blogging
wordpress_url: http://schinckel.net/2005/10/03/browser-incompatibilities/
---
I've spent most of the day tweaking stuff, and have come across the following issues: 

  * Safari has no ability to find either the cursor position or the selection in a TextArea. This means that _Quicktags_ will not work under Safari. I'm going to file a bug report with Apple over this one, as it's rather crap.
  * Neither Safari nor Mozilla support `onTimer()`, which means my plan to have the Comment Preview update every 3 seconds rather than on every keypress will not work. I still need to try to find a way to make the Preview faster on Mozilla. It's fine on Safari.

I've also spent a fair amount of time playing around with trying to get comments to appear on the front page, but I think I need to be able to access the SQL database directly, and run a query in order to do this. And store the result in a variable. But I can't figure out how (if it's even possible) to do this. 
