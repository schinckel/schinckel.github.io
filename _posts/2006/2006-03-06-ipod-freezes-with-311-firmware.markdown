--- 
wordpress_id: 730
layout: post
title: iPod Freezes with 3.1.1 Firmware
time: "14:17:26"
date: 2006-03-06 14:17:26
tags: 
- rants-and-raves
- radio-and-podcasting
wordpress_url: http://schinckel.net/2006/03/06/ipod-freezes-with-311-firmware/
---
I've had some serious issues with my iPod after updating to the latest iPod firmware (3.1.1). Basically, it keeps freezing, either when going into sleep mode, or coming out of sleep mode. It's not possible to determine which of these it is, as there is nothing appearing on the screen when pressing any buttons, or plugging in the headphones. The only way to get the iPod back to normal is to do the two-finger reset: hold down _MENU _and _SELECT _for about 5 or so seconds. This then resets the iPod, and it boots up as normal. However, any information (like which songs and podcasts I listened to) is lost. Meaning I then need to remember which podcasts have been listened to, and remove them manually from the list. According to some web sources, this occurs only when having just listened to a podcast, but I don't seem to be able to replicate that right now. I know it crashed last night after listening to an Audiobook, but I can't recall if it ever happened after just plain music. However, I do know that this problem only reared it's ugly head after updating to the 3.1.1 firmware. I wonder if it's possible to downgrade iPod firmware? Apparently it's just a matter of editing a value in `iPod_Control/Device/Sysinfo`, namely buildID, to a value less than the firmware you want to downgrade it to is. Of course, you'll need the updater for that firmware version, too. If I keep having issues, I may have to try this. **Update:** This technique doesn't work: or at least I couldn't get it to work. I've just used Restore with an older updater, so I'll see if that was the problem. I'm now using 3.1, but I've got to wait until all of my music re-syncs back to the iPod, as Restore 'cleans' the iPod. 
