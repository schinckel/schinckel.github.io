--- 
wordpress_id: 1416
layout: post
title: OpenVPN and default gateway
time: "20:20:23"
date: 2008-04-30 20:20:23
tags: 
- general
wordpress_url: http://schinckel.net/2008/04/30/openvpn-and-default-gateway/
---
I rarely have to use a VPN, usually ssh does the trick for what I need. However, for one subject I need to access a server from within a variety of applications, and that server is not exposed outside of the campus network, even though it has a global DNS entry.

I can use [Tunnelblick][1] to VPN into the system, and then access the server as if I were on campus. The downside of this is that with the default settings, it routes all traffic through the VPN, which then would either slow everything down, or in this case, prevents anything from getting to the outside internets.

This is not really acceptable: if I am working on a problem and I need to access something I don't have locally, like some documentation, then I have to disconnect the VPN, look up the data and then reconnect the VPN.

There is a line near the bottom of the .ovpn file that sets up the default gateway:

`# Make the VPN the default route.  
redirect-gateway def1`

It's somewhat tricky to understand how to fix this - I had to restart a couple of times because I had screwed up the routing table.

You need to replace that line with one like the following:

`route <address-inside-network> <netmask> <gateway>`

In my case, to access barker.infoeng.flinders.edu.au, I needed to have:

`route 129.96.22.79 255.255.255.255 129.96.59.73`

Restarting the VPN connection then means I can access barker.infoeng.flinders.edu.au, and the wider internets.  
  
I've also written a script that gets a new authentication keyfile, since the one that is provided doesn't work very well. I've even made it so that it will automatically grab a new keyfile when the old one is out of date. 

   [1]: http://www.tunnelblick.net/

