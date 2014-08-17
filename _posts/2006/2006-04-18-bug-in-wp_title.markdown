--- 
wordpress_id: 871
layout: post
title: Bug in {wp_title}
time: "22:02:58"
date: 2006-04-18 22:02:58
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/04/18/bug-in-wp_title/
---
This is actually a bug I've come across in other contexts, but the tag `{wp_title}` has a bit of a bug. When a category is selected, it returns a reasonable value (the title of the category). Ditto for an individual post. However, with a date archive, the value is not as expected. A daily archive is fine, although I don't like the format: _Captain Obvious » 2005 » October » 16.10.05_ It doesn't seem to be possible to alter this, other than the separator: `{wp_title sep="•"}` But it gets worse. If a monthly or yearly archive is chosen, the date of the last post to be displayed will also be presented: _Captain Obvious » 2005 » 13.08.05_ Note that this is the last post on the page, not the first post. IIRC, normal Wordpress would be the other way around. Instead, what I use is: 
    
{% highlight html+smarty linenos %}
    <title>
        {bloginfo show="name"}
        {single_post_title prefix=" &raquo; "}
        {single_cat_title prefix=" &raquo; Category: "}
        {if $smarty.request.name == ""}
            {single_month_title prefix=" &raquo; "}
        {/if}
        {if $smarty.request.s != ""}
             &raquo; Search: {$smarty.request.s}
        {/if}
    </title>
{% endhighlight %}

This has the bonus of also noting when it's a Search. 
