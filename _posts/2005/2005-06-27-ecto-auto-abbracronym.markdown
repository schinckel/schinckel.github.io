--- 
wordpress_id: 240
layout: post
title: "ecto: Auto abbr/acronym"
time: "21:29:07"
date: 2005-06-27 21:29:07
tags: 
- blogging
- python
- ecto
wordpress_url: http://schinckel.net/2005/06/27/ecto-auto-abbracronym/
---
There are a couple of instances of scripts out there that automatically apply abbr and acronym tags to pages, but I wanted to be able to do the same in ecto. This is also the first time I wrote a plugin script for ecto, and I wanted to do it in python.  Please note that this here script is untested until I get onto my Mac and test the hell out of it. The script works, with the caveat listed in TODO. 
    
{% highlight python linenos %}
    #! /usr/bin/env python
    
    'A script for ecto that adds abbr and acronym tags to the text'
        
    TODO = '''
    Fix it so that acronyms without a space either side (for example,
    that finish a sentence) work.
        
    Lookup on the internet for a list of acronyms/abbreviations?
    '''
        
    acronyms={'WYSIWYG':'What You See Is What You Get',
              'DOM':'Document Object Model'}
    abbrs={'XHTML':'eXtensible HyperText Markup Language',
           'NSLU2':'[Linksys] Network Storage Link (USB) 2.0'}
        
    # Add more values to your hearts content…
    
    # get input data - depends on implementation.  For ecto:
    import sys
    data = open(sys.argv[1]).read()
        
    # replace only the first instance of each acronym/abbreviation
    for each in acronyms:
        data.replace(' '+each+' ', '&lt;acronym title=&quot;'+acronyms[each]+'&quot;&gt;'+each+'&lt;/acronym&gt;',1)
    for each in abbrs:
        data.replace(' '+each+' ', '&lt;abbr title=&quot;'+abbrs[each]+'&quot;&gt;'+each+'&lt;/abbr&gt;',1)
        
    #return data to ecto
    open(sys.argv[1],'w').write(data){% endhighlight %}


**Note:** Comments turned off: too much Spam on this entry. 
