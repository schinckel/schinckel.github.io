--- 
wordpress_id: 1555
layout: post
title: Close to Danger...
time: "17:50:18"
date: 2008-09-15 17:50:18
tags: 
- macbook-pro
wordpress_url: http://schinckel.net/2008/09/15/close-to-danger/
---
Something almost bad happened to my MacBook Pro today.

I'd been using the machine all day, on and off, on both battery and power. I showed some code to a lecturer, and then closed my laptop and moved to another lecture theatre. It was there that, after about half an hour, when I was bored, I decided to open my laptop and check my email.

Screen was black. I've had some issues with the graphics card not always working properly (it's related to a garbage display when scrolling issue), so I thought that might have reappeared. I don't remember why, but I pressed the power button. I wasn't expecting anything (if the display was disabled, then at most I should get a beep).

The screen came on (or, as I later figured out, the whole machine came on), but the display was overlaid with a pink pixelated pattern. Initially I thought something was odd, and I force-restarted it, since it didn't appear to be responding.

The next time it booted up, it had the same pattern. Leaving it a little longer, I noticed that it displayed the grey screen with the darker apple logo, and the spinner underneath. After about a minute, it had a kernel panic.

Restarting it always had the same result. Zapping the PRAM, resetting the SMC, booting off a system DVD all had the same result.

I even tried swapping out the RAM, but nothing looked to fix it.

Finally, I tried booting up in safe mode. ⌘S will do this, and when this kicked in, the screen turned black, as expected. The areas that were pink now turned green. I got to a command prompt, but when I typed "exit" to continue booting, it seemed to hang on the WindowServer loading. (I must confess I restarted quite early, since I wasn't having any keyboard response, even though it may not respond at this point).

Same deal for Verbose mode (⌘V). Stuck at WindowServer.

Rebooting again in Safe mode, I did an fsck -fy. About halfway through this I noticed that the text that was appearing was overwriting the green graphics glitches. When it completed (and it did find one error), I restarted, and the machine appears to be back to normal.

I wouldn't have lost much data (I do have backups), but I would have lost work time. Or blogging time, or whatever!

Postscript: Interestingly, checking the panic.log shows me that it was WindowServer that was causing the panic. I don't know why, but I hope it ceases to occur!
