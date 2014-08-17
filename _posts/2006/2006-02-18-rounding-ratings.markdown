--- 
wordpress_id: 688
layout: post
title: Rounding Ratings
time: "22:05:49"
date: 2006-02-18 22:05:49
tags: 
- itunes
- applescript
wordpress_url: http://schinckel.net/2006/02/18/rounding-ratings/
---
I like that iTunes displays half-star ratings, but I want my tracks rated 51-59 to display this way too. That doesn't work, but if you use the following script, it will round the ratings of selected tracks to the nearest half-star: 
    
    
{% highlight applescript linenos %}
    tell application "iTunes"
    	repeat with trk in selection
    		set rating of trk to ((rating of trk) / 10 as integer) * 10
    	end repeat
    end tell
{% endhighlight %}
    
    

I hope Apple don't include the functionality of odd-rated tracks to play different amounts, otherwise I'll need to re-rate all of my music. Again. 
