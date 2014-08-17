--- 
wordpress_id: 275
layout: post
title: iTunes Library Checker 2.0
time: "22:32:57"
date: 2005-07-18 22:32:57
tags: 
- itunes
- python
wordpress_url: http://schinckel.net/2005/07/18/itunes-library-checker-20/
---
I've rewritten most of iTunes Library Checker to use some neater import code, it should also be a bit faster. Not quite complete yet, but close to the previous functionality. 
    
{% highlight python linenos %}
    #! /usr/bin/env python
    
    import Foundation
    import os
    import struct
    
    library =  os.path.expanduser('~/Music/iTunes/iTunes Music Library.xml')
    db = Foundation.NSDictionary.dictionaryWithContentsOfFile_(library)
    libpath = Foundation.NSURL.URLWithString_(db[u'Music Folder']).path()
    
    tracks = db[u'Tracks'].itervalues()
    
    findstr = "find '"+libpath+"' -type f -not -name .aacgained -not -name ._* -not -name .DS_Store | sort"
    treedata = os.popen(findstr).readlines()
    
    missing = []
    other = []
    missing_files = []
    other_files = []
    surplus = treedata[:]
    
    for track in tracks:
        location = Foundation.NSURL.URLWithString_(track[u'Location']).path()
        if not os.path.exists(location):
            missing.append(track)
            missing_files.append(str(location))
        else:
            try:
                surplus.remove(str(location)+'\n')
            except ValueError:
                other.append(track)
                other_files.append(str(location))
        
    missing_files.sort()
    other_files.sort()
    surplus.sort()
    
    open('surplus.txt','w').writelines(surplus)
    open('missing.txt','w').writelines(missing_files)
    open('other.txt','w').writelines(other_files)
{% endhighlight %}
    
