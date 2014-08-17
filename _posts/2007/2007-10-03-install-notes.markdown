--- 
wordpress_id: 1273
layout: post
title: Install Notes
time: "19:25:00"
date: 2007-10-03 19:25:00
tags: 
- osx86
wordpress_url: http://schinckel.net/2007/10/03/install-notes/
---
I'm reinstalling OSx86, and these are notes so I don't have to learn it all again if I ever have to do it again.

  1. Install from DVD. Installation will fail. Perhaps try to notice which bits haven't been installed yet. Restart.
  2. (Possibly not required). Boot from DVD again, but don't install. Get to a Terminal/shell prompt. Type in:  
`bless -folder '/Volumes/volume-name-here/System/Library/CoreServices' -setOF`
  3. Using Pacifist, extract the following files from the DVD, and copy them to iPod (on another Mac, and do it in this order, this is important.):
  4.     1. 10.4.8.intel.pkg  

    2. 10.4.4.loginwindow.pkg  


  5. Boot from the DVD, and get to a shell. Quickest method is to go to safe mode. You might have to do some work to mount all of the required volumes, but it is much faster than waiting for the installer to load, and then getting a Terminal.
  6. Copy the files over from the iPod to the boot disk.
  7. Reboot.
  8. Installers required for AppleIntel8255x.kext and NVidia GeForce FX 5200.
