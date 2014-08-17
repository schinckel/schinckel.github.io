--- 
wordpress_id: 930
layout: post
title: autoTorrent
time: "22:49:25"
date: 2006-08-31 22:49:25
tags: 
- languages
- nslu2
wordpress_url: http://schinckel.net/2006/08/31/autotorrent/
---
I've started using BitTorrent, or rather a couple of different clients, since I got ADSL, but what I really want is a fire-and-forget client for the NSLU2. This is what should happen. 

  * Monitor a certain directory. If a .torrent file is added to this directory, add it to the queue.
  * When a torrent is complete, move the file(s) to a completed directory. Send an email, or something. Perhaps add an item to an RSS feed. Remove the .torrent from the download queue, but keep it seeded.
  * When neither of the other computers is turned on, download the next .torrent in the queue.
  * If the download total of the running torrents is less than 80% of the available, start the next .torrent in the queue.
  * If more than one .torrent is running and bandwidth use is greater than 90%, then stop the lowest in the queue that is running.
  * Have a nice web interface that allows for changing the queue order.

There is a torrent ipkg for nslu2, which I've downloaded, but I may write my own. It's show day tomorrow, so that might be a good start. 
