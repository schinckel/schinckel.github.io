--- 
wordpress_id: 277
layout: post
title: How long have you iTunes-d?
time: "20:40:50"
date: 2005-07-20 20:40:50
tags: 
- itunes
wordpress_url: http://schinckel.net/2005/07/20/how-long-have-you-itunes-d/
---
I like the bit that appears at the bottom of iTunes, telling you how much music you have in your collection (or in the current playlist). ![iTunes Library Size][1] I thought it might be fun to see how much music I had listened to. As it turns out: 5883 songs, 17:13:27:05 total time. Here is the script I wrote to find it out. 
    
{% highlight python linenos %}
    #! /usr/bin/env python
    
    import Foundation
    import os
    
    library =  os.path.expanduser('~/Music/iTunes/iTunes Music Library.xml')
    
    db = Foundation.NSDictionary.dictionaryWithContentsOfFile_(library)
    tracks = db[u'Tracks'].itervalues()
    
    timecount = 0
    playcount = 0
    
    for track in tracks:
        try:
            timecount = timecount + track[u'Play Count'] * track[u'Total Time']/1000
            playcount = playcount + track[u'Play Count']
        except KeyError:
            pass
    
    days, timecount = timecount / (60 * 60 * 24), timecount % (60 * 60 * 24)
    hours, timecount = timecount / (60 * 60), timecount % (60 * 60)
    minutes, seconds = timecount / 60, timecount % 60
    
    print '%i songs, %i:%02i:%02i:%02i total time' % (playcount, days, hours, minutes, seconds)
{% endhighlight %}

   [1]: /images/iTunesSize.png

