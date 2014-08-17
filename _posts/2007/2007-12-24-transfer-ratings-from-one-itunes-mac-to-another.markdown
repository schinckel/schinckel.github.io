--- 
wordpress_id: 1339
layout: post
title: Transfer ratings from one iTunes Mac to another
time: "09:46:54"
date: 2007-12-24 09:46:54
tags: 
- itunes
- python
wordpress_url: http://schinckel.net/2007/12/24/transfer-ratings-from-one-itunes-mac-to-another/
---
I've consolidated all of my media onto my new Mac Mini, but didn't really think some things through when I first did it. For instance, I put all of my video data in before transferring my music across. I've still kept a copy of my music on the laptop, for what it's worth, but because I just copied files, then I lost all of my rating data.

I looked at a couple of solutions for transferring the ratings, the most promising was a semi-manual method of creating smart playlists, one for each rating.

That was too old-tech for me, so I came up with a solution that uses Remote Apple Events. Now, to make the code easier, I'm using python and appscript, so make sure you have both of those installed.
    
{% highlight python linenos %}
    #! /usr/bin/python  
    
    import appscript  
    
    # Set up the two iTunes libraries.  
    local = appscript.app('itunes')  
    
    # You'll need to replace jens.local with your remote machine's name  
    remote = appscript.app(url='eppc://jens.local/itunes')  
    
    local.lib = local.playlists()[0].tracks()  
    remote.lib = remote.playlists()[0].tracks()  
    
    # Create a dictionary with all local track names/artists/albums  
    library = {}  
    
    for each in local.lib:  
        key = each.name()+":"+each.artist()+":"+each.album()  
        library[key] = each  
    
    # Iterate over every remote track.  
    # If it is in the local library, take the local rating and  
    #    apply that to the remote track.  
    for each in remote.lib:  
        key = each.name()+":"+each.artist()+":"+each.album()  
        print key,  
        if library.has_key(key):  
            each.rating.set(library[key].rating())  
            print "rated."  
        else:  
            print "doesn't exist in local library"  {% endhighlight %}

    

That's it. I've used this to transfer all of my ratings from local to remote iTunes. Granted, there is no check to see if I've got all of the local tracks on the remote machine - but that is mainly because I don't have my Podcast library on the remote machine, and I hope (know?) I have all of the music, and that's the stuff I care about.

  
![][1]

Here's a screenshot from my remote library.

   [1]: /images/2007/12/200712241046.jpg

