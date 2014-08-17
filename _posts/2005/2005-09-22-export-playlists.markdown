--- 
wordpress_id: 768
layout: post
title: Export Playlist(s)
time: "21:31:31"
date: 2005-09-22 21:31:31
tags: 
- itunes
- applescript
wordpress_url: http://schinckel.net/2005/09/22/export-playlists/
---
I'm still kinda bummed out over how long it takes to scan through all of the playlists in iTunes and grab the details of each song, and write it all out to a file. I'm talking about Smart Playlists here, since it would be a trivial exercise to just grab the songs from the XML file that iTunes so nicely provides for normal playlists. Since I don't use normal playlists (except when looking for missing album art - darn iTunes's inability to search on missing artwork!), Bery Rinaldo's Export Playlist to M3U didn't necessarily do what I am doing any better.

But, I did pinch some ideas from him - the first was a snippet on how to get the name of the currently selected playlist:

{% highlight applescript linenos %}
tell application "iTunes"
    if (class of front window is browser window) or (class of front window is playlist window) then
        get name of view of window 1	
    end if
end tell
{% endhighlight %}


The second I haven't implemented yet, is having settings, and a setup wizard.

Anyway, the updated version is [Export Playlists.scpt][1], put it in `~/Library/iTunes/Scripts` (User only) or `/Library/iTunes/Scripts` (System-wide).

   [1]: http://members.optusnet.com.au/~matt.schinckel/files/Export%20Playlists.scpt

