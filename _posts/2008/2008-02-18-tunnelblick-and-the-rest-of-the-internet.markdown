--- 
wordpress_id: 1365
layout: post
title: Tunnelblick and the rest of the internet.
time: "22:04:14"
date: 2008-02-18 22:04:14
tags: 
- internet
wordpress_url: http://schinckel.net/2008/02/18/tunnelblick-and-the-rest-of-the-internet/
---
I have access via an _OpenVPN_ tunnel to my University, and can access files located on the server there using _Tunnelblick_. This provides access through an insecure wireless network, as well as over the internet.

However, if I connect using Tunnelblick from home, I can either view my files, or view stuff on the rest of the internet.

It took me a while, but I figured out how to change the openVPN settings so that only a subset of IP addresses go through the VPN.

Assuming you are on a Mac, your settings file will be similar to `~/Library/openvpn/connection_name.conf`, but with connection_name being something else. You need to edit this file, which is probably write protected. I'm not going to tell you how to fix that problem - if you can't do that you have no business hacking with routing tables!

Find the entry near the bottom that looks like:

`redirect-gateway def1`  


Comment this out (put a # at the start).

Now add in a line that looks somewhat like this:

`route <network-address> <netmask> <gateway-address>`  


For example:

`route 1.2.3.4 255.255.0.0 5.6.7.8`  


For Flinders Uni Infoeng, it should be:

`route 129.96.6.0 255.255.255.0 129.96.59.73`  


You may need to authorise your Mac after saving the file. But when you connect with Tunnelblick, you should now be able to access addresses within the desired range, and the rest of the googlenet at the same time. Happy surfing!
