--- 
wordpress_id: 463
layout: post
title: Insert iTunes Data into Post
time: "00:40:17"
date: 2005-10-05 00:40:17
tags: 
- applescript
wordpress_url: http://schinckel.net/2005/10/05/insert-itunes-data-into-post/
---
I used to use ecto to paste all of my entries on my blog, but with Blogsome's XMLRPC issue, I have to use a browser. But it would be nice to automatically get the name and information about my currently playing iTunes track, just like ecto used to do. I wrote an AppleScript that does this, and, inserts the data in at the insertion point for you. Because it's intended to be run from the Script Menu, and everything run from there runs as "System Events", I had to hard code in the browser name. If you use another browser, just replace the second line with whatever your browser is called. 

{% highlight applescript linenos %}
property star : «data utxt2605» as Unicode text
property browser : "Camino"
on run {}
    
    tell application "System Events"
        try
            get process "iTunes"
        on error
            return "No Track"
        end try
    end tell
    
    tell application "iTunes"
        set theTrack to current track
        set theArtist to artist of theTrack
        set theAlbum to album of theTrack
        set theRating to rating of theTrack
        set theTrack to name of theTrack
    end tell
    
    set theString to "<p class=’itunes’> " & theTrack & " • <a href='http://www.google.com/search?q=%22" & theArtist & "%22>" & theArtist & "</a> • <a href=’http://www.google.com/search?q=%22" & theAlbum & "%22>" & theAlbum & "</a> " & myRating(theRating)
    set the clipboard to theString
    
    tell application browser
        activate
        tell application "System Events" to keystroke "v" using {command down}
    end tell
end run

on myRating(theRating)
    set theResult to ""
    set theTimes to (theRating - 9) / 20 as integer
    repeat theTimes times
        set theResult to theResult & star
    end repeat
    return theResult
end myRating
{% endhighlight %}


  

