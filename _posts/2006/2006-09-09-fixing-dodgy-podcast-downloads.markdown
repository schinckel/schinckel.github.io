--- 
wordpress_id: 951
layout: post
title: Fixing dodgy podcast downloads
time: "13:24:37"
date: 2006-09-09 13:24:37
tags: 
- itunes
- radio-and-podcasting
wordpress_url: http://schinckel.net/2006/09/09/fixing-dodgy-podcast-downloads/
---
I listen to Podcasts rather than music most of my commuting time now. One of the ones I subscribe to is [The Science Show][1], from [ABC][2] [Radio National][3]. Back when I was on dialup, I used to `wget` the podcasts, and then add them to iTunes using a cool little hack, where I made my computer think it's own IP address was the address of the abc.net.au server. Then I didn't have to worry about iTunes not finishing a download, and having to start over. Resumable downloads rock. However, sometimes I would not get all of the file, and not realise. Thus, the other day I was listening to a great segment on Mathematics and the Brain, when the program stopped. I had only grabbed 33 minutes of the 48 minute program.  Trying to get iTunes to re-download a podcast is tricky, so instead I used wget to grab the full file, and then deleted the original iTunes file. I then replaced it with my new one. All fixed. This is a side-effect of the fact that iTunes doesn't keep that good of a track of files. You can move files out from underneath it, and it can't find them. I've come across this from the other perspective - we share the same directory for storing two people's iTunes libraries, so we don't have duplicates of all of the same music - but in this case, I used it to my advantage. 

   [1]: http://www.abc.net.au/rn/scienceshow/default.htm
   [2]: http://www.abc.net.au/
   [3]: http://www.abc.net.au/rn/

