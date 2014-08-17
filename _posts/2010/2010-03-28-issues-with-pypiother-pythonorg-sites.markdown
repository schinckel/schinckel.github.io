--- 
wordpress_id: 1676
layout: post
title: Issues with PyPI/other python.org sites
time: "20:27:27"
date: 2010-03-28 20:27:27
tags: 
- airport-extreme
wordpress_url: http://schinckel.net/2010/03/28/issues-with-pypiother-pythonorg-sites/
---
I was having some issues connecting to (although not pinging) python.org and some of the python-subdomains: notably the CheeseShop (http://pypi.python.org).

I disabled IPv6, and they all cleared up.

I don't know if this was an issue with Internode's IPv6 stuff, but it was being handled by my Airport Extreme. My iPhone was working fine, because it doesn't use IPv6.

What a relief.  


I had tried everything I could think of: from changing my DNS server, DHCP server, I even tried a reinstall of my OS (although this wasn't why I did that - I wanted a cleanup of my dev machine).
