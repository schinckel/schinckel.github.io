--- 
wordpress_id: 225
layout: post
title: Find tracks not in iTunes library
time: "21:21:19"
date: 2005-06-15 21:21:19
tags: 
- itunes
- python
wordpress_url: http://schinckel.net/2005/06/15/find-tracks-not-in-itunes-library/
---
I've written a python script that walks through a path tree, checking to see if each file in the tree is a track in the current user's _iTunes Music Library.xml_ file. 
    
{% highlight python linenos %}
    import os, re
    
    startpath = "/Volumes/Media/Music/"
    prefix = "file://localhost"
    library = os.path.expanduser("~")+"/Music/iTunes/iTunes Music Library.xml"
    
    def eachpath(arg, path, tracks):
        for track in tracks:
            if os.path.isfile(os.path.abspath(path)+'/'+track):
                trackpath = os.path.join(os.path.abspath(path),track)
                grepstr = prefix+trackpath.replace(" ","%20")
                if grepstr not in data:
                    arg.append(grepstr)
    
    data = open(library).read()
    missing = []
    os.path.walk(startpath, eachpath, missing)
    
    print missing
{% endhighlight %}

It's not flawless - on my machine it eats up over 11 meg of memory, and takes ages to run, but as a proof of concept, it works okay. The memory it uses is mostly because is stores the whole iTunes library file in memory, so that's 9 meg on my system already. The main loop is doing a `string1 not in string2`, which is probably not optimal, but it was easy to code, for now. I'm still waiting to see how long it takes to do my whole library, but I'm getting bored with waiting. Edit: to reduce the time taken, I used the following code in the final if clause in the function: 
    
{% highlight python linenos %}
try:
    if not re.search(grepstr, data):
        arg.append(grepstr)
except:
    if grepstr not in data:
        arg.append(grepstr)
{% endhighlight %}    

The re one is much faster, but fails in some cases: the second one, while slower, is a fallback. There are also some other issues, at this stage I have not cared that much about escaped characters, which iTunes uses when storing the information. But, I came up with a quicker method than python's os.path.walk(). Using the find command is much quicker: 
    
{% highlight bash linenos %}
    find /Volumes/Media/Music -type f -not -name .aacgained -not -name ._* -not -name .DS_Store
{% endhighlight %}

takes between 12-36 seconds for my 5700+ library stored on my NSLU2. If I telnet into the NSLU2 and run the equivalent command: 
    
{% highlight bash linenos %}
    find ~media/Music -type f -not -name .aacgained -not -name ._* -not -name .DS_Store
{% endhighlight %}

it takes on average less than one second to complete. So, that's more than an order of magnitude, even if the network traffic is low. Oh, and it compares very favourably with the python version, which takes _at least_ one minute to run. 
