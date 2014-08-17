--- 
wordpress_id: 665
layout: post
title: ABC Podcast Feeds vs. Files
time: "22:19:51"
date: 2006-02-06 22:19:51
tags: 
- radio-and-podcasting
wordpress_url: http://schinckel.net/2006/02/06/abc-podcast-feeds-vs-files/
---
As a latecomer to Podcasting, I've missed a whole lot of stuff from the ABC's excellent range of Radio National podcasts. And I've managed to download most of the 'casts from the feeds that I have subscribed to, but I thought I might see what other stuff is still on the server. Luckily, the ABC use an easy to decode system for naming most of their podcasts. For instance, "All in the Mind", a show about Psychology and the Mind, is stored in files like: `http://www.abc.net.au/rn/podcast/feeds/mind_20051231.mp3` The first bit stays the same, and the number is just `yyyymmdd`. Thus, even though the feed only lists the last 4 programs, the server seems to have the last 9. Beyond that, I just get file not found errors. Now the only trick is to see if using wget will mean that I can import them into iTunes, and have them show up as Podcasts, including all of the data. Hopefully that is all coded into the ID3 tags, but I'll post the results. 
