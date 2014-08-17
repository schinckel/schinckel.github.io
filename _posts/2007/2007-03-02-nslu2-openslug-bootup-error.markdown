--- 
wordpress_id: 1109
layout: post
title: NSLU2 OpenSlug Bootup Error
time: "21:30:08"
date: 2007-03-02 21:30:08
tags: 
- nslu2
wordpress_url: http://schinckel.net/2007/03/02/nslu2-openslug-bootup-error/
---
The other morning, my power went off. I almost slept through my wake-up time, but just made it to work on time. However, the power failure must have caused some sort of a problem with my NSLU2 server. For some reason, I was no longer able to connect to it in any way shape or form. Samba connections failed, and even SSH-ing in didn't work, with any of the users I had set up. I finally figured out that it had something to do with not being able to boot off the disk properly. It was booting up, then beeping loudly three times (two different tones). Then, it was responding to pings, and accepting ssh connections, but not authenticating. So I connected using the root account and the default password, and it worked. And, true to form, the disks were recognised, but for some reason not mounted. I tried the `turnup disk /dev/sda1` command, which doesn't do anything destructive, but tells the machine to boot up from that device. It failed, with the following error: 

> turnup: /dev/sda1: partition does not seem to be a valid root partition The partition must contain a full operating system. To ensure that this is the case it is checked for the following, all of which must exist for the bootstrap to work: 1) A directory /mnt. 2) A command line interpreter program in /bin/sh. 3) The program chroot in /sbin or /usr/sbin. 4) The program init in /sbin, /etc or /bin. One or more of these items is missing. Mount /dev/sda1 on /mnt and examine its contents. You can use turnup disk|nfs -i -f to copy this operating system onto the disk, but it may overwrite files on the disk. 

Okay, that might help. A quick `mount /dev/sda1 /mnt/sda1` showed that the partition was valid. But no /mnt directory inside there. Create one, then run the `turnup disk /dev/sda1` command again. Then `shutdown -r now`. Upon reboot, only a single beep (which, IIRC, I put there!), and everything is normal. _Phew!_