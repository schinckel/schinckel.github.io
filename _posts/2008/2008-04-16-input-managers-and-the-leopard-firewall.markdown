--- 
wordpress_id: 1407
layout: post
title: Input Managers and the Leopard Firewall
time: "09:04:10"
date: 2008-04-16 09:04:10
tags: 
- general
wordpress_url: http://schinckel.net/2008/04/16/input-managers-and-the-leopard-firewall/
---
I'd figured out some time ago that an Input Manager or two that I was using was interfering to some extent with the MacOS Leopard Firewall.

When you have the firewall in "Set access for specific services and applications" mode, and you start an application which tries to open a TCP or UDP port, then you get a message like:

![openPorts.png][1]

When you click one of the buttons, an entry is added to the preferences list:

![firewallprefs.png][2]

However, the application's executable code is checked by the system to see that it is the same application as was run when this choice was approved. So, if you have something like an Input Manager, which alters the executable code as it is run, then you have this message appear every time you launch.

This was a real problem for me, using Inquisitor with Safari. Sure, it's a great little tool to get the pre-search results in the browser before you press enter, but I decided it wasn't worth the annoyance of having to click Allow each time I start up the application.

So, if you are having issues with the Firewall dialog appearing each time you start an application, and you haven't installed a new version, consider removing any unneeded Input Mangers. You'll probably need to remove them all to get it to stop, but that might just be worth it.

   [1]: /images/2008/04/openports.jpg
   [2]: /images/2008/04/firewallprefs.jpg

