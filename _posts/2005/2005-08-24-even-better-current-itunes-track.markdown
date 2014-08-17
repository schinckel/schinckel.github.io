--- 
wordpress_id: 385
layout: post
title: Even better Current iTunes Track
time: "22:24:23"
date: 2005-08-24 22:24:23
tags: 
- adium
- applescript
wordpress_url: http://schinckel.net/2005/08/24/even-better-current-itunes-track/
---
It's nice to show other users what you are listening to, and provide a handy link for them to see more about the artist and track. I noticed that some IM systems don't like HTML, and I figured out a way to make the link only be sent to a user of an AIM compatible or Jabber server. 

Basically, you test the result of `serviceClass of contact of the active chat of the first interface controller`, and if it is "AIM-compatible" or "Jabber", then you use HTML, if not, just plain text. You can download it from [Adium Xtras: Now Playing in iTunes][1]. 

Full Source: 

{% highlight applescript linenos %}
– Better itunes adium link script
– Includes rating (if present), and links.
property message_prefix : Â«data utxt266B0020Â» as Unicode text
property not_listening_message : "Quiet"
property star : Â«data utxt2605Â» as Unicode text
property google : "http://www.google.com/search?q="
property server : ""

property html_classes : {"AIM-compatible", "Jabber"}

on substitute()
    –set server to "http://" & my getIP() & ":8080" — Use betterGetIP if on broadband!
    
    tell application "System Events"
        try
            get process "iTunes"
        on error
            return message_prefix & not_listening_message
        end try
    end tell
    
    tell application "iTunes"
        if player state is not playing then
            return message_prefix & not_listening_message
        end if
        set theArtist to artist of current track
        if theArtist is "" then set theArtist to "Unknown Artist"
        set theTrack to name of current track
        set theRating to " " & my myRating(rating of current track)
        set theLocation to location of current track
        set pth to my encode_URL_string(characters 9 thru end of (POSIX path of theLocation) as string)
    end tell
    
    tell application "Adium" to set accountType to serviceClass of contact of the active chat of the first interface controller
    if first item of accountType is in html_classes then
        return html(message_prefix & my myLink(google, theArtist) & " • " & my myLink(server & pth, theTrack) & theRating)
    else
        return message_prefix & theArtist & " • " & theTrack & theRating
    end if
end substitute

on myRating(theRating)
    set theResult to ""
    set theTimes to (theRating - 9) / 20 as integer
    repeat theTimes times
        set theResult to theResult & star
    end repeat
    return theResult
end myRating

on myLink(URI, theText)
    if URI is google then
        set URI to URI & first word of theText
        repeat with wd in (rest of every word of theText)
            set URI to URI & "+" & wd
        end repeat
    else if server is "" then
        return theText
    end if
    return "<a href=\"" & URI & "\">" & theText & "</a>"
end myLink

on html(str)
    return ("<HTML>" as Unicode text) & str & "</HTML>"
end html

on getIP()
    return do shell script "ifconfig ppp0 | grep inet | awk ‘{print $2}’"
end getIP

on betterGetIP()
    return do shell script "curl -s http://www.showmyip.com/simple/ | grep GMT | awk ‘{print $1}’"
end betterGetIP

property allowed_URL_chars : (characters of "/$-_.+!*’(),1234567890abcdefghijklmnopqrstuvwxyz")
property hex_list : (characters of "0123456789ABCDEF")

on encode_URL_string(this_item)
    set character_list to (characters of this_item)
    repeat with i from 1 to number of items in character_list
        set this_char to item i of character_list
        if this_char is not in allowed_URL_chars then set item i of character_list to my encode_URL_char(this_char)
    end repeat
    return character_list as string
end encode_URL_string

on encode_URL_char(this_char)
    set ASCII_num to (ASCII number this_char)
    return ("%" & (item ((ASCII_num div 16) + 1) of hex_list) & (item ((ASCII_num mod 16) + 1) of hex_list)) as string
end encode_URL_char

on run
    tell application "Adium" to activate
    my substitute()
end run
{% endhighlight %}


   [1]: http://www.adiumxtras.com/index.php?a=xtras&xtra_id=1892

