--- 
wordpress_id: 354
layout: post
title: Adium & Camino
time: "23:14:11"
date: 2005-08-14 23:14:11
tags: 
- adium
- applescript
wordpress_url: http://schinckel.net/2005/08/14/adium-camino/
---
I'm a latecomer to Instant Messaging. I've only just discovered it, and part of that is because I don't have many people to talk to over it. I have written one thing though, and that's an improvement to megalogeek's `%_camino` script. You can download it from [Adium Xtras: Camino Current Page][1]. Source follows after the jump! 

{% highlight applescript linenos %}
on substitute()     
    tell application "Camino"         
        URL of window 1         
        set myURL to the result         
        set myTitle to name of window 1     
    end tell     
    return "<HTML><A HREF=\"" & myURL & "\">" & myTitle & "</A></HTML>" 
end substitute
{% endhighlight %}

   [1]: http://www.adiumxtras.com/index.php?a=xtras&xtra_id=1891

