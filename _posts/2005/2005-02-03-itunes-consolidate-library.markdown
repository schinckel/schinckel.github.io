--- 
wordpress_id: 71
layout: post
title: iTunes Consolidate Library
time: "23:08:27"
date: 2005-02-03 23:08:27
tags: 
- itunes
wordpress_url: http://schinckel.net/2005/02/03/itunes-consolidate-library/
---
The iTunes menu item 'Consolidate Library' gathers all music & files in the library, and copies them to the library folder if they aren't already. However, if you have multiple users with a shared library folder, to reduce space usage, and both users consolidate to a new location, iTunes will create 2 copies of each track. What I'll need to do now is delete the second copy of each track (seems simple, since all 2nd copies end in 1, but some songs also end in a 1!), and then find a way to 're-attach' the missing tracks to the file they should correspond to. To delete files: 
    
{% highlight bash linenos %}
$ cd <Music Folder>
$ find . -name "* 1.m??" -newer <file of correct age> -exec rm {} \;
{% endhighlight %}
    

To reattach: 
    
{% highlight applescript linenos %}
tell application "iTunes"
    --if song location is unknown then 
    --attach file according to 
    --it's track_number, title, 
    --artist and album details
end tell
{% endhighlight %}
    
