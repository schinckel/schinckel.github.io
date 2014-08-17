--- 
wordpress_id: 400
layout: post
title: Blogsome Page Templates
time: "12:59:58"
date: 2005-08-31 12:59:58
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/08/31/blogsome-page-templates/
---
(This is an extension on the previous post). One of the major drawbacks of Blogsome is the handling of _Pages _is not complete. You can create and manage Pages, but the display of them is sub-standard: there is no page.html template file as there is for _Posts _(post.html). However, I have figured out a stop-gap method of running pages through a template.  I tried first to do this by adding a _Custom Field_, as noted in the WordPress Codex, called `_wp_page_template`, and setting this value to `post.html`. This did not work, mainly (as far as I could tell) because the value did not 'stick'. This seems to be a known issue with WordPress 1.5.1. I was able to get enclosure Custom Fields to work (almost: they only ever appeared to be an Array). The next way I figured out how to do it was by finding a variable that has a different value when a Page is being rendered, as opposed to a Post or Index, or Category, or Archive. The variable I discovered is `{$smarty.server.SCRIPT_NAME}`. This appears as `'/wp-inst/pages'` or `'/wp-inst/index.php'` under Blogsome. Fantastic! My next step was to have the following code where `{$content}` used to be in the Main Page Template: 
    
{% highlight html+smarty linenos %}
    {if $smarty.server.SCRIPT_NAME == '/wp-inst/pages'}
        {assign var=page value=true}
        {capture name=the_content}{$content} {/capture}
        {include file='post.html'}
    {else}
        {assign var=page value=false}
        {$content}	
    {/if}
{% endhighlight %}

The first line, the `{if}` clause, finds out if it is indeed a page. The second line assigns 'true' to the variable `{$page}`, just as a way of making it less cumbersome to test again later. The third line stores the text that would normally appear in the body of the Page into the variable `{$smarty.capture.the_content}`. This will be used in place of `{$the_content}` in the `post.html` template. The fourth line puts the contents of the `post.html` file into the HTML stream. Just to be safe, I set the value of `{$page}` to false before the `post.html` file gets called normally by the `{$content}` tag. Then, in the `post.html` template file, I added the following code: 

  * Where the content needs to go: `{if $page == 'true'}{$smarty.capture.the_content}{$content}{/if}{the_content}` There is no `{else}` required here, as `{the_content}` has no value.
  * Where the Post Title normally is, I made it: `<a href="{if $page == 'true'}{$Smarty.server.PHP_SELF}{else}{permalink_link}{/if}" rel="bookmark" title="Permanent Link: {if $page == 'true'}{single_post_title}{/if}{the_title_rss}">{if $page == 'true'}{single_post_title}{/if}{the_title}</a>` Basically, this replaces `{permalink_link}` by the URL of the current Page. I'll have a bit of a think about how multi-page documents work if I can get them working. It replaces the `{the_title}` value by `{single_post_title}`, which works quite nicely.
  * I also made it so that the Date information is replaced by a Non-Breaking Space - in my template this means that a nice coloured box appears where the Date normally goes: this box is too small otherwise. `{if $page == 'true'}&nbsp;{/if}` The date data will be empty, so this should work okay.
  * Finally, I used `{if $page != 'true'} ... {/if}` to remove information that was not pertinant to a Page, such as the Post time, number of comments, category and so on. I also needed to have the `{edit_post_link}` skipped in this manner.

I have not yet made comments work properly: I'm not sure that this can be done with this hack, but they will not appear if you just do the things I've shown above. If you `{include file=comments.html}`, you will get the Comment Closed Notification. 
