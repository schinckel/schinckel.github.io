--- 
wordpress_id: 864
layout: post
title: Don't Dirty Stats with your Visits
time: "19:28:00"
date: 2006-04-17 19:28:00
tags: 
- blogsome
- smarty-templates
- performancing-metrics
wordpress_url: http://schinckel.net/2006/04/17/dont-dirty-stats-with-your-visits/
---
I often spend a heap of time tweaking stuff on my blog, and these show up as hits in the Referrers list, as well as on Performancing Metrics, a system of tracking readership. Now, it's rather simple to stop your visits counting towards your stats. First, visit your site, and ensure you are logged in. In your address bar at the top of your browser, type in javascript:document.cookie, and press return. Find the cookie entry that starts with `wordpressuser_`, and copy the garbage-looking string after it - this is the md5 hash of your server name - to the clipboard. Find the location of your stat-gathering code. Before it starts, enter: `{if $smarty.cookie.wordpressuser_md5string != "username"}` and after it ends, enter: `{/if}` Make sure to replace md5string with your md5 hash! • This could also be used to have any text show/not show when you visit your own blog. Like Google AdSense ads, for instance. 
