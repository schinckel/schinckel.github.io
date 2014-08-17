--- 
wordpress_id: 1041
layout: post
title: iTunes losing Podcast episodes
time: "10:04:40"
date: 2006-11-18 10:04:40
tags: 
- itunes
- radio-and-podcasting
wordpress_url: http://schinckel.net/2006/11/18/itunes-losing-podcast-episodes/
---
For my daily commuting, which recently has been almost entirely on bicycle, I subscribe to a series of podcasts. These are mainly from the ABC in Australia, but thrown into the mix is the NewScientist podcast. Back when I was on dialup, I used a neato trick to download podcasts using wget, and then import them from the local machine when they were fully downloaded. This was mainly because wget is better at resuming downloads than iTunes was then, and to a certain extent still is. At least now you can pause and resume some downloads, but iTunes still times out long before wget does. I used this same trick a couple of weeks ago when the NewScientist server had some sort of an issue, and the long and the short of that was that I had some entries in the NetInfo database, and I still had a couple for the NewScientist servers. And because of that, wasn't actually downloading the newer podcasts since then. I fixed that problem, but now I've come across another. Two podcasts are missing from the list - the two most recent. I know iTunes tried to download them a couple of times, but it's like I clicked on them and pressed Delete. And then, I wasn't able to get them to come back. I tried unsubscribing, and then resubscribing, but no joy. And then I happened across a hint on [MacOSXHints.com][1] ([Re-download podcasts without subscribing again][2]): 

> After that, I collapsed the podcast series by clicking the triangle, and then expanded it again while holding the option key

Bingo. This has apparently fixed it all up. 

   [1]: http://www.macosxhints.com/
   [2]: http://www.macosxhints.com/article.php?story=20051204231158931&query=podcast%2Boption

