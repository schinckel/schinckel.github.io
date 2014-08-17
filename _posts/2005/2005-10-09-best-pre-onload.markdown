--- 
wordpress_id: 481
layout: post
title: Best pre-onload
time: "20:38:01"
date: 2005-10-09 20:38:01
tags: 
- javascript
wordpress_url: http://schinckel.net/2005/10/09/best-pre-onload/
---
I've been using `domFunction()` to determine whether it's safe to do all of my DOM modification code, but with some testing, I noticed that some pages were causing Firefox to eat up huge amounts of CPU time. I tracked the error down to the domFunction call, as it uses `setInterval()` to run a function every _n_ seconds. This in itself is nice to know (I was looking for a similar feature a couple of days ago), but the nice part is that it has a stopping function: `clearInterval()`. You are supposed to use it like this: 
    
{% highlight html linenos %}
    timer = setInterval("Function();", interval);
{% endhighlight %}

This will then call the function Function every interval milliseconds. Neato. Except I only want a particular thing to happen once. So, as a part of my code, I was calling `clearInterval(timer)` inside a function called by Function. 
    
{% highlight javascript linenos %}
    function Startup(){
        Gravatars();
        .
        .
        .
        HumanTimePosts();
        
        clearInterval(timer);
    }
        
    //Code for all functions in here.
        
    timer = setInterval(function(){
        if (document.getElementById(\"footer\")){
            Startup();
        }
    }, 1000);
{% endhighlight %}
    

Which should work. Except for some reason, calls to clearInterval cannot come from inside functions called by setInterval. Or something like that. My next solution was to use: 
    
{% highlight javascript linenos %}
    function checkDOM(){
        if (getById("footer")||getById("credit")) Startup();
        else setTimeout("checkDOM();",100);
    }
    setTimeout("checkDOM();"
{% endhighlight %}

Which solves the problem, but it ugly. Finally, I came across this little number: 
    
{% highlight javascript linenos %}
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", Startup, null);
    }
{% endhighlight %}

This only works with Mozilla browsers, so for the time being I've combined the last two. 
