--- 
wordpress_id: 138
layout: post
title: Palm Blogging via ecto
time: "05:03:16"
date: 2004-09-30 05:03:16
tags: 
- blogging
- palmos
wordpress_url: http://schinckel.net/2004/09/30/palm-blogging-via-ecto/
---
Well, using my limited AppleScript skills, I've created a system for blogging via ecto from my palm. Using the MacNoteTaker Conduit, and a Folder Action Script, ecto creates & posts a new post for each new file in the monitored folder. Now all I need to do is 'fix' the Conduit so it handles deleted files a bit better. However, since the Conduit was written for a different development environment, I'll have to get the original working first. Oh, and this post was done directly from my Palm. Well, the paragraph above was, anyway. Bugs to get rid of: 

  * Doesn't do much parsing of the data. Paragraphs don't seem to exist. Fixed: Used property **body text** instead of **entry body.**
  * Use an alternate form of getting the date. MacNoteTaker date-stamps all new files. I'll use this. Done.
  * Parse the first line to get the post title. Done.
