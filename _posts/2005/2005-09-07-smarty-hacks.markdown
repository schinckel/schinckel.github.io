--- 
wordpress_id: 408
layout: post
title: Smarty Hacks
time: "20:49:38"
date: 2005-09-07 20:49:38
tags: 
- smarty-templates
wordpress_url: http://schinckel.net/2005/09/07/smarty-hacks/
---
While trying to solve someone elses problems, I came across the following: If you call `{have_posts}`, this will return a number as long as you are not on the last post to be displayed on the page. This is a standard WP function, but it is interesting to see it works under WP-MU. `{the_post}` will increment the post counter: basically skip a post, but will cause SQL errors. • My biggest hassle so far is that it doesn't seem to be possible to assign stuff created by template tags to variables, other than by the very ugly `{capture name=foo}{bar}{/capture}` ; `{$smarty.capture.foo}` trick, which doesn't work for Arrays: it just sets `$smarty.capture.foo` to 'Array', not very much use at all. `{section}` might be promising, but I doubt it: `{foreach value=get_the_category item=each}{$each}{/foreach}` just returns 'get_the_category'. 
