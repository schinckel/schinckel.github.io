--- 
wordpress_id: 197
layout: post
title: RSS icons as CSS code.
time: "12:58:03"
date: 2005-06-01 12:58:03
tags: 
- web-design
wordpress_url: http://schinckel.net/2005/06/01/rss-icons-as-css-code/
---
I found a few sites around that give instructions on how to use CSS code to create those classy RSS icons. Using CSS is good for a couple of reasons - if you decide to change the style you only need to do it once, even if the code was used in a post, or page, not just a template. Secondly, some people live some of their life behind crappy corporate firewalls that block images from certain sources, and people using text-only browsers, or using text-to-speech features, will still be able to view what it was you intended them to see. This is what I have in my stylesheet: 
    
    
{% highlight css linenos %}
    .rss
    {
        color:#FFFFFF;
        background-color:#FF6600;
        border-color:#FF6600;
        border-style:outset;
        text-decoration:none;
        margin:2em 0em 0em 0em;
        padding:0em 0.5em 0em 0.5em;
        border-width:1px;
        font-family:Arial;
        font-size:0.8em;
    }
    .rss:hover
    {
        background-color:#FF9900;
    }
    .rss:active
    {
        border-style:inset;
    }
{% endhighlight %}
    

Then, whenever or wherever you have a link that needs to look like an RSS button, just use `class="rss"` inside the `a` tag, and it will look classy! It is also possible to format a whole paragraph using a `p` tag with the `class="rss"`. If it doesn't work, then it's likely that another CSS statement is vying with the class tag for precedence - for instance if your links are inside the sidebar, as part of a list, then the list, sidebar and a tags from the CSS may take precedence. In my case, removing the links from the list item (leaving them in the unordered list to keep positioning) fixed the problem. Note: I was originally using `#rss` in the stylesheet, and `id="rss"` in the pages, but should have been using `.rss` and `class="rss"` to be more compatible. The one I was using is intended that each tag appears only once in a document, I think. 
