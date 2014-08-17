--- 
wordpress_id: 1197
layout: post
title: Why AFP is better than SMB.
time: "12:04:17"
date: 2007-07-15 12:04:17
tags: 
- ubuntu
wordpress_url: http://schinckel.net/2007/07/15/why-afp-is-better-than-smb/
---
With netatalk, I can serve AppleShare Filing Protocol shares from my Ubuntu box. Since this is where all of my media files are stored, this is kind of nice. So, why use AFP over SMB (or NFS, for that matter)? Well, I still haven't been able to get NFS shares to work properly from my MacBook Pro. It just sits there _Connecting to nfs://poul ..._ forever. So NFS is out. (I have configured the shares under Ubuntu, or at least, I think I have. I did use the GUI tool, which as you'll read below, didn't fully set up the shares for SMB either...) As I mentioned in a previous post, if you use the GUI tool to set up Samba (SMB) shares, you also need to use the `smbpasswd -a [username]` command. Finder doesn't handle Samba shares very well. It takes an age to connect to them, and if they disconnect (ie, the network disconnects, such as when you move from one location to another, and change WiFi network; or the server restarts) you get a long Finder hang while it looks for the connection. OS X also used to disconnect Samba shares when you went to sleep, or if you slept for a long time. (This may have been the server, I don't know) I can reconnect to an AFS share almost immediately. This means I can wake my MacBook Pro from sleep, wait a few seconds while it reconnects to the Airport network, and then press play on iTunes. All of my music lives on an AFP share, but it started playing immediately. It is little things like this that make computing nice again. 
