--- 
wordpress_id: 390
layout: post
title: Chatting to Robots?
time: "19:31:30"
date: 2005-08-26 19:31:30
tags: 
- languages
- adium
- itunes-rater
wordpress_url: http://schinckel.net/2005/08/26/chatting-to-robots/
---
I had a thought just before. (Unusual, I know). I wrote a program called [iTunesRater][1] so I can rate my music as I listen to it in iTunes, and then went on to write a series of Adium Scripts to control iTunes ratings, and get data from iTunes. 

What if instead of having to create scripts for iTunes that did everything you want, you just create a bot that runs, and you send messages to it, and it controls iTunes. So, I could have the program running, and instead of having to type: `/itunes` 

_♫ The Chemical Brothers (Feat. The Flaming Lips) • The Golden Path _

`/rate{44} /itunes` 

_♫ The Chemical Brothers (Feat. The Flaming Lips) • The Golden Path ★★_ 

I could just start up a chat with iTunes, and type all sorts of commands: 

`me: song` 

_it: ♫ The Chemical Brothers (Feat. The Flaming Lips) • The Golden Path_ 

`me: rate 44` 

_it: ♫ The Chemical Brothers (Feat. The Flaming Lips) • The Golden Path ★★_
 
`me: next track` 

_\[iTunes next track plays\]_ 

All it would seem to require is a program that can connect to a server of some sort (I think maybe Jabber, then I can run my own Jabber server!), and sends AppleScript messages to iTunes. Or any other application, for that matter. 

   [1]: http://schinckel.net/category/itunesrater/

