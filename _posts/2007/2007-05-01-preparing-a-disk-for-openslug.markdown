--- 
wordpress_id: 1139
layout: post
title: Preparing a Disk for OpenSlug
time: "23:48:01"
date: 2007-05-01 23:48:01
tags: 
- nslu2
wordpress_url: http://schinckel.net/2007/05/01/preparing-a-disk-for-openslug/
---
I got a new 250GB USB drive today, and plugged in a hub into my NSLU2, and connected this up. These are the commands I needed to execute to get it all set up (it was an NTFS formatted disk initially). 

First of all, use `dmesg` to ensure the disk has been recognised and mounted. I had to change from my USB2.0 hub to a USB1.0 hub. I'll get a new 2.0 hub in the next few days to try that out. Apparently some of them don't work. 

From dmesg, the hub has been recognised: 

    usb 2-1.1: new full speed USB device using ohci_hcd and address 3 usb 2-1.1: not running at top speed; connect to a high speed hub

The new disk has been mounted as an NTFS (dirty) disk: 

    NTFS volume version 3.1. NTFS-fs error (device sdc1): load_system_files(): $LogFile is not clean. Mounting read-only. Mount in Windows.

Things to note: 
* the device name in this case is `/dev/sdc1`. This is the third USB device in my chain. 
* `/dev/sda(1,2,3)` are the root, swap and user partitions on the boot disk, 
* `/dev/sdb1` is the first 250GB drive I bought. 

    nslu2:~ root$ umount /media/sdc1/
    nslu2:~ root$ fdisk /dev/sdc1/

Then you will need to delete the partition (`d`), and create a new one (`n`). (`p`): Primary partition, #`1`, accept default start and end blocks. 

Then use (`w`) to write the partition out to disk. 

    nslu2:~ root$ reboot
    
Wait for the machine to reboot fully. 

    nslu2:~ root$ umount /media/sdc1/ 
    nslu2:~ root$ mkfs.ext3 /dev/sdc1 mke2fs 1.38 (30-Jun-2005) ...

It takes a while to process. Worthwhile rebooting after this just to be sure. 

All done. 
