--- 
wordpress_id: 434
layout: post
title: NSLU2 Bootup
time: "18:22:10"
date: 2005-09-26 18:22:10
tags: 
- nslu2
wordpress_url: http://schinckel.net/2005/09/26/nslu2-bootup/
---
I noticed that for some reason some of the bits and pieces I had installed on my NSLU2 were not being restarted at boot time: notably `dnsmasq`, which is a Domain Name Server and DHCP server. I started using this just for fun, but found that after an NSLU2 reboot I wasn't able to reconnect to the NSLU2. It turned out that for some reason the imac was being given a bizarre IP address, which wasn't even on the same subnet as the NSLU2. In fact, IIRC, it wasn't even a legal private domain IP address! Now, I have several things installed on the NSLU2: `cron`, `inetd`, `portmap`, `appweb` and `dnsmasq`. I had also installed `mt-daapd` at some stage. It turned out that `mt-daapd` was failing to load, and this was causing the script to bail out, without running the remainder of the items. I think. Moral of the story: ensure that you are only loading stuff you need, and that everything is running smoothly. 
