--- 
wordpress_id: 262
layout: post
title: Chapter Tool GUI Part II
time: "13:04:46"
date: 2005-07-05 13:04:46
tags: 
- languages
wordpress_url: http://schinckel.net/2005/07/05/chapter-tool-gui-part-ii/
---
I had planned to create a GUI wrapper, perhaps in AppleScript Studio, for Apple's Chapter Tool command line program. My application was going to have an interface very similar to QuickTime Player, but with an extra section where you entered data about the chapter(s). You would be able to scrub through the track, and find the place to insert the Chapter Marker: then you would have a list of Chapter Markers, and the ability to edit the location, and the attributes. I did a bit of stuff with Python's XML handling features, enough to basically figure out how to write out the required XML basic structure, and I think I know how to do the attributes. What I cannot do is figure out how to get a QT viewer in the AppleScript Studio progam (or Interface Builder, actually). There seems to be some templates for PyObj-C applications, I may use one of those. Or, I might just make an application that controls/gets data from QuickTime Player (iTunes isn't so good for this, as it requires files to be imported before playing them). Then, all it needs to do is look after the XML generation, and bingo, easy Chapters. Actually, I remember why I stopped: Chapter Tool would not work on my Mac. 
