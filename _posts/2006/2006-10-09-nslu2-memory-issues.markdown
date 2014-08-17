--- 
wordpress_id: 1009
layout: post
title: NSLU2 Memory issues
time: "19:08:39"
date: 2006-10-09 19:08:39
tags: 
- nslu2
wordpress_url: http://schinckel.net/2006/10/09/nslu2-memory-issues/
---
I'm running my NSLU2 as a file server, torrent client and kaid server. With 6 torrents running, it runs out of memory, and starts killing processes willy-nilly. Took me a while to figure out this was why my script to auto-start a new torrent was being “Terminated.” Not sure how it works out which processes to kill, or if there's a way to reduce memory use. Then I came across a HOWTO: [Add Additional Swap Space][1]. Should fix stuff a bit. Just a note: it takes ages for the file to be created, apparently. 

[Kissing A Fool][2] • [George Michael][3] • [Ladies & Gentlemen : The Best Of George Michael][4] ★★

Edit: using `ps x o %mem 0 command`, I can see that each `enhanced-ctorrent` process grabs about 5 meg, while the 10 or so `kaid` processes each use up 2.1Mb. Since I haven't started using `kaid` yet, maybe I should stop it auto-starting... 

   [1]: http://www.nslu2-linux.org/wiki/HowTo/AddAdditionalSwapSpace
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Kissing+A+Fool&artistTerm=George+Michael
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=George+Michael
   [4]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Ladies+&+Gentlemen+:+The+Best+Of+George+Michael&artistTerm=George+Michael

