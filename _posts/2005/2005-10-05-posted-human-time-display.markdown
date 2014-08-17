--- 
wordpress_id: 472
layout: post
title: Posted... (human time display)
time: "21:18:19"
date: 2005-10-05 21:18:19
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/10/05/posted%e2%80%a6-human-time-display/
---
Following on from the previous post, I've also shamelessly poached another idea from Dunstan: human-readable timestamps. Just pop this into your `post.html` file, where you want the 'time' to appear. 
    
{% highlight html+smarty linenos %}
    {capture name=hour}{the_time d="G"}{/capture}
    {assign var=hour value=$smarty.capture.hour}
    Posted
    {if $hour eq "00" or $hour eq "01" or $hour eq "02"}
        in the wee hours,
    {elseif $hour eq "03" or $hour eq "04" or $hour eq "05" or $hour eq "06"}
        terribly early in the morning,
    {elseif $hour eq "07" or $hour eq "08" or $hour eq "09"}
        early in the morning,
    {elseif $hour eq "10"}
        mid-morning,
    {elseif $hour eq "11"}
        late morning,
    {elseif $hour eq "12" or $hour eq "13"}
        mid-morning,
    {elseif $hour eq "14"}
        early afternoon,
    {elseif $hour eq "15" or $hour eq "16"}
        mid-afternoon,
    {elseif $hour eq "17"}
        late afternoon,
    {elseif $hour eq "18" or $hour eq "19"}
        early evening,
    {elseif $hour eq "20" or $hour eq "21"}
        evening,
    {elseif $hour eq "22"}
        late evening,
    {elseif $hour eq "23"}
        late at night,
    {/if}
{% endhighlight %}
    
