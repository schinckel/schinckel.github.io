--- 
wordpress_id: 696
layout: post
title: Gravatars on Blogsome
time: "00:40:12"
date: 2006-02-23 00:40:12
tags: 
- blogsome
wordpress_url: http://schinckel.net/2006/02/23/gravatars-on-blogsome/
---
[Gravatar][1]s are now working well on Blogsome: `{$comment->comment_author_email|gravatar:"default":"size":"rating":"border"}` This needs to be inside the `{foreach}` inside _comments.html_ in your template. For example, to use no default image, and limit the size to 40x40 pixels, you'd use: `{$comment->comment_author_email|gravatar:"":"40":"":""}` Notice the double quotes where the argument is missing, and that (in this version) you actually need to include all of the arguments. This may be fixed at some stage. 

   [1]: http://www.gravatar.com/

