--- 
wordpress_id: 1220
layout: post
title: "appscript: Is application running?"
time: "21:33:06"
date: 2007-07-22 21:33:06
tags: 
- python
wordpress_url: http://schinckel.net/2007/07/22/appscript-is-application-running/
---
This is the best way I can find to test if an application is running under appscript: 
    
{% highlight python linenos %}
    try:
        app('System Events').processes['AppName']()
    except:
        print 'Application AppName is not running'
{% endhighlight %}

I think it's kinda neat. I'd like to know of a better method, but I looked pretty hard! 

[Burn Down The Mission (Live)][1] • [Elton John][2] • [Live In Australia][3] ★

   [1]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Burn+Down+The+Mission+(Live)&artistTerm=Elton+John
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Elton+John
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Live+In+Australia&artistTerm=Elton+John

