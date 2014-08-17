--- 
wordpress_id: 537
layout: post
title: Category Pages
time: "15:51:23"
date: 2005-11-02 15:51:23
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2005/11/02/category-pages/
---
I want to add some functionality to my site. I used to just have a few categories, but as I wrote more, I wanted to sub-categorize a bit. So now, I have a handful of parent categories, and under (most of) these I have one or more child categories. In some cases this goes three or four deep. But, so the category list isn't too long, I only show the parent categories in the sidebar. What I want is that when a category page is shown, at the top is a list of the child categories. I can (relatively) easily find out if I am viewing a category page: `{if $smarty.server.REQUEST_URI|truncate:10::1 == '/category/'}` I can also quite easily find the name of the category, but not the id. This is what I need for creating the category list.  I've just had a thought. _Checks something_. The following displays the info that is sent to the server: `{foreach from=$smarty.server.argv item=var} {$var} {/foreach}` I was hoping it would give the category id. But it doesn't, only the name. Back to the drawing board. 
