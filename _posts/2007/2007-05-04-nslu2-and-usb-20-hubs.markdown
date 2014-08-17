--- 
wordpress_id: 1142
layout: post
title: NSLU2 and USB 2.0 Hubs
time: "23:27:00"
date: 2007-05-04 23:27:00
tags: 
- nslu2
wordpress_url: http://schinckel.net/2007/05/04/nslu2-and-usb-20-hubs/
---
Having more than two USB drives with an NSLU2 is possible, if you are using a firmware other than the original Linksys rubbish. Some people report having gotten some hubs to work fine. I originally had both drives working using a spare 1.0 hub I had lying around, but it was dog slow. So I bought a 2.0 hub. This worked for the first couple of gigs it copied across from another disk, but then reported errors. It appeared the device just decided to unmount and remount in a different place. I went and bought another hub today, from a different shop. Same problems. I think they are actually the same hub in different packaging, but another 2.0 hub I have lying about fails worse - the drives don't even mount to begin with. So I went for plan D. It seems that the USB controller chip used can drive up to 5 USB ports, so I cut a USB extension cable, and wired it onto the board in the correct locations. Didn't work. Disconnecting made it work again. Finally, I was able to get it to work by not using the power connections on the other port, but the +5V and GND locations elsewhere on the board. This was the only way I was able to get the NSLU2 to still boot with the extra port connected. I may have been able to use unpowered ports. That might be cooler. I just thought that the PSU might not be +5V, in which case stuff could go badly wrong. Better check... 
