--- 
wordpress_id: 827
layout: post
title: "JavaScript Snippet: Get Trackback URL"
time: "17:03:49"
date: 2006-03-27 17:03:49
tags: 
- javascript
- asides
wordpress_url: http://schinckel.net/2006/03/27/javascript-snippet-get-trackback-url/
---
Here's a nice little bit of JavaScript that grabs the Trackback URI of the current post. I'm not quite sure how to use it yet. It would be nice to be able to automatically add this to the BlogThis link, but there's no way to do so, since cross-site scripting is disabled. 
    
{% highlight javascript linenos %}
    document.body.innerHTML.split("trackback:ping=\"")[1].split("\"")[0];
{% endhighlight %}

The other thing that might be cool is to copy this to the clipboard, but I'm a bit loath to do things like that which are "invisible" to a user. 
