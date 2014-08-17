--- 
wordpress_id: 88
layout: post
title: PuTTY shortcut
time: "00:06:49"
date: 2005-01-19 00:06:49
tags: 
- general
wordpress_url: http://schinckel.net/2005/01/19/putty-shortcut/
---
I sometimes have to use the PC next to my imac, and when I want to start a shell session, I use [PuTTY][1]. Now, usually I have to go through the process of either filling in the address of my mac, or click on the profile and load it, before clicking open. However, it's possible to just edit the Windows Shortcut, and add the name of the server (or IP address) after the Target: information. Make sure the server name or address is not inside the quotes, and there is a space between them. Now, double-clicking the shortcut will connect to the server. It's also possible to connect to a different port number. Update: If I'd read the FAQ, I'd know you can also use a `-load mysessionname` switch to load all of the settings from a saved session. Now if I could just get MacOSX `telnetd` to accept environment variables from the telnet client! 

   [1]: http://www.chiark.greenend.org.uk/%7Esgtatham/putty/

