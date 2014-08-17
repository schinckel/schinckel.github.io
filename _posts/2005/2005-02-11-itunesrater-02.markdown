--- 
wordpress_id: 61
layout: post
title: iTunesRater 0.2
time: "22:00:27"
date: 2005-02-11 22:00:27
tags: 
- itunes-rater
wordpress_url: http://schinckel.net/2005/02/11/itunesrater-02/
---
I've done a bit of work to iTunesRater, and upped the revision number to 0.2 It's a bit more robust, but there still seems to be an intermittent bug to do with loading the artwork from the temporary file. I'm not sure if I've solved it or not, since it only appeared once, but I've put a try...end try across where I think it was, so it should just silently fail. I've also added a check-box to the bottom right corner which reflects and controls the 'enabled' flag within iTunes. So, if you find a song you really don't like, then just un-check this box, and it won't play again, depending on your iTunes settings. Oh, yeah, you can find it [iTunes Rater 0.2][1]. 

   [1]: http://files.schinckel.net/iTunesRater.zip

