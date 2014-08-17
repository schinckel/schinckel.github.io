--- 
wordpress_id: 924
layout: post
title: Access Database Gripes
time: "10:08:37"
date: 2006-08-22 10:08:37
tags: 
- rants-and-raves
- asides
wordpress_url: http://schinckel.net/2006/08/22/access-database-gripes/
---
I have an application where I need to have categories, and each category can have a parent category. However, I can't do this in Access using one table, as tables cannot have entries that refer to items in themselves. So, I'll need to have a Category table, and also a Category Parents table, which has the relationships in it. Bah. 
