--- 
wordpress_id: 1137
layout: post
title: Installing Missing Sync on a Hackintosh
time: "13:49:16"
date: 2007-04-27 13:49:16
tags: 
- palmos
- osx86
wordpress_url: http://schinckel.net/2007/04/27/installing-missing-sync-on-a-hackintosh/
---
I am a registered user of Missing Sync for PalmOS, but it wouldn't install on my Dell running OS X. Easy to fix: copy the installer package somewhere writable, and then open the package, find the file `Contents/Resources/InstallationCheck`. Edit this file in a text editor (luckily, they made it a bash script!), and before the final line (`exit $RETVAL`), insert: `exit 0` Crude hack, but it gets it installed. Now to reboot and see if it will actually run! 
