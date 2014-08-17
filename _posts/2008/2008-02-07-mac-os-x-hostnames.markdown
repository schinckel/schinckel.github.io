--- 
wordpress_id: 1353
layout: post
title: Mac OS X hostnames
time: "12:32:45"
date: 2008-02-07 12:32:45
tags: 
- general
wordpress_url: http://schinckel.net/2008/02/07/mac-os-x-hostnames/
---
I run a DHCP/DNS server on my home network, which allocates addresses for all of my machines, and provides them with DNS when connected. Because my development machine, a MacBook Pro also sometimes has to run a web server, and provide varying responses according to the hostname by which she is currently being addressed, I set up a range of VirtualHost directives in apache, and entries in m own /etc/hosts file. This was fine as long as I was the only person accessing these sites, but I also needed to access them from a couple of other machines (including a VM running WinXP).

So, I palmed off the /etc/hosts entry to the DHCP server, a reflashed NSLU2. This machine is just the DHCP/DNS server, which is available only via ssh. But, if I connect to my home network, then the DHCP/DNS server decides to use this hostname as my hostname. I'm still tweaking to see if there is a way around it (have the correct hostname specified earlier in the file springs to mind).

It's fairly annoying to have the wrong hostname showing in my Terminal when I open up a bash session, or look at the console.log. Something I really can't live with.
