--- 
wordpress_id: 1090
layout: post
title: NSLU2 busybox issues
time: "23:50:01"
date: 2007-01-10 23:50:01
tags: 
- nslu2
wordpress_url: http://schinckel.net/2007/01/10/nslu2-busybox-issues/
---
I had a bit of an issue with my NSLU2 tonight. I wasn't able to install `coreutils`. It was complaining that `busybox-links` was installed, and it was clashing. However, I didn't have it installed, and no amount of `ipkg remove busybox-links`, or `ipkg -force-overwrite install coreutils` was working. Then I came across [Slugging][1], which shows how to deal with this exact problem: remove the _busybox _and _busybox-links_ stanzas from the file `/usr/lib/ipkg/status`. Thanks, z0mbi3. Even though I hate l33tsp33k. 

   [1]: http://outrora.eu/2006/10/29/slugging/

