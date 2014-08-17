--- 
wordpress_id: 402
layout: post
title: Enclosures
time: "14:36:46"
date: 2005-08-31 14:36:46
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/08/31/enclosures/
---
Podcasting is what all of the kids are doing now: basically, from what I can tell, you just have an enclosure that is part of the post, and RSS readers can automatically download them. Blogsome doesn't really have the ability to upload non-image filetypes (other than by renaming them to have an image-like extension), and anyway file sizes are limited to 300k, but it is possible to have enclosures that are files hosted elsewhere. Anyway, I found a [page ][1]detailing how to set up enclosures, but it wouldn't work for me. It turns out there is an array of arrays, and these need to be stepped through. The code I added to display a link to the enclosure after the post is as follows: 
    
{% highlight html+smarty linenos %}
    {custom_fields}
    {if $enclosure != ''}
        <div class="enclosures">
            {foreach from=$enclosure item=enc}
                <div class="enclosure"><b>Attached Enclosure</b><br />
                    File: <a href="{$enc.0}">{$enc.0}</a><br />
                    Length: {$enc.1} bytes<br />
                    Type: {$enc.2}<br />
                </div>
            {/foreach}
        </div>
        {assign var='enclosure' value=''} <!-- reset enclosure variable again! -->
    {/if}
{% endhighlight %}

The only part I haven't got working yet is the Length and Type fields: they are both blank. I'll work harder.... 

   [1]: http://blogs.linux.ie/xeer/2004/10/11/enclosures-in-wordpress/

