--- 
wordpress_id: 776
layout: post
title: Ratings on the Fly
time: "21:07:30"
date: 2005-02-06 21:07:30
tags: 
- itunes-rater
- applescript-studio
wordpress_url: http://schinckel.net/2006/03/14/ratings-on-the-fly/
---
So far, the program I've written does this: Monitor the current track, and how much of it has been played. Wait for a click on the Next (>>|) button, and when it occurs, rate the song up or down according to the modifier: `abs((amount played / song length) * 15) - 5` Thus, when a song is skipped immediately, it loses 5 rating points, songs that are clicked at the end receive a +10 modifier. The only problem is that this is only triggered when this program wants the next track. I need a robust method of...I've just thought of something. I'm getting close to getting this to work - when the song is changed, the track id is used to find the song in the library, and the last known rating modifier will be applied to the song's rating. It just doesn't do that yet! 
