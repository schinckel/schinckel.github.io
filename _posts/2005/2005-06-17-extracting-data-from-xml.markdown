--- 
wordpress_id: 228
layout: post
title: Extracting Data from XML
time: "15:58:50"
date: 2005-06-17 15:58:50
tags: 
- python
wordpress_url: http://schinckel.net/2005/06/17/extracting-data-from-xml/
---
Python does have tools for grepping XML files, but I've never been able to get them to work to my liking. I've generally just stripped out the data I need. And I will continue to do so, as it's probably much faster than filtering through all of the crud I don't need. 
    
{% highlight python linenos %}
    library = os.path.expanduser('~')+'/Music/iTunes/iTunes Music Library.xml'
    data = open(library).readlines()
        
    tracks = {}
    this_track = 0
    for line in data:
        if line.count('<key>Track ID'):
            this_track = line.split('integer>')[1][:-2]
        elif line.count('<key>Location</key>'):
            tracks[this_track] = urllib.url2pathname(line.split('string>')[1][16:-2]).replace('&#38;','&')
{% endhighlight %}

The above code will search through the library file, and grab info on each track: just the database ID, and the location (which is a URI, encoded to remove spaces and dodgy characters. The info is then put into a dictionary, where the key is the database ID, and the value is the location. Note that there is a `replace()` at the end of the last line - for some reason python's `urllib.url2pathname()` function doesn't replace & characters - I guess that's because these aren't really intended to be in a filename. Also, on my NSLU2 the extended characters are replaced by underscores, but I'm going to update to samba 3 (at the risk of mucking up the entire library...) to see if this fixes that issue. Anyway, after coding this, I had a bit of a think, and came up with the following method of doing the same (ensure it's all on one line): 
    
{% highlight bash linenos %}
    grep Location ~/Music/iTunes/iTunes\ Music\ Library.xml |
      awk 'sub("<key>Location</key%gt;<string>file://localhost","",$1)' |
      sed 'sx</string>xx'
{% endhighlight %}

The python version uses between 5-8 seconds of CPU time, the grep version around 1.5, but does not associate the database ID's with the locations, which I need. It also looks to be much easier to do the changing of characters (%20, for instance, into a space) that I need to do so I can check to see if files exist. Actually, using `urllib.urlopen()`, I can use the escaped/quoted version to see if the file exists, but it might be slow. 
