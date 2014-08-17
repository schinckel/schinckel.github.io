--- 
wordpress_id: 784
layout: post
title: Performancing Metrics
time: "23:57:00"
date: 2006-03-15 23:57:00
tags: 
- blogging
- performancing-metrics
wordpress_url: http://schinckel.net/2006/03/15/performancing-metrics/
---
I've implemented [Performancing Metrics][1] on this blog. I used the following code: 
    
{% highlight html+smarty linenos %}
        {capture name=cats}{the_category_rss}{/capture}
        <script type="text/javascript">
            z_post_title="{single_post_title}{single_cat_title}{single_month_title}";
            z_post_category="{$smarty.capture.cats|strip_tags|strip}";
        </script>
        <script id="stats_script" type="text/javascript" src="http://metrics.performancing.com/wp.js"></script>
{% endhighlight %}

Instead of the code given by the system. 

   [1]: http://performancing.com/

