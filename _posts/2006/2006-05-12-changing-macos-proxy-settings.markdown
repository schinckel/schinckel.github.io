--- 
wordpress_id: 878
layout: post
title: Changing MacOS Proxy Settings
time: "11:11:44"
date: 2006-05-12 11:11:44
tags: 
- tiger
wordpress_url: http://schinckel.net/2006/05/12/changing-macos-proxy-settings/
---
We've recently gotten a heap of new iMacs (the intel ones), and I've been helping the IT guys set them up - including things like cloning the partitions from one machine to the rest. We did come across an issue where the cloning seemed to fail - the way we solved this was to format the drive first. I think it was a permissions issue: because the files were write-protected, Carbon Copy Cloner failed to overwrite the settings. Which meant that they booted up looking the same, although all of the new applications were installed. The other problem we had is that the Proxy Server settings needed to be changed. The new machines were fine - the settings were made before the cloning occurred, but the old machines still had an invalid setting. I tried using AppleScript, but since the only way to do this is with UI scripting, which is notoriously hard to do right, and tends to break when applications are updated, or even just recompiled. Finally, it twigged that I could just copy the preferences file from one machine to the rest. Because the file is protected, you will need Administrator rights, and you may need to move the original file out of the way first, via the Terminal. You could also do this using ssh, which would mean that the other machines wouldn't even need to be logged in. And the file in question is: `/Library/Preferences/SystemConfiguration/network.plist` or something similar. I'm not at a Mac to be able to check right now. 
