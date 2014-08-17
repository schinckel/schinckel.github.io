--- 
wordpress_id: 421
layout: post
title: Using CSS to replace tables.
time: "20:32:43"
date: 2005-09-13 20:32:43
tags: 
- blogging
wordpress_url: http://schinckel.net/2005/09/13/using-css-to-replace-tables/
---
Using some classy CSS, you can make text flow nicely around images, rather than having to set stuff up using tables, and demonstrated in [this post][1]. Basically, you just put the following into your CSS file: 
    
{% highlight css linenos %}
    .left {
        float:left;
    }
    
    .right {
        float:right;
    }
{% endhighlight %}

And then wrap the image in `<div class='left'> ... </div>` tags (or `class='right'` to make it sit on the right of the text). You can use `margin:15 0 15 25;` for example to put a margin of 15 on the top, 0 on the right, 15 on the bottom and 25 on the left, so that the text does not come right up against the image. I also change some text properties in my CSS, so I can include a caption inside the `<div class='left/right'> ... </div>` tags and it will be italic, centred and so on. I'll leave these as an exercise to the reader. If you just use the code above, you can also use this whenever you have post-links, or page-links, so that one always appears on the left, and the other on the right. I have now removed every table from the site, except the one on the page this article links to. 

   [1]: http://schinckel.net/2005/05/28/images-other-than-inline/

