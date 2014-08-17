--- 
wordpress_id: 716
layout: post
title: Resizing Images in AppleScript/Automator
time: "18:31:36"
date: 2006-03-04 18:31:36
tags: 
- applescript
wordpress_url: http://schinckel.net/2006/03/04/resizing-images-in-applescriptautomator/
---
I've already written a small Automator application that will resize an image to 640x480, but what about if I want to change it to a different size. There's no way to set the resize amount on the fly in Automator, so I thought, it should be easy to do it in AppleScript. Except, for some reason, Preview.app isn't scriptable. I do have Image Events.app floating around (not sure if it's a standard part of the system), which can do what I want. 
    
    
{% highlight applescript linenos %}
    tell application "Finder"
    	set sels to selection
    end tell
    
    
    repeat with sel in sels
    	tell application "Image Events"
    		set img to open sel as alias
    		set dims to dimensions of img
    	end tell
    	
    	set cursize to "Current Size of Image: " & (first item of dims as integer as text) & " x " & (last item of dims as integer as text)
    	
    	display dialog cursize
    end repeat
{% endhighlight %}
    
    

This gets the current size, but I'm yet to find an easy way to get input from the user, and resize it according to this. I'm sure it can't be that tricky! 
