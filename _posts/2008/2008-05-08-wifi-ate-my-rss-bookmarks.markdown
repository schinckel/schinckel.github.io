--- 
wordpress_id: 1417
layout: post
title: WiFi ate my RSS bookmarks
time: "23:41:28"
date: 2008-05-08 23:41:28
tags: 
- internet
wordpress_url: http://schinckel.net/2008/05/08/wifi-ate-my-rss-bookmarks/
---
I have around about 120 feeds in my NetNewsWire subscription list. And I love reading all of them.

Just recently, I had noticed I seemed to be getting less and less news than before. This was odd, but I just put it down to everyone else being as busy as me.

Then, tonight I noticed when I refreshed my feeds manually, most of them had generic icons, instead of the usual favicons that appear.

When viewing the properties, all of these feeds had the default address that pages get redirected to when using one of the various Wireless networks I use daily is accessed without authenticating.

Thus, some of them pointed at www.vpn.infoeng.flinders.edu.au, and some had the IP address of the authentication router that one of the other APs points me at.

So, I spent the first half hour of my free time this evening double-clicking each item in the feeds list, and re-subscribing to the feed, and then deleting the original feed entry, which is pointed to the wrong site.

I then spent the next few hours catching up on the feeds that had obviously been modified by the lovely WiFi router over the past few months. 455 unread articles.

I'm not quite sure how the feeds addresses got changed, whether it is a NNW issue, or something that is idiosyncratic of the way that HTTP redirects work. I'm thinking it's just a side effect of the way the router redirects all pages. But it is a pretty crappy one. I have looked at a method of trying to automatically authenticate on an unsecured wireless network that uses web-based authentication, but it failed last time.
