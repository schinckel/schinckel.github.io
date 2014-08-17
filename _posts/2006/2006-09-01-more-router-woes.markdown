--- 
wordpress_id: 936
layout: post
title: More Router Woes
time: "20:36:57"
date: 2006-09-01 20:36:57
tags: 
- speedtouch
- netgear
wordpress_url: http://schinckel.net/2006/09/01/more-router-woes/
---
I've finally installed my wireless router. I thought I'd do it now, even though at this stage I have no wireless devices. I did have some pretty serious troubles getting it all working. It uses a pretty straightforward wizard, but because my modem was set up to auto-dial, I wasn't able to set it up initially. Finally, after resetting the router, and then the modem, and setting up the modem as a bridge, I was able to get the wizard to work. Tip: if your NetGear router has mistakenly identified the connection type as Static IP, or Dynamic IP, when it should be PPPoE, then you need to reset the router to factory settings to get it to work. You should also do this if you change connection type (ie, Cable to DSL, or vice-versa). This would have saved me heaps of time. Tip 2: don't use a 7.5V supply if it should be a 12V supply. The router appeared to work fine, lights all came on and everything, but DHCP server didn't run. Now to the problem I'm still having. The router has a DHCP server, but not a DNS server. So it gives out IP addresses, and reports the name of the device that has each IP address, but there isn't a way to just visit a device by using that name. The modem-router setup I had previously did have a DNS server, which meant I could have each machine get an IP, and then use the name of the machine to connect to it. In the interim I've set up each computer with entries in the relevant hosts file (or equivalent), and I've given permanent leases to my machines. That will have to do. 
