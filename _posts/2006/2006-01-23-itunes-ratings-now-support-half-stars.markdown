--- 
wordpress_id: 627
layout: post
title: iTunes Ratings now support half-stars
time: "15:27:17"
date: 2006-01-23 15:27:17
tags: 
- itunes
wordpress_url: http://schinckel.net/2006/01/23/itunes-ratings-now-support-half-stars/
---
I updated to iTunes 6.0.2, and looky what I found: ![][1] Now, the trick is that it needs to be exactly 10, 30, 50, 70 or 90 in order to be a half-star. A rating of 75 will still appear to be three stars. I think this is a bug. I've written some code that does it better: 
    
    
{% highlight applescript linenos %}
    property star : «data utxt2605» as Unicode text
    property half : «data utxt00BD» as Unicode text
    property quarter : «data utxt00BC» as Unicode text
    property threeq : «data utxt00BE» as Unicode text
    
    on myRating(theRating)
    	set theResult to ""
    	repeat 5 times
    		if theRating > 20 then
    			set theResult to theResult & star
    		else if theRating > 15 then
    			set theResult to theResult & threeq
    		else if theRating > 10 then
    			set theResult to theResult & half
    		else if theRating > 5 then
    			set theResult to theResult & quarter
    		end if
    		set theRating to theRating - 20
    	end repeat
    	return theResult
    end myRating
{% endhighlight %}
    

I'm currently using this to get the ratings data to add to my blog posts: at the moment it's a FastScript that just inserts the data via the clipboard, but when Blogsome gets XMLRPC working again, it will be an ecto script. 

It's Still Rock And Roll To Me • [Billy Joel][2] • [Greatest Hits][3] ★★¼

   [1]: /images/ratings.png
   [2]: http://www.google.com/search?q=%22Billy Joel%22
   [3]: http://www.google.com/search?q=%22Greatest Hits%22

