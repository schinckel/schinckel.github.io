--- 
wordpress_id: 31
layout: post
title: iCal to unix calendar
time: "08:56:20"
date: 2004-06-10 08:56:20
tags: 
- general
wordpress_url: http://schinckel.net/2004/06/10/ical-to-unix-calendar/
---
Because I have a PC right next to my Mac (I hate Windows, but until AutoDesk make Inventor for MacOS X...) I sometimes need to be able to check my diary - which I have recently converted to iCal. 

Since the reason I am not on the Mac is because my Significant Other is using it, I need a non-gui, non-AppleScript way of checking what's on for me today. 

Being a refugee from BeOS, and having used various unix (and even VMS - the DOS of the mainframe world!) flavours, I had come across calendar. What I needed was a way to make calendar read from the iCal `*.ics` files. (Speaking of ICS, Google seems to think I am searching for Internet Connection Sharing. Grr!) Since the files themselves are quite easy to understand, I knocked up a quick python script. Called pycal.py, you can find it at [pycal.py][1]. 

   [1]: http://members.optusnet.com.au/~matt.schinckel/files/pycal.py

