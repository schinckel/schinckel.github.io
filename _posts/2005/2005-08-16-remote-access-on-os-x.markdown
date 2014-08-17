--- 
wordpress_id: 358
layout: post
title: Remote Access on OS X
time: "12:38:25"
date: 2005-08-16 12:38:25
tags: 
- general
wordpress_url: http://schinckel.net/2005/08/16/remote-access-on-os-x/
---
VNC is cool. It allows you to view your desktop on another machine, and control it from that machine. Various takes on this include osx2x, which allows an OS X machine to just control the other machine (no screen data is sent back to the controlling box, but requires two monitors to be able to see what is going on). The other method of controlling an OS X box is to telnet or ssh in, and type in commands via a CLI. This is often much faster than VNC because of the lower bandwidth requirements for just text rather than full-screen images. One thing I had noticed (and hated) about OS X Panther was that if I was not the 'active' user on the machine, I could still connect, but was unable to run WindowServer applications, or interact with them. This [seems to be fixed ][1]with Tiger. Newer versions of [OSXvnc][2] (1.5+) can be run as a User Process, and then a connection initiated from another source, which will allow interaction with the GUI environment. This makes VNC under OS X very much like X11, in that a user can completely control a machine, even if another user has logged in in the meantime. The only drawback I can see is that it requires the user to log in initially. Finally, a reason for me to upgrade to Tiger. 

   [1]: http://www.macosx.com/forums/showthread.php?t=52547
   [2]: http://www.macupdate.com/info.php/id/11283

