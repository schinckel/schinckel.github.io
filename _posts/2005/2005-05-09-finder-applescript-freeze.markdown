--- 
wordpress_id: 157
layout: post
title: Finder AppleScript Freeze
time: "20:25:30"
date: 2005-05-09 20:25:30
tags: 
- applescript
wordpress_url: http://schinckel.net/2005/05/09/finder-applescript-freeze/
---
While trying to bugfix a couple of issues in iTunesRater tonight, I found that the script stopped working altogether. I narrowed it down to a section of the code where I was asking the Finder to do something, and it was just freezing. I thought that maybe the latest security update had done something, but changing users proved that otherwise. It was something with my setup. I found it probably had to do with having a device mounted (the memory card in my Palm Zire), but having removed the device without unmounting it. The Finder had almost crashed, and wouldn't respond to any AppleScript commands. Incidentally, I suspect that AppleScript is smart enough to not actually send any message (even an empty one) to an application when there is no command (ie, just a tell application/end tell clause with nothing between it). 
