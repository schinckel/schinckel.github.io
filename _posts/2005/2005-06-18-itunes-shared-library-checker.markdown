--- 
wordpress_id: 229
layout: post
title: iTunes Shared Library Checker
time: "15:37:54"
date: 2005-06-18 15:37:54
tags: 
- itunes
- python
wordpress_url: http://schinckel.net/2005/06/18/itunes-shared-library-checker/
---
I now have the code to check the library XML file and see if there are missing tracks (ie, the files are not where they are expected to be). This code is quite slow, but simple to follow. (It took around 2 min to run). I also have the code that gets a list of the files in the library directory. It must be simple to combine this information, and work out which ones are: 

  1. Files that are 'new': they only exist on disk, not in the library. Chances are they were added by another user.
  2. Files that have become detached: there is a file and a library location, but they don't quite match up. This is probably because the users have 'Keep Library Arranged' turned on, and one of them has made a change to a track name, artist or album; or made a change to the compilation flag.

The trick will be having the list of files, and removing items from the list that have been located in the library. This will leave list that just need to be sorted into alpha and beta above. 
    
{% highlight python linenos %}
    import os
    import urllib
        
    library = os.path.expanduser('~')+'/Music/iTunes/iTunes Music Library.xml'
    startpath = '/Volumes/Media/Music'
    def greppy(library)
        data = open(library).readlines()
        tracks = {}
        this_track = 0
        for line in data:
            if line.count('<key>Track ID'):
                this_track = line.split('integer>')[1][:-2]
            elif line.count('<key>Location</key>'):
                tracks[this_track] = urllib.url2pathname(
                         line.split('string>')[1][16:-2]).replace(
                         '&#38;','&')
        
    findstr = "find "+startpath+"-type f -not -name .aacgained -not -name ._* -not -name .DS_Store | sort"
    treedata = os.popen(findstr).readlines()
        
    data = greppy(library)
        
    missing = {}
    surplus = treedata[:]
        
    for i in data:
        try:
            surplus.remove(urllib.urlopen(data[i]).url[7:]+'\n')
        except IOError:
            missing[i] = data[i]
        except ValueError:
            pass
{% endhighlight %}
    

This leaves two data structures of interest: missing, a dictionary with the 'missing tracks' from iTunes, and surplus, a list with files that do not have an associated iTunes library entry. Note: I've turned off comments, as this post seems to get a lot of comment spam. 
