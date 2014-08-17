--- 
wordpress_id: 296
layout: post
title: iTunes "Now Playing" CSS
time: "10:26:37"
date: 2005-07-29 10:26:37
tags: 
- itunes
- blogging
wordpress_url: http://schinckel.net/2005/07/29/itunes-now-playing-css/
---
A while ago, I played around with my site StyleSheet, and set it up so that a paragraph of text with the class iTunes had a little icon placed next to it. This seems to have stopped working. Must look into it.  Edit: I fixed it. Originally the code was: 
    
{% highlight css linenos %}
    .itunes:before
    {
            content:url('/images/itunes.gif');
    }
{% endhighlight %}

I changed it to: 
    
{% highlight css linenos %}
    .itunes
    {
    	background:url('/images/itunes.gif') no-repeat;
            text-indent:16px;
            font-size:0.8em;
    }
{% endhighlight %}
