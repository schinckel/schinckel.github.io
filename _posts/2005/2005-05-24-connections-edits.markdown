--- 
wordpress_id: 187
layout: post
title: Connections Edits
time: "22:56:04"
date: 2005-05-24 22:56:04
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2005/05/24/connections-edits/
---
Yay! I've fixed the Search function so it works. I hadn't changed the action tag to read `"{$Smarty.server.PHP_SELF}"`, which it needed to be in order to work. What I want to do now is make the previous and next page links not have the words _previous post_, and _next post_, just the title and the double-arrows. Also, the Latest Posts does not seem to be updating...I'll try to fix this. 
