--- 
wordpress_id: 746
layout: post
title: Fixing Generated Invalid XHTML
time: "23:17:46"
date: 2006-03-10 23:17:46
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/03/10/fixing-generated-invalid-xhtml/
---
I had a standard Smarty function, `{list_cats}`, that under certain circumstances generates invalid XHTML. Specifically, when a `feed_image` is supplied, not alt tag is generated. This annoys me, as I have worked hard to make my template generate "nice" code. Smarty to the rescue. Whilst you cannot pass the results of a Smarty function through a Smarty filter, like `replace`, you can capture the results, and then pass this through the filter: 
    
{% highlight html+smarty linenos %}
    <h2><a href="/categories/">Main Categories</a></h2>
    <ul>
        {capture name=cats}{list_cats optionall='1' all='All' sort_column='name' optioncount='0' children='0' hierarchical='1' feed_image='/images/feedicon10x10.gif'}{/capture}
        {$smarty.capture.cats|replace:"/></a>":"alt='Live Bookmark (RSS Feed)' /></a>"}
    </ul>
{% endhighlight %}

By the way, I used a similar technique to convert a list of (list) items into a list of selects: 
    
{% highlight html+smarty linenos %}
    <h2>Links Dropdown</h2>
    <ul>
        <li><form name="linksform" action="" method="post" style="margin: 0px; padding: 0px;">
            <select id="link_list">
            <option value=''>Select Link to View</option>
            {capture name="linklist"}{get_links}{/capture}
            {$smarty.capture.linklist|replace:'<a':'<option'|replace:'</a><br />':'</option>'|replace:'href':'value'}
            </select>
            <input type="button" class="button" value="Go" onclick="window.location = (document.forms.linksform.link_list[document.forms.linksform.link_list.selectedIndex].value);" />
        </form></li>
    </ul>
{% endhighlight %}
