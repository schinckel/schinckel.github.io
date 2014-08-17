--- 
wordpress_id: 1190
layout: post
title: Airport Extreme DHCP and LAN DNS
time: "01:33:56"
date: 2007-07-08 01:33:56
tags: 
- rants-and-raves
- airport-extreme
wordpress_url: http://schinckel.net/2007/07/08/airport-extreme-dhcp-and-lan-dns/
---
I use a local DHCP server to also act as my caching DNS, with the nice side effect that it also serves DNS requests for machines inside my LAN that have gotten their IP addresses via DHCP. Until this afternoon, this was my clunky old SpeedTouch modem. Today, I put that modem into bridge mode, and set up my brand spanking new Airport Extreme to do the PPPoE connection, and handle all of the routing, DHCP and DNS duties. It's newer, right, so it should do a better job? Wrong. It does everything I want, except serve local DNS results. So, if I try to connect to one of my many machines, then it fails. And since I've gone from DHCP with reserved leases to a free-for-all DHCP, I have no idea which machine is which IP address! This is very frustrating, and is exactly the reason I retired the Netgear from this task, as it had exactly the same behaviour. It hands out IP addresses, but doesn't store the machine names. Now, let me remind you this was working perfectly with the Airport Extreme just running in bridge mode. Everything else is set up right (apart from the fact it isn't really using the DNS settings I set for it!), but it won't do this. I'm sorely tempted to go back to how I had it all set up before. The only functionality I will lose is that VM machines connected over a bridged airport connection will not get an IP address from the SpeedTouch DHCP server. They do from either the Netgear, or the Airport Extreme, if I configure that way. I'm really annoyed about this. It's a vital part of my daily use - I have fileservers, including one that stores all Music, and a fax/scanner server, which I don't want to have to hard code IP addresses into. I'm thinking I may be able to go all Bonjour/Zeroconf/mDNSresponder. I'll see how that goes. 
