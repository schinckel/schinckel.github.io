--- 
wordpress_id: 723
layout: post
title: Better iTunes Data Insert
time: "00:49:20"
date: 2006-03-05 00:49:20
tags: 
- itunes
- applescript
wordpress_url: http://schinckel.net/2006/03/05/723/
---
I've updated my Insert iTunes Data (HTML) script for generating a block of text that describes the current playing iTunes track. This version links to the iTunes Music Store, rather than Google. It is relatively smart, in that the track name link also has the artist name, and the album name does too, as long as the album isn't a compilation. The only (slight) bug is that the track name seems to need to be just the way iTMS displays it, so having _(Live)_ might stuff up a link. This might be only if there isn't a Live version in the iTMS. 

[I Can't Tell You Why (Live)][1] • [Eagles][2] • [Hell Freezes Over][3] ★★★★★

Code after the jump. 
    
    
{% highlight applescript linenos %}
    -- Insert some data about the currently playing iTunes track into browser.
    
    property star : «data utxt2605» as Unicode text
    property half : «data utxt00BD» as Unicode text
    property quarter : «data utxt00BC» as Unicode text
    property threeq : «data utxt00BE» as Unicode text
    property browser : "Firefox"
    property URLprefix : "itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?"
    
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
    		set theComp to compilation of theTrack
    		set theTrack to name of theTrack
    		--set trackInfo to {theTrack, theArtist, theAlbum, theRating}
    	end tell
    	
    	set trackLink to "<a href='" & URLprefix & "songTerm=" & HTMLify(theTrack) & "&amp;artistTerm=" & HTMLify(theArtist) & "'>" & theTrack & "</a>"
    	set artistLink to "<a href='" & URLprefix & "artistTerm=" & HTMLify(theArtist) & "'>" & theArtist & "</a>"
    	if theComp is true then
    		set theArtist to "" -- No Artist if album is compilation!
    	end if
    	set albumLink to "<a href='" & URLprefix & "albumTerm=" & HTMLify(theAlbum) & "&amp;artistTerm=" & HTMLify(theArtist) & "'>" & theAlbum & "</a>"
    	
    	set theString to "<p class='itunes'> " & trackLink & " • " & artistLink & " • " & albumLink & " " & myRating(theRating) & "</p>"
    	
    	set the clipboard to theString
    	
    	tell application browser
    		activate
    		tell application "System Events" to keystroke "v" using {command down}
    	end tell
    end run
    
    on HTMLify(someText)
    	set someText to replace(someText, "&", "&amp;")
    	set someText to replace(someText, "\"", "&quot;")
    	set someText to replace(someText, "<", "&lt;")
    	set someText to replace(someText, ">", "&gt;")
    	set someText to replace(someText, " ", "+")
    	set someText to replace(someText, "'", "&apos;")
    	return someText
    end HTMLify
    
    on replace(theText, find, replace)
    	-- Nice replace function
    	set OldDelims to AppleScript's text item delimiters
    	set AppleScript's text item delimiters to find
    	set newText to text items of theText
    	set AppleScript's text item delimiters to replace
    	set theResult to newText as text
    	set AppleScript's text item delimiters to OldDelims
    	return theResult
    end replace
    
    on myRating(theRating)
    	set theResult to ""
    	repeat 5 times
    		if theRating ≥ 20 then
    			set theResult to theResult & star
    		else if theRating ≥ 10 then
    			set theResult to theResult & half
    		end if
    		set theRating to theRating - 20
    	end repeat
    	return theResult
    end myRating
{% endhighlight %}
    

[One More Time][4] • [Daft Punk][5] • [Triple J Hottest 100 - Volume 9][6] ★★★

   [1]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=I+Can't+Tell+You+Why+(Live)&artistTerm=Eagles
   [2]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Eagles
   [3]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Hell+Freezes+Over&artistTerm=Eagles
   [4]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=One+More+Time&artistTerm=Daft+Punk
   [5]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Daft+Punk
   [6]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Triple+J+Hottest+100+-+Volume+9&artistTerm=

