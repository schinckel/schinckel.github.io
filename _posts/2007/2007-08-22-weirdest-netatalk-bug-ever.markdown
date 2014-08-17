--- 
wordpress_id: 1240
layout: post
title: Weirdest netatalk bug ever
time: "18:23:31"
date: 2007-08-22 18:23:31
tags: 
- ubuntu
wordpress_url: http://schinckel.net/2007/08/22/weirdest-netatalk-bug-ever/
---
Okay, this one has me stumped.

I have all of my iTunes music stored on a local server, along with the remainder of my media files (Movies, TV series, copies of Digital Photos). This has been working pretty seamlessly, until I noticed something odd.

I knew I had some files there, but they weren't displaying. Logging into the server using ssh, or for that matter SMB showed me the files were indeed there. But whenever I logged into the server via AFP, they don't.

Most files do, but some of them aren't there. But if I access the share using a parent share (/home/media, instead of /home/media/music), then the files are visible again.  


I am at my wits end here!
