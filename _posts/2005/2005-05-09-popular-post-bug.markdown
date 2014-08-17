--- 
wordpress_id: 156
layout: post
title: Popular Post Bug
time: "13:21:02"
date: 2005-05-09 13:21:02
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2005/05/09/popular-post-bug/
---
I have the following code to display my most popular posts in the sidebar: ` {popularposts} {if $pposts != ''}   <h2>Most Popular Posts</h2>     <ul>     {foreach from=$pposts key=key item=hits}       <li><nobr><a href="{get_permalink id=$hits.postID}" title="{$hits.title}">{$hits.title|truncate:25:"..."}</a>: {$key}</nobr></li>     {/foreach}     </ul> {/if} ` However, it doesn't work: the links are all to the least recent of my recent posts the last post on the page. I'll have to fix this. (Note: a fix is in the comments).
