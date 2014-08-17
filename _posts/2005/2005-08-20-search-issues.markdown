--- 
wordpress_id: 375
layout: post
title: Search issues
time: "21:38:12"
date: 2005-08-20 21:38:12
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/08/20/search-issues/
---
Bug: if you search on this blog, it only searches within the currently active 'group', whether that's a category, day or post, or the whole blog. The code in question is: 
    
{% highlight html linenos %}
    <form id="searchform" method="post" action="{$Smarty.server.PHP_SELF}">
        <div style="text-align:center">
            <p><input type="text" name="s" id="s" size="20" /></p>
            <p><input type="image" src="/images/search.png" name="submit" value="Search" /></p>
        </div>
    </form>
{% endhighlight %}

Obviously, the important part is the `{$Smarty.server.PHP_SELF}` section. Setting it to `{$Smarty.server.SERVER_NAME}` or several other things seems to make no difference! 
