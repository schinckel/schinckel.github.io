--- 
wordpress_id: 484
layout: post
title: Including Another JavaScript
time: "02:12:29"
date: 2005-10-11 02:12:29
tags: 
- javascript
wordpress_url: http://schinckel.net/2005/10/11/including-another-javascript/
---
Most programming languages have some sort of an include/import feature: this allows you to have code in one file and reference it from another. JavaScript doesn't. Most people would say: "Well, just put another `<script src=''>` in the HTML document". Well, that's all well and good, but if I'm creating a framework for others to use, and I want them to have to do as little work as possible, and I'm likely to update the framework in the future, possibly including new features that reference new files, I don't want to have to get them to do this. Especially if the script is located on my server, and they just reference it. This had kept me to working with one monolithic file: at the moment I have around 36,812 characters in that file, and it's getting unmanageable. Just to keep SubEthaEdit's function menu clean, I've been assigning anonymous functions to variables: `var funcname = function () {return "Spaghetti";}` But then, I came across this function: 
    
{% highlight javascript linenos %}
    function include(src){
        if (typeof include[src] == "undefined") {
            include[src] = true;
            document.write("\n<script type=\"text/javascript\" src=\"" + src + "\"></script>");
        }
    }
{% endhighlight %}
    

You can then just use an `include(URI);` call to have the other script executed. It's kind of a hack, but it works, and I like it. Browser independent, too. 
