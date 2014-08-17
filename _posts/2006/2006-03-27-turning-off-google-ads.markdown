--- 
wordpress_id: 826
layout: post
title: Turning off Google Ads
time: "16:44:20"
date: 2006-03-27 16:44:20
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/03/27/turning-of-google-ads/
---
Michael, over at Binary Bonsai, has written about how he turns off Google Ads (or any other type of text) for readers who have commented. [No Ads for Regulars at Binary Bonsai][1] Here's how to do the same thing at Blogsome, using Smarty Tags. Just before your Ad Block: `{if $comment_author == ""}` And then after, use: `{/if}` Then, readers who have commented on your blog won't see your Advertisement(s). This only seems to work on a Post page. For some reason the cookie isn't checked on other pages. I'm still looking into this. 

   [1]: http://binarybonsai.com/archives/2006/03/26/dont-bug-your-regulars-with-ads/

