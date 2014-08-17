--- 
wordpress_id: 978
layout: post
title: Cross-browser AJAX
time: "09:57:11"
date: 2006-09-19 09:57:11
tags: 
- javascript
wordpress_url: http://schinckel.net/2006/09/19/cross-browser-ajax/
---
I need a simple wrapper for a Mozilla/Safari and IE compatible `XMLHttpRequest()`. Perhaps something like ([courtesy of Apple][1]): 
    
    
{% highlight javascript linenos %}
    function loadXMLDoc(url,method,readyFunc) {
        req = false;
        if (method) method = "GET";
        // branch for native XMLHttpRequest object
        if(window.XMLHttpRequest) {
            try {
                req = new XMLHttpRequest();
            } catch(e) {
                req = false;
            }
        // branch for IE/Windows ActiveX version
        } else if(window.ActiveXObject) {
            try {
                req = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                try {
                    req = new ActiveXObject("Microsoft.XMLHTTP");
                } catch(e) {
                    req = false;
                }
            }
        }
        if(req) {
            req.onreadystatechange = readyFunc;
            req.open(method, url, true);
            req.send("");
        }
        return req;
    }
{% endhighlight %}
    

   [1]: http://developer.apple.com/internet/webcontent/xmlhttpreq.html

