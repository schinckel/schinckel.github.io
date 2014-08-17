--- 
wordpress_id: 731
layout: post
title: Opera/IE JavaScript Strings
time: "18:29:44"
date: 2006-03-06 18:29:44
tags: 
- javascript
wordpress_url: http://schinckel.net/2006/03/06/operaie-javascript-strings/
---
Apparently, Opera and Internet Explorer don't allow for subscript notation of characters in strings. I came across this while using the following idea: `if ts[0] == "c";` Whereas, to work fully cross-browser, I needed to use the much uglier: `if ts.slice(0,1) == "c";` I know which I prefer. • This was what was causing comments to have the link false at the bottom of them, rather than the much nicer 69 days, 41 hours after the fact. (These aren't real links, so don't stress if you cannot click on them!) If you notice any other strangeness with my blog, or my scripts, please let me know, so I can fix it. 
