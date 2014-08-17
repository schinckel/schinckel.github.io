--- 
wordpress_id: 337
layout: post
title: iTunesRater Rewrite Planned
time: "22:54:36"
date: 2005-08-08 22:54:36
tags: 
- itunes-rater
- objective-c
wordpress_url: http://schinckel.net/2005/08/08/itunesrater-rewrite-planned/
---
I borrowed _[Cocoa Programming for Mac OS X][1]_ from the library the other day. I've read most of it, away from the computer, although I plan to reread it in front of the iMac over the next few weeks. I'll write a review of it a bit later, but it reminded me that I still have a memory leak in iTunesRater. Also, I think I'll rewrite iTunesRater as a Cocoa Objective-C application, rather than AppleScript Studio. Then I can just use an AppleScript message to get/send data, rather than relying on AppleScript for interface updates. That way the application may be a bit snappier. And hopefully I'll overcome the memory leak. I was actually thinking of a refactor anyway, as there's a whole heap of semi-duplicated code in there. 

   [1]: http://www.amazon.com/exec/obidos/tg/detail/-/0321213149/qid=1123507313/sr=8-1/ref=pd_bbs_1/002-2838226-6920842?v=glance&s=books&n=507846

