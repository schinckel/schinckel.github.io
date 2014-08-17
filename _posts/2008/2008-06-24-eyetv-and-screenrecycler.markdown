--- 
wordpress_id: 1472
layout: post
title: EyeTV and ScreenRecycler
time: "12:17:12"
date: 2008-06-24 12:17:12
tags: 
- macos-x
- eyetv
wordpress_url: http://schinckel.net/2008/06/24/eyetv-and-screenrecycler/
---
Or how to make a single-display Mac Mini Media Center even better.

I have a Mac Mini that records all of my favourite programs (almost) automatically. It runs EyeTV (by default), and can play movies stored on either a local FireWire hard drive, or a LAN server (running OpenSolaris, and using ZFS, incidentally).

One annoying thing is that to set up a new smart playlist, or edit a movie, or do anything on the machine, whilst I can remote in and do stuff, this all displays on the TV.

However, using ScreenRecycler, it seems like I can trick the Mac Mini into thinking he (his name is jens!) has two monitors. Thus, with some swizzling, I can have the EyeTV full-screen display on the "real" monitor, and the desktop on the other one.

Doing this means that I can happily edit a movie (say, to remove advertisements), whilst the TV still displays the live TV (or being viewed video).

Run ScreenRecycler on the Media machine. You may need to restart if this is the first time you have run it, as it installs some driver. I'm hoping it's pretty safe...

After running ScreenRecycler when the system has the driver installed, I needed to run JollysFastVNC to get ScreenRecycler to give me a second display. I was using ARD (and still do), which when I then reconnected showed me the whole desktop, with a menu enabling me to choose which display (or both) to view. I chose to view both displays for now.

![Picture 1.png][1]

I then loaded up the Displays preference pane, and moved the menu bar to the ScreenRecycler display.

  
![MoveMenubar.png][2]

I made the ScreenRecycler display run in a higher resolution (1280x960, so that it fits nicely onto my external monitor on my laptop at full-size). I then went to the EyeTV preferences, and made sure the full-screen display went onto the "real" monitor. This apparently has the side effect that quicktime movies will also play on this monitor, so that's quite good.

![EyeTVFullscreen.png][3]

Finally, I made new Live TV and Recording open in a new window. This enables me to edit a movie while Jaq is watching another. It does, however, mean that it is a little cumbersome to switch between tuners (need to view both monitors, and do some more swizzling), but it's workable. It was always hard to switch tuners anyway, at least with the Apple Remote.

This makes for a fairly cool setup. I'm fiddling a little more before I buy ScreenRecycler (like, does it work better upon startup?), but it looks pretty promising.

   [1]: /images/2008/06/picture-1.jpg
   [2]: /images/2008/06/movemenubar.jpg
   [3]: /images/2008/06/eyetvfullscreen.jpg

