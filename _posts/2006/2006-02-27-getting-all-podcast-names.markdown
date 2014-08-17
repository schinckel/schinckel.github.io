--- 
wordpress_id: 705
layout: post
title: Getting all Podcast Names
time: "21:11:38"
date: 2006-02-27 21:11:38
tags: 
- applescript
wordpress_url: http://schinckel.net/2006/02/27/getting-all-podcast-names/
---
Here's a nice little AppleScript I knocked up to grab all of the details of my podcasts, for the previous post: 
    
    
{% highlight applescript linenos %}
    tell application "iTunes"
    	set podcastList to {}
    	repeat with trk in selection
    		set thisPodcast to album of trk & " • " & artist of trk
    		if thisPodcast is not in podcastList then
    			set podcastList to podcastList & thisPodcast
    		end if
    	end repeat
    end tell
    
    set HTML to "<ul>"
    repeat with trk in podcastList
    	set HTML to HTML & "<li>" & trk & "</li>"
    end repeat
    set the clipboard to HTML & "</ul>"
{% endhighlight %}
    

Hot Toddy • [Mindtrip][1] • [Chillout Sessions 8][2] ★★

   [1]: http://www.google.com/search?q=%22Mindtrip%22
   [2]: http://www.google.com/search?q=%22Chillout Sessions 8%22

