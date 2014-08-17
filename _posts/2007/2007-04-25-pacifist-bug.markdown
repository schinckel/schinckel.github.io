--- 
wordpress_id: 1134
layout: post
title: Pacifist Bug?
time: "11:00:30"
date: 2007-04-25 11:00:30
tags: 
- osx86
wordpress_url: http://schinckel.net/2007/04/25/pacifist-bug/
---
I've used Pacifist to extract data from MacOS X Installer Packages before, but I just noticed something that might be a bug. It was on my Dell/Hackintosh, and I haven't had time to try the same thing on the iMac G4, but I will. I was about to update the OS X x86 system to 10.4.9, and after reading [Method to Update hackintosh 10.4.8 to 10.4.9 (Intel SSE2/3)][1], I had backed up the files referenced, and was backing up the whole partition to a disk image. I thought I'd extract a couple of the files listed, and see if I could figure out the differences between them. So I extracted a file using Pacifist to the Desktop, ready to examine it. Okay, the file isn't there. Go into Terminal, and list the Desktop. Poof. Finder is gone. When it reloads, the file is there. What I suspect is happening (and I haven't tried it again, just yet), is that the file is copied, and the Finder isn't notified. When something else tries to access the file, the Finder panics, or something. I will try to reproduce this on the same system, and my PPC setup. Until then, here I go to updateâ€¦ 

   [1]: http://forum.insanelymac.com/index.php?showtopic=45283&hl=

