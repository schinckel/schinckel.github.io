--- 
wordpress_id: 828
layout: post
title: Human Age Smarty Modifier
time: "20:36:20"
date: 2006-03-27 20:36:20
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/03/27/human-age-smarty-modifier/
---
The Smarty Modifier ["Human Age"][1] works well under Blogsome, I'll ask the admins to install it. It's used like: 
    
{% highlight smarty linenos %}
    {capture name=pdate}{the_time d="U"}{/capture}
    {capture name=cdate}{comment_date d="U"}{/capture}
    {assign var=since value=$smarty.capture.pdate|human_age:$smarty.capture.cdate:true:2}
{% endhighlight %}

Then, where you want the data to go: `{$since} after the fact.` **Note:** _this is not installed on the main Blogsome server yet._ However, you can already use: `{human_time_diff from=$smarty.capture.pdate to=$smarty.capture.cdate}` after having captured the dates. It isn't quite as nice as the other version, as it only displays minutes/hours/days, but it will do for now. 

   [1]: http://smarty.incutio.com/?page=HumanAge

