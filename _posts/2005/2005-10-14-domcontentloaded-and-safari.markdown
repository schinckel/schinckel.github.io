--- 
wordpress_id: 490
layout: post
title: DOMContentLoaded and Safari
time: "10:09:39"
date: 2005-10-14 10:09:39
tags: 
- javascript
wordpress_url: http://schinckel.net/2005/10/14/domcontentloaded-and-safari/
---
Often, you will want some scripts to run when the page has loaded, even if the images on it haven't. I wrote up some stuff about this under [Best pre-onload][1]. My full onDOMReady script looks like: 
    
{% highlight javascript linenos %}
    //Main Startup Code
    
    function checkDOM(){
        if (document.getElementById("footer")
         || document.getElementById("credit")) 
            Startup();
        else
            setTimeout("checkDOM();",100);
    }
    
    if (document.addEventListener)
        document.addEventListener("DOMContentLoaded", Startup, null);
    else 
        setTimeout("checkDOM();",100);
{% endhighlight %}
    

However, Safari will not load pages that use this, since it has `document.addEventListener`, but does not create `DOMContentLoaded` events. So, I had to create a nasty little browser check rule: 
    
{% highlight javascript linenos %}
    if (document.addEventListener && (navigator.vendor != "Apple Computer, Inc."))
{% endhighlight %}
    

I'd rather not have to do things like this. [Why not?][2]

   [1]: http://schinckel.net/2005/10/09/best-pre-onload/
   [2]: http://www.quirksmode.org/js/support.html

