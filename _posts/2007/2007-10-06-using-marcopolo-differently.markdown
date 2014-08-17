--- 
wordpress_id: 1267
layout: post
title: Using MarcoPolo differently
time: "11:06:53"
date: 2007-10-06 11:06:53
tags: 
- general
wordpress_url: http://schinckel.net/2007/10/06/using-marcopolo-differently/
---
I've started to use MarcoPolo slightly differently. Instead of having it monitor which Airport networks are nearby, which causes OS X to no longer automatically join networks other than the first one, I've turned off AirPort monitoring. Instead, I choose location based upon the IP address range that gets given to me.

This works because the three networks I connect to all use different numbering ranges. Which is lucky.

It's not quite a nice a solution (It has to wait until I connect to the network before changing locations) but in some ways works better. For instance, it no longer tries to change SMTP server before the network is ready. And the change in proxy servers only happens when the network is actually connected.

I was having some issues with it not picking up the changed IP address, and I may have to tweak it a little, but I'll see how it goes. It's certainly better than having to manually connect to airport networks.
