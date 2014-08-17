--- 
wordpress_id: 370
layout: post
title: Python Scripts inside AdiumScripts package
time: "20:49:10"
date: 2005-08-19 20:49:10
tags: 
- python
- adium
wordpress_url: http://schinckel.net/2005/08/19/python-scripts-inside-adiumscripts-package/
---
I've got some stuff to do that will be easier with `python`, so I'm wondering if it's possible to package a `python` script up, and use it from within an AppleScript, without having to have it in the path. It may not be, since AppleScript's 

do shell script "pwd"

returns `"/"`, indicating it is running at the root directory. Well, back to pipes and `awk`/`sed`. (Actually, I think I'd just used `awk` & `sed` inside the `python` script). 
