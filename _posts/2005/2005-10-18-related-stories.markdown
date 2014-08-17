--- 
wordpress_id: 506
layout: post
title: Related Stories.
time: "19:09:16"
date: 2005-10-18 19:09:16
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2005/10/18/related-stories/
---
After hacking through the source, I finally figured out how to make `{relatedstories}` work. The trick is that it stores the date in a variable called `$relatedstories`. 
    
{% highlight html+smarty linenos %}
    {relatedstories}
    {if $relatedstories}
      <h2>Related Stories</h2>
      <ul>
      {foreach from=$relatedstories key=key item=story}
        <li> <a href="{get_permalink id=$story->ID}" >
            {$story->post_title}</a>
        </li>
      {/foreach}
      </ul>
    {/if}
{% endhighlight %}

I've got it set up in my sidebar at the moment. It's smart enough to figure out when it's not a single post page, and won't show then, so you don't need any fancy extra Smarty Tags to only show in single post view. Oh, and it also sets the variable `$relatedstoriesWords`, so it's possible to do something like: `<h2 title="{$relatedstoriesWords}">Related Stories</h2>` and when you hover over the title, it tells you the words it's looking for. I'm still working on how to truncate the title. `{$story->post_title|truncate}` fails dismally. Quite annoying. 
