--- 
wordpress_id: 257
layout: post
title: Memory Leak
time: "23:40:44"
date: 2005-07-01 23:40:44
tags: 
- itunes-rater
- applescript-studio
wordpress_url: http://schinckel.net/2005/07/01/memory-leak/
---
iTunesRater seems to be leaking memory, and I think I know where. I discovered this by just watching the amount of memory it used, and each time a new track plays, the memory usage goes up. I think it's to do with the artwork display: I thought I deleted the image being displayed, but maybe I don't. Before I update the image with a new one, I use the code: 

        delete image of image view "Artwork"

(both times: when I replace the artwork in the main window, and the previous track drawer). However, unless I'm missing something else, this is where the leak is! 
