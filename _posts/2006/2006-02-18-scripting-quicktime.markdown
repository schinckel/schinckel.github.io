--- 
wordpress_id: 687
layout: post
title: Scripting Quicktime
time: "23:19:41"
date: 2006-02-18 23:19:41
tags: 
- applescript
wordpress_url: http://schinckel.net/2006/02/18/scripting-quicktime/
---
I'm trying to create reference movies (as Quicktime .MOV documents) for all of the movies on my Media server, and the most obvious method is to use AppleScript and Quicktime Player. Why am I doing this? Because iTunes requires Quicktime Movies, I've mainly got AVIs, and I don't want to (a) convert all of them, and (b) have iTunes manage them. I'd rather have the files in the right spot, and allow iTunes to manage the reference movies. Quicktime will often open files of varying types, even though iTunes will not. It's then possible to save the file, and choose not to create a stand-alone movie. This will create a reference movie, which is much smaller than the original, but requires that the original remains in the same place in order to work.  However, using AppleScript, the following will not work if AVIs are set to play in another player, like VLC: 
    
    
{% highlight applescript linenos %}
    tell application "Finder"
    	set theMovies to selection
    end tell
    
    repeat with theMovie in theMovies
    	tell application "QuickTime Player"
    		open theMovie
    	end tell
    end repeat
{% endhighlight %}
    
    

That is, the movie opens in it's default application. To get it to work requires simply the following: 
    
    
{% highlight applescript linenos %}
    tell application "Finder"
    	set theMovies to selection
    end tell
    
    repeat with theMovie in theMovies
    	tell application "QuickTime Player"
    		open theMovie as alias
    	end tell
    end repeat
{% endhighlight %}
    
    

That little `as alias` causes Quicktime to open it, instead of VLC. How bizarre! The next problem is that by default, it puts the document(s) into a list. I often make the mistake of operating on a list, rather than each item individually. Especially when there's only one item in the list. It's like my eyes don't see the curly brackets. So, we can save the movie, and by default it will save it as a reference movie. Next problem, how do we tell it where to save the movie? It will default to the root directory of the boot disk. Not really where I want to save this file, as I want to do multiple copies. But, what I can do is save the file, import it into iTunes, (ensuring that iTunes creates a copy of this file in it's library) and then delete the file, or create the next one over the top. What I'm up to so far (and this doesn't deal with names or anything yet): 
    
    
{% highlight applescript linenos %}
    tell application "Finder"
    	set theMovies to selection
    end tell
    
    repeat with theMovie in theMovies
    
    	tell application "QuickTime Player"
    		set mov to first item of (open theMovie as alias)
    		save mov in (file "movie.mov")
    		close mov
    	end tell
        
    	tell application "iTunes"
    		add alias "Macintosh HD:movie.mov"
    	end tell
        
    end repeat
{% endhighlight %}
    

More later. Sleep time now. 
