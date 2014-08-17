--- 
wordpress_id: 1085
layout: post
title: "Hidden Threat: Alternate Data Streams"
time: "22:11:05"
date: 2007-01-04 22:11:05
tags: 
- general
wordpress_url: http://schinckel.net/2007/01/04/hidden-threat-alternate-data-streams/
---
[Hidden Threat: Alternate Data Streams][1] Hmm. This is quite interesting. Under any Windows machine with an NTFS disk, you can hide applications inside other files: `C:> type nasty.exe > plain.txt:nasty.exe` You can then run this command with: `C:> start plain.txt:nasty.exe` Now, this might not seem like much, but this is virtually undetectable. You can add any file to another file, and even exerienced sysadmins probably won't find it! 

   [1]: http://www.windowsecurity.com/articles/Alternate_Data_Streams.html

