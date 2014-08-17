--- 
wordpress_id: 1133
layout: post
title: Broken MBR and Partition Map
time: "20:42:53"
date: 2007-04-24 20:42:53
tags: 
- osx86
wordpress_url: http://schinckel.net/2007/04/24/broken-mbr-and-partition-map/
---
Ooh, scary stuff this afternoon. I was preparing to back up my OS x86 installation, and make a bootable version on another partition, but at some stage I must have repartitioned the whole hard drive. Which included the 75GB NTFS partition with Windows XP, and a heap of data on it. I originally had thought it was the NTFS-3G (read/write FileSystem driver for Mac), but, alas, it wasn't. So, I spent the next few hours downloading repairers, trying in vain to undelete, before I happened across one CD ISO that did the trick - restored the partition information from a backup. I then had to repair the windows installation (fix the MBR and something else, FIXMBR and FIXBOOT), and everything is back to normal. Man, I'm feeling a whole lot happier than I did a couple of hours ago... 
