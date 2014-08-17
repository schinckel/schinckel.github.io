--- 
wordpress_id: 399
layout: post
title: Blogsome Pages
time: "22:51:07"
date: 2005-08-30 22:51:07
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/08/30/blogsome-pages/
---
It's no secret the Blogsome doesn't have working Page Templates. The following code snippet is a starter on formatting of Pages like Posts: 
    
{% highlight html+smarty linenos %}
    {if $smarty.server.SCRIPT_NAME == '/wp-inst/pages'}
        <!-- Do Stuff Here -->
    {/if}
{% endhighlight %}

At the moment, I've only figured out how to get the content to appear twice (!), but it's a start: it only occurs with Pages! **Update**: I've got it working. It's a bit ugly at the moment, and I'll probably redo it with a function, but, still it works. See the Contact and About Pages in the Menubar for examples! 
