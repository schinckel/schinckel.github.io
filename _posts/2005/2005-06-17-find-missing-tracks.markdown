--- 
wordpress_id: 227
layout: post
title: Find Missing Tracks
time: "15:55:39"
date: 2005-06-17 15:55:39
tags: 
- itunes
- python
- applescript
wordpress_url: http://schinckel.net/2005/06/17/find-missing-tracks/
---
Continuing on from my last [programming related post][1], I've been giving some thought to the opposite problem: when tracks are in the iTunes Library, but the file they refer to is not there. iTunes marks these with an exclaimation mark in front of the track, but only if it realises they are in fact missing. Often, just clicking on a track does not mean iTunes knows that track is missing. A _Get Info_ on such a track prompts the user for a choice between removing the track from the library, or locating it.  It might be possible to use the following AppleScript paradigm to get a list of the tracks that are missing: 

{% highlight applescript linenos %}
tell application "iTunes"
    set theTracks to every track in playlist 1
    set missing to {}
    repeat with theTrack in theracks
        if location of theTrack is [unknown] then
            set missing to missing + theTrack
        end if
    end repeat
end tell
{% endhighlight %}

Of course, that would be dead slow, as it relies on a couple of AppleScript events for each track. (Also, it may not work, but some sort of `try - else - end try` clause might work.) A better solution might be to sort through the _iTunes Music Library.xml_ file. 
    
{% highlight python linenos %}
    import os
        
    data = open("iTunes Music Library.xml").readlines()
    missing = []
        
    for line in data:
        if "<location>" in line:
            #extract location
            location = line.split("/Volumes")[1].split("</location>")[0]
            #check if location is not a file
            if not os.path.isfile(location):
                missing.append(location)
{% endhighlight %}

Assuming that the mount point is the same as the last time the XML file was written (and iTunes seems to be pretty clever about working out things like `/Volumes/Media` vs. `/Volumes/Media-1`, then your list missing should contain a list of files that are in the library, but not where iTunes expects them to be. It might be possible to then match these two lists (from [this script][1]), and see which ones are likely to be 'modified tracks', where one user has changed the track name, artist or album. It may even be worthwhile having a list of all track locations, and seeing if there are any duplicates, that will solve the problem of duplicates int he library that are the same file. I'd like to have python parse the XML file, and create data structures reflecting the XML data - but skip everything but the database ID and filename, as these are the things that we really need - but I haven't had much luck with this type of process in the past. I jsut had a thought on how to do it, though. 

   [1]: http://schinckel.net/2005/06/15/find-tracks-not-in-itunes-library/
