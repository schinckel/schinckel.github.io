--- 
wordpress_id: 680
layout: post
title: Post Titles and non-Latin characters
time: "13:00:43"
date: 2006-02-15 13:00:43
tags: 
- blogsome
wordpress_url: http://schinckel.net/2006/02/15/post-titles-and-non-latin-characters/
---
One of the most common issues we see on the Blogsome Forums is when a user tries to post an article that has non-latin characters in the title. I found I had done this, with a recent post without realising this. What I propose is a change to the Blogsome code that either just strips out the extended characters, or replaces them by similar characters. It could convert any of the characters: `Ã Ã¡Ã¢Ã£Ã¤Ã¥` into `a`, for instance, and `Ã¦` into `ae`. For others, it could either convert `Â²` into `2` or `squared`. I'm guessig a simple function could be rolled to do this, or even found out there already on the Internet. 
