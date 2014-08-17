--- 
wordpress_id: 251
layout: post
title: "Updated: acronymmer.py for ecto"
time: "18:51:29"
date: 2005-06-30 18:51:29
tags: 
- blogging
- python
- ecto
wordpress_url: http://schinckel.net/2005/06/30/updated-acronymmerpy-for-ecto/
---
I've improved acronymmer.py, my script for adding acronym tags to posts in ecto. It will work with any file, however, that is passed as an argument to the script. There is one issue with ecto, and that is that abbr tags are not recognised by the Rich Text parser, so I've just set it to convert tags to acronym only for the time being. (Note to Adriaan: You should fix this!) Don't run this script over the same text twice: it will re-tag them, resulting in messy (but still legal) code. Also, this needs a little fixing: the dictionary of items needs to return keys in size order, rather than just randomly. 
    
{% highlight python linenos %}
    #! /usr/bin/env python
        
    'A script for ecto that adds abbr and acronym tags to the text'
    
    import sys, re
        
    acronyms={'WYSIWYG':'What You See Is What You Get', 
              'DOM':'Document Object Model',
              'XHTML':'eXtensible HyperText Markup Language',
              'NSLU2':'[Linksys] Network Storage Link (USB) 2.0'
             }
        
    # get input data - depends on implementation.  For ecto:
    data = open(sys.argv[1]).read()
        
    # replace only the first instance of each acronym/abbreviation
    for each in acronyms:
        d = re.search(r'\b%s\b' % each, data)
        if d:
            data = data[:d.start()] + '&lt;acronym title="' + \
                   acronyms[each] + '"&gt;' + \
                   each + '&lt;/acronym&gt;' + data[d.end():]
        
    #return data to ecto
    open(sys.argv[1],'w').write(data)
{% endhighlight %}
