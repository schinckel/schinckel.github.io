--- 
wordpress_id: 74
layout: post
title: NSLU2 on MacOS X
time: "03:58:28"
date: 2005-02-01 03:58:28
tags: 
- nslu2
wordpress_url: http://schinckel.net/2005/02/01/nslu2-on-macos-x/
---
The instructions for installing an NSLU2 are designed for using a Windows box - but it's easy enough to set it up using any OS. Just use the web server built in, and use an address of 192.168.1.77 and username/password of admin/admin. Following the NSLU2-Linux instructions on unslinging is easy too, except I didn't know what to do after unslinging and rebooting - ie I cannot telnet back into the box! What you need to do is change the password after connecting the disk but before rebooting: `# passwd` \[enter new password twice\] `# cp /etc/passwd /share/hdd/conf/passwd # ln -sf /share/hdd/conf/passwd /etc/passwd` Then you need to reboot (or maybe you don't, I did just to test the password stuck!), re-enable telnet login, and you can begin to install packages. 
