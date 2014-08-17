--- 
wordpress_id: 430
layout: post
title: OSX Application Startup Issues
time: "13:26:21"
date: 2005-09-17 13:26:21
tags: 
- general
wordpress_url: http://schinckel.net/2005/09/17/osx-application-startup-issues/
---
I upgraded to iTunes 5, and also ran the latest Panther Security/System upgrade, and now my Finder, iTunes, and a couple of other random applications take ages (like about 5 minutes) to load. One of the programs that took a long time to load (and appeared to hang) was Quicktime Player: I traced this issue down to a dodgy `QuickTimeStreaming.component` bundle: I've moved it out of the `/System/Library/Quicktime` folder, and now Quicktime starts up super fast. I have tried the following techniques: 

  * Repairing permissions. Apparently iTunes did have a file with dodgy permissions, but this wasn't what was causing the slow loading.
  * Updated executable library prebindings. This did make every other app load much faster.
  * Cleaned the system and application caches. Again, other apps load faster.
  * Remove a heap of potential Finder problem cache files. I suspect that most of these were deleted by the above step, but I tried it again anyway. No joy.

I'm about to upgrade to Tiger anyway, so I'll just backup everything and do that, I think. 
