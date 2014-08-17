--- 
wordpress_id: 371
layout: post
title: Weird OS X Stuff
time: "11:54:17"
date: 2005-08-20 11:54:17
tags: 
- general
wordpress_url: http://schinckel.net/2005/08/20/weird-os-x-stuff/
---
I'm still using Panther - I'll upgrade to Tiger when I've finished backing up everything. In the meantime, I noticed something quite weird the other day. If I attempt to view my web pages stored on this computer (ie, the one I'm typing this in from, ny iMac at home) then it only works some of the time. Specifically, if I try to use the _real_ IP address, given to me by my ISP, or the domain name (again given to me by my ISP, `dialup0-1213.optusnet.com.au`, or whatever it is at that moment), then it times out. If I use `192.168.1.2`, or the local hostname, then it works fine. I wonder if there's a setting somewhere which only allows http access from those addresses. I can't figure it out - with no firewall there shouldn't be a reason this doesn't work, unless Optus is blocking incoming traffic to addresses within it's domain. Update: This would seem to be it. I can ssh into my machine, but not http in. 
