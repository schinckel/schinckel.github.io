--- 
wordpress_id: 45
layout: post
title: iTunesRater 0.3
time: "19:40:32"
date: 2005-03-14 19:40:32
tags: 
- itunes-rater
wordpress_url: http://schinckel.net/2005/03/14/itunesrater-03/
---
Okay, notification is a breeze. [iTunesRater][1] now has two new features: 

  1. Doesn't poll, waits for notification from iTunes (requires 4.7.1)
  2. Volume Adjustment

Instead of polling iTunes every 5 seconds, the information is only checked when iTunes sends a general notification to the NotificationCenter. This should mean less CPU use, not that I was using much anyway. To get this to work well, I had to notify the AppleScript that a change had been made, by 'pressing' one of the interface items. Slightly unorthodox, but effective. Also, a few of my CDs are softer than the rest, I now have a volume adjustment slider on the left hand side that can be used to modify the volume of the current track - don't use this as your master iTunes volume, it writes the data into your library, so that track will become louder or softer each time you play it. I might actually make this into a fully-fledged iTunes Controller, with AutoRating features. Later. Time to sleep. 

   [1]: http://files.schinckel.net/iTunesRater0.3.zip

