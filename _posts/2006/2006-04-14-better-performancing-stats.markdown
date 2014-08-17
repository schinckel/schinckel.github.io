--- 
wordpress_id: 857
layout: post
title: Better Performancing Stats
time: "15:36:50"
date: 2006-04-14 15:36:50
tags: 
- blogsome
- smarty-templates
- performancing-metrics
wordpress_url: http://schinckel.net/2006/04/13/better-performancing-stats/
---
This is a Blogsome specific version of the post that can be found at [Hack Metrics for More Detail][1]. The default script that I modified to generate Performancing Metrics stats for my Blogsome blog has some pretty serious limitations. The main one is that there is no differentiation between single posts, and the various types of archive pages that can be view: Category, Author, and Date (which includes Yearly, Monthly and Daily archive pages).  To overcome this, I've come up with the following rationale: 

  * Test to see if it's a Page. Set the title to the Page title, and the category to "Page".
  * Test to see if it's the Homepage. If so, the title should be "Homepage", as should the category. I've also been thinking about whether to append the title of the newset post, which would then enable some idea of how often the front page is viewed with particular posts. Then, using the category "Homepage" would enable me to still see how many homepage views there are in total. This is turning out to be harder than expected, due to some apparent malfunctioning of `{rewind_posts}`.
  * Test to see if it's a category page. This should have the title and the category both set to the category name.
  * Test to see if it's a date archive page. If it is, set the category to Archive, and the title to the date. Be a bit clever, and have different titles for Monthly, Daily and Yearly archives.
  * Test to see if it's a search page. If so, set the category to Search, and the title to the search terms, prefixed by Search:.
  * Finally, it must be a single post page. Set the title to the post title. This is where the system breaks a little, as there doesn't seem to be the ability to have multiple categories. This seems to be a limitation of performancing metrics.

Anyway, here's the code: 
    
{% highlight html linenos %}
        <script type="text/javascript">
            {if $smarty.server.SCRIPT_NAME == "/wp-inst/pages"}
                z_post_title="{single_post_title}";
                z_post_category="Page";
            {elseif $smarty.server.REQUEST_URI == "/"}
                z_post_title="Homepage"; // ({rewind_posts}{the_title}) {* Fix - gets last post title, not first *}
                z_post_category="Homepage";
            {elseif $smarty.server.REQUEST_URI|truncate:10:"":1 == "/category/"}
                z_post_title="{single_cat_title}";
                z_post_category="{single_cat_title}";
            {elseif $smarty.request.s != ""}
                z_post_title = "Search: {$smarty.request.s}";
                z_post_category = "Search";
            {elseif $smarty.request.name == ""} {* Date Archive Page *}
                {if $smarty.request.day != ""} {* Daily Archive *}
                    z_post_title="{$smarty.request.day}{single_month_title prefix=' '}";
                {elseif $smarty.request.monthnum != ""} {* Monthly Archive *}
                    z_post_title="{single_month_title prefix=' '}";
                {else} {* Must be a Yearly Archive then! *}
                    z_post_title="{$smarty.request.year}";
                {/if}
                z_post_category="Archive";
            {else} {* Single Post, or unknown *}
                z_post_title="{single_post_title}";
                {capture name=cats}{the_category seperator=","}{/capture}
                {assign var=cats value=$smarty.capture.cats|strip_tags:false|replace:', ':'","'}
                z_post_category=Array("{$cats}");
                z_post_category="{$smarty.capture.cats|strip_tags:false}"; //Remove _this_ when performancing is fixed.
            {/if}
            //z_user_name=_"{$smarty.capture.author}"_;
            //z_user_email=_"{$smarty.capture.author_email}"_;
        </script>
        <script id="stats_script" type="text/javascript" src="http://metrics.performancing.com/wp.js"></script>
    
{% endhighlight %}

This may change at any time, as I tweak it and so on. Visit my Template page for the most recent version (click on Main Page, and then scroll down to the bottom). 

   [1]: http://performancing.com/node/2046

