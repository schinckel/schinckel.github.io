--- 
wordpress_id: 822
layout: post
title: Changing a Feed Location
time: "20:37:21"
date: 2006-03-26 20:37:21
tags: 
- radio-and-podcasting
wordpress_url: http://schinckel.net/2006/03/26/changing-a-feed-location/
---
I'm pretty happy with the way I'm creating pseudo-Podcasts of ABC programs that are available in RealMedia only: I use a program called realdump, which calls mplayer, to dump the audio to a .WAV file, which I convert to AAC using faac. I then get the data from the web page, and create an entry in an XML file. This in itself isn't that tricky, but the clever part, at least in theory, is that I chose the URL I think the ABC might use when they finally Podcast that programme, and have a hostname entry for [www.abc.net.au][1], which I use when I'm not online. However, every program I have done this for has chosen a different URL than the one I chose. For instance, [The Philosopher's Zone][2] has chosen: [_http://www.abc.net.au/rn/podcast/feeds/pze.xml_][3] instead of: _http://www.abc.net.au/rn/podcast/feeds/pzone.xml_ which is closer to the RealMedia file names, or: _http://www.abc.net.au/rn/podcast/feeds/philosopher.xml_ which more accurately reflects their URL naming scheme. Apparently it's possible to redirect a feed, so that iTunes then looks in a new location, using something like 301 redirects. The problem is I can't get apache to do this, for some reason. I've tried using `.htaccess` files, but they don't seem to do anything. I think Apple should make it so that a permanent redirect can be placed in the XML file, and iTunes respects this for future checks. 

   [1]: http://www.abc.net.au
   [2]: http://www.abc.net.au/rn/talks/philosopher/
   [3]: http://www.abc.net.au/rn/podcast/feeds/pze.xml


