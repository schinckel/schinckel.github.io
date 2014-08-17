--- 
wordpress_id: 471
layout: post
title: Time Since (...after the fact).
time: "19:44:50"
date: 2005-10-05 19:44:50
tags: 
- languages
- blogsome
wordpress_url: http://schinckel.net/2005/10/05/time-since-after-the-fact/
---
I had noticed lots of blogs had a nice little _Posted x hours, y minutes after the fact_ tag attached to Comments. I thought this was pretty cool, and had a very short attempt at this some time ago. Then, over on [Binary Bonsai][1], Michael [mentioned][2] how the plugin was broken, and how it needs fixing. Well, I didn't fix the PHP version, but I did write a pure Smarty version! 
    
{% highlight html+smarty linenos %}
    {* 
    
    "Time Since" Smarty Code 
    
    Author: Matt Schinckel <matt@schinckel.net>
        http://schinckel.net
    
    Based on a WordPress Plugin "Time Since" 
        http://binarybonsai.com/wordpress/timesince
    
    Notes: Insert this whole text where you want the
    text to appear.  If keen, you could move the first
    pair of lines to a place outside of the comment loop,
    but still inside the post.  This might save some
    precious server seconds.
    
    The accuracy of the 'time since' decreases over time:
    there aren't 30.4 days in every month, for instance.
    
    *}
    
    {capture name=post_time}{the_time d="U"}{/capture}
    {assign var=post_time value=$smarty.capture.post_time}
    
    {capture name=comment_time}{comment_date d='U'}{/capture}
    {assign var=comment_time value=$smarty.capture.comment_time}
    
    
    {assign var=since value=$comment_time-$post_time}
    
    
    {if $since < 3600}
        {assign var=name1 value="minute"}{assign var=sec1 value=60}
        {assign var=name2 value="second"}{assign var=sec2 value=1}
    {elseif $since < 86400}
        {assign var=name1 value="hour"}{assign var=sec1 value=3600}
        {assign var=name2 value="minute"}{assign var=sec2 value=60}
    {elseif $since < 604800}
        {assign var=name1 value="day"}{assign var=sec1 value=86400}
        {assign var=name2 value="hour"}{assign var=sec2 value=3600}
    {elseif $since < 2626560}
        {assign var=name1 value="week"}{assign var=sec1 value=604800}
        {assign var=name2 value="day"}{assign var=sec2 value=86400}
    {elseif $since < 31536000}
        {assign var=name1 value="month"}{assign var=sec1 value=2626560}
        {assign var=name2 value="week"}{assign var=sec2 value=604800}
    {else}
        {assign var=name1 value="year"}{assign var=sec1 value=31536000}
        {assign var=name2 value="month"}{assign var=sec2 value=2626560}
    {/if}
    {math equation='floor(a/b)' a=$since b=$sec1 assign=count1}
    {math equation='floor((a-floor(a/b)*b)/c) a=$since b=$sec1 c=$sec2 assign=count2}
    Posted {$count1} {$name1}{if $count1 != 1}s{/if},
           {$count2} {$name2}{if $count2 != 1}s{/if} after the fact.
{% endhighlight %}
    

   [1]: http://binarybonsai.com
   [2]: http://binarybonsai.com/archives/2005/10/05/time-since-help/

