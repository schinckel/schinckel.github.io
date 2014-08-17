--- 
wordpress_id: 1219
layout: post
title: rwhod OS X weirdness
time: "18:01:05"
date: 2007-07-22 18:01:05
tags: 
- general
wordpress_url: http://schinckel.net/2007/07/22/rwhod-os-x-weirdness/
---
I like using `rwhod` on my home network. It means I can see how long the various machines have been on for, but there is one issue. On my Ubuntu box, everything is hunky dory. `rwhod` starts at boot, and tells me the uptime of that machine, and who is logged in. However, on the Macs, `rwhod`, while started, doesn't seem to work. If I kill the process, and restart it (both as superuser), then it picks up the data fine. I wonder if it has something to do with starting too early in the boot sequence. I've got it set up as a _LaunchDaemon_, and it ran last boot as process 58. Perhaps something else needs to have started before it will work. 

[Flyin' High][1] • [Baja Marimba Band][2] • [Espresso Espresso][3]

   [1]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Flyin'+High&artistTerm=Baja+Marimba+Band
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Baja+Marimba+Band
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Espresso+Espresso&artistTerm=

