--- 
wordpress_id: 630
layout: post
title: iTunes Ratings
time: "12:46:39"
date: 2006-01-26 12:46:39
tags: 
- itunes
- applescript
wordpress_url: http://schinckel.net/2006/01/26/itunes-ratings/
---
From [OmniNerd: Playing Favourites][1], I decided to run my own version of the experiment that compares how often songs with different ratings get played by iTunes. The difference with my experiment is that it has 101 tracks, each with a different rating (_0, 1, â€¦, 99, 100_).  To start with, I created a new user, so I wouldn't have to muck around with my own iTunes library. I recorded a short empty track with _Sound Studio_. That is, I started the application, pressed _Record_, then _Stop_, and saved this. Then, I imported this track into _iTunes_, and made it so it was only 0.01 seconds in length (use _Info_, _Options_, _Stop Time_). This will make the experiment much faster than the previous one, which had 1 second tracks. I'm not that concerned it's an AIFF, as I made this script to create the 101 empty tracks, as AAC or MP3: 
    
    
{% highlight applescript linenos %}
    tell application "iTunes"
    	set i to 0
    	set base to first item of selection
    	repeat 101 times
    		set trk to first item of (convert base)
    		set name of trk to i
    		set rating of trk to i
    		set i to i + 1
    	end repeat
    end tell
{% endhighlight %}
    

This will duplicate the selected track (or the first track of the selection, if you have more than one) 101 times. It will then give a name to each of these, _0-100_, and assign the same rating as the name. Since doing this also seemed to play the tracks once, I used the following script to reset the play count. The bonus is that it can be used to reset the play counts and run the experiment again, with different parameters. 
    
    
{% highlight applescript linenos %}
    tell application "iTunes"
    	repeat with trk in selection
    		set played count of trk to 0
    	end repeat
    end tell
{% endhighlight %}
    

It's now time to run the experiment. I set the Party Shuffle to use the Library, and to play higher rated songs more often. Then I clicked play, and went away for about 12 hours. • When I came back, I could see what the data was starting to look like, but I grabbed the data using this script anyway: 
    
    
{% highlight applescript linenos %}
    tell application "iTunes"
    	set theData to {}
    	repeat with trk in selection
    		set theRating to name of trk
    		set theCount to played count of trk
    		set thisData to {theRating, theCount}
    		copy thisData to the end of theData
    	end repeat
    end tell
    
    get theData
    
    tell application "TextEdit"
    	set theDoc to make new document
    	repeat with thisData in theData
    		set text of theDoc to text of theDoc & (first item of thisData) & "," & (second item of thisData) & return
    	end repeat
    end tell
{% endhighlight %}
    

Then, I saved this file as a CSV file, and imported it into Excel, which when plotted, gives the following graph: ![][2] To me, the results look pretty clear. iTunes does not take into account the actual rating, only the star value. Even the new half-stars aren't notably different. I'll continue to run the experiment, and put up another post later. I may change some things, and rerun the original experiment, just to confirm it, although my results seem to do this already. 

   [1]: http://www.omninerd.com/news/news.php?nid=260#4145
   [2]: /images/12HoursData.png


