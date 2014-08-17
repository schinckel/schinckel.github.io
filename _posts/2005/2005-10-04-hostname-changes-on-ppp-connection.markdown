--- 
wordpress_id: 457
layout: post
title: hostname changes on PPP connection
time: "15:52:12"
date: 2005-10-04 15:52:12
tags: 
- tiger
wordpress_url: http://schinckel.net/2005/10/04/hostname-changes-on-ppp-connection/
---
I think this another thing new to Tiger: when I initiate a PPP connection, my hostname changes, to things like: `fliax7-a170.dialup.optusnet.com.au` Now, this doesn't have too many issues, except when I try to initiate a connection with what the hostname used to be, such as a local VNC connection to the other user's desktop. The solution is to do the following: edit `/etc/hostconfig`, and replace: `HOSTNAME=-AUTOMATIC-` with `HOSTNAME=the_hostname`
