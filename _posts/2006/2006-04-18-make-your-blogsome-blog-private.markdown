--- 
wordpress_id: 870
layout: post
title: Make your Blogsome Blog Private
time: "20:51:19"
date: 2006-04-18 20:51:19
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/04/18/make-your-blogsome-blog-private/
---
It's possible to create a private post within Blogsome, but not a whole private blog. However, if you turn off allowing registration, you can make your blog private. In your Main Page template, find the line that has `{$content}` on it. Just before the line, insert the following lines: `{capture name=loginout}{wp_loginout}{/capture} {if $smarty.capture.loginout|strip_tags:'0' == "Logout"}` And then, after it, insert the following lines: `{else}     <p>This Blog is Private. Please {wp_loginout} before continuing</p> {/if} ` This will then prevent non logged-in users from viewing your posts. 
