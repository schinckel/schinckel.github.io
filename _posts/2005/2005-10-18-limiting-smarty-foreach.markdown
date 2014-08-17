--- 
wordpress_id: 507
layout: post
title: Limiting Smarty {foreach}
time: "20:20:58"
date: 2005-10-18 20:20:58
tags: 
- smarty-templates
wordpress_url: http://schinckel.net/2005/10/18/limiting-smarty-foreach/
---
A user on the Blogsome forums wanted to be able to reduce the number of items that appeared in a Smarty generated list. Since the original code was using `{foreach}`, and I know `{section}` has a `max=n` attribute, I thought I'd try that. The problem was that the Array in question: `{popularposts}` generates `$pposts`; is not an array that can be accessed by indices. It's key instead is the number of hits on the pages, so that's not much good to us. However, it's possible to use a simple `{if}` clause, and the `{counter}` function, to _effectively _limit the number of iterations. 
    
{% highlight smarty linenos %}
    {counter assign=idx print=0}
    {foreach from=$array key=key item=item}
        {counter}
        {if $idx < = n}
            Data to be repeated goes in here.
        {/if}
    {/foreach}
{% endhighlight %}

Replacing _n_ with a number will cause _n-1_ iterations to be displayed. I said effectively above, as the other iterations will actually occur, but no data will actually be printed on the screen, as there is no `{else}` clause. 
