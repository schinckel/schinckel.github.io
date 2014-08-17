--- 
wordpress_id: 658
layout: post
title: Quicktags Bug
time: "11:35:32"
date: 2006-02-05 11:35:32
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2006/02/05/quicktags-bug/
---
For some reason, there is a small bug in the Quicktags.js script I contributed to Blogsome. That is, when putting in an abbr, or an acronym, only some Browsers will automatically add what the abbreviated term stands for (or what it might stand for). I coded in a series of common values, so that, for instance, if you have AAC selected, and press abbr, then it will put Advanced Audio Coding into the title field. It works with Firefox. It also works in Safari, but only if the User Agent is changed - older versions of Safari didn't support Quicktags at all, so the authors of WordPress coded in a check, and the Quicktags don't appear in Safari. I must fix the check in the Blogsome code, and submit it to Roger. It doesn't work, however, with either Opera or Internet Explorer. Something to fix, later. 
