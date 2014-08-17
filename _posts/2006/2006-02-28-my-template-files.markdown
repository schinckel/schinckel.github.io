--- 
wordpress_id: 706
layout: post
title: My Template Files
time: "19:07:36"
date: 2006-02-28 19:07:36
tags: 
- blogsome
wordpress_url: http://schinckel.net/2006/02/28/my-template-files/
---
Chris Legend is using some files from my templates: mainly the guts of my Comments.html page. This is all well and good, but because I have customised the guts out of my site, there are some caveats. The first is that my Comments.html relies on a certain JavaScript to be called before it allows any Comments. That is, if you just use this file from my template, noone will be able to comment at all on your blog. I had to write this post, as I can't find another way to let Chris know! To fix this, you either need to edit the template page, and put the following into the action field: `"/wp-comments-post.php"`. **If you don't do this, no one can comment on your blog.**
