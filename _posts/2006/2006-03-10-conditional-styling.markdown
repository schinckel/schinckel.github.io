--- 
wordpress_id: 745
layout: post
title: Conditional Styling
time: "22:41:44"
date: 2006-03-10 22:41:44
tags: 
- smarty-templates
- web-design
wordpress_url: http://schinckel.net/2006/03/10/conditional-styling/
---
I have an [Asides][1] category, posts in which appear differently on my site. That's all well and good, but I want these posts to appear normally if viewing the Asides category, or an individual Asides post. So, I need to be able to style stuff differently depending on a couple of factors. The most obvious method for this would be to have CSS changing if certain conditions are met. However, in practice this seems to be somewhat difficult. You cannot access the equivalent of a DOM tree in CSS. You can add new entries to a style description, but not find out much real information about the current styles.  Approaching this from the other direction, however, looks to be more promising. Especially if you examine the code I use to style differently to begin with: 
    
{% highlight html+smarty linenos %}
    <div class="post {is_aside}{if $is_aside=='true'}Asides{/if}" id="post-{the_ID}">
{% endhighlight %}

This snippet could be used to have different styles for any category, using something like: 
    
{% highlight html+smarty linenos %}
    <div class="post {the_category seperator=' '}" id="post-{the_ID}">
{% endhighlight %}

I'm not examining now the mechanics of how to change these styles, as that can be found in another post on my site: [Styling Asides Differently][2]. To remove the Aside class entry, I've restructured my post.html file to start with: 
    
{% highlight html+smarty linenos %}
    {is_aside}
    {if $smarty.server.REQUEST_URI|truncate:17:'':1 == '/category/asides/'}
        {assign var=is_aside value=false}
    {/if}
    
    <div class="post {if $is_aside=='true'}Asides{/if}" id="post-{the_ID}">
{% endhighlight %}

But how do we find out if we are viewing a single post? One easy method is to test using the `{single_post_title}` function: 
    
{% highlight html+smarty linenos %}
    {capture name=title}{single_post_title}{/capture}
    {if $smarty.capture.title != ''}
        {assign var=is_aside value=false}
    {/if}
{% endhighlight %}

Bingo. All Done. My Mum is right. I _am_ a star. 

   [1]: /category/asides/
   [2]: http://schinckel.net/2006/03/05/styling-asides-differently/

