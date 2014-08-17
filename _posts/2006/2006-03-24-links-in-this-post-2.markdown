--- 
wordpress_id: 819
layout: post
title: Links in this Post
time: "23:54:39"
date: 2006-03-24 23:54:39
tags: 
- javascript
wordpress_url: http://schinckel.net/2006/03/24/links-in-this-post-2/
---
I blogged earlier about creating a sidebar entry with all of the links in the current post. The following code snippet will do this: 
    
{% highlight javascript linenos %}
    function createPostLinksBox(){
        if (!getCurrentPost()) return "not a single post page";
        content = getByClass("post-content")[0];
        links = content.getElementsByTagName("A");
        if (!links.length) return "no links in post";
        var placeholder;
        if (!(placeholder=getPlaceholder("outlinks"))) return "no location for outlinks";
        var outlinks = document.createElement('h2');
        outlinks.innerHTML = "Links in this Post";
        var ul = document.createElement('ul');
        for (i=0;i<links.length;i++){
            li = document.createElement('li');
            li.appendChild(links[i].cloneNode(true));
            ul.appendChild(li);
        }
        replaceNode(outlinks,placeholder);    
        outlinks.parentNode.insertAfter(ul,outlinks);
    }
{% endhighlight %}

Note that this must be run after the DOM tree is finalised, and relies on a couple of other functions. I've put `<span id="outlinks">``</span>` into my template, so that this will appear wherever that is, if it's a single post page with any links in it. It will make it into the next update of my script. 

