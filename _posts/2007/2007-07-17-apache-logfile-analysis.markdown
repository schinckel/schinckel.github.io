--- 
wordpress_id: 1202
layout: post
title: Apache Logfile Analysis
time: "19:12:38"
date: 2007-07-17 19:12:38
tags: 
- itunes
wordpress_url: http://schinckel.net/2007/07/17/apache-logfile-analysis/
---
With a proper host, I have finally achieved the ability to do proper analysis of my logfiles. Since my traffic amount has been fairly high, I thought I would try to find out where all of my megabytes went! I'm using Analog, since that was free and did sort of what I want. I started writing my own tool, but got bored with that pretty quickly. 27% of my usage was in the XMLRPC.php file. Which had me stumped, until I remembered I'd used ecto to backup all of my posts, a couple of times as it turned out. This was 14 Mb, which I shouldn't have to do all of the time. There's still more stuff for me to find out - like how much of my bandwidth is being used up by Blogsome users who haven't changed stuff within their template and I had pointing to mine. 

[Prélude No. 3 For Clavier][1] • [Dominic Miller][2] • [Shapes][3]

   [1]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Pr%C3%A9lude+No.+3+For+Clavier&artistTerm=Dominic+Miller
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Dominic+Miller
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Shapes&artistTerm=Dominic+Miller

