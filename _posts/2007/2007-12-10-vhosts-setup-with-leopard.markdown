--- 
wordpress_id: 1327
layout: post
title: Vhosts setup with Leopard
time: "12:54:35"
date: 2007-12-10 12:54:35
tags: 
- general
wordpress_url: http://schinckel.net/2007/12/10/vhosts-setup-with-leopard/
---
I've been setting up my various VirtualHosts under Leopard, which uses Apache2.

I'd blogged before about ensuring that you set up the hosts line before you restart the apache daemon, but this time around I came across something even odder.

If you use the regular line in /etc/hosts, ie:
    
    
    127.0.0.1    hostname
    

Then it fails under the VirtualHost setup. Instead, you need to use:
    
    
    ::1    hostname
    

Which is the IPv6 address. Which works under Virtual Hosts.
