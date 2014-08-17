--- 
wordpress_id: 522
layout: post
title: globalvar
time: "22:02:42"
date: 2005-10-25 22:02:42
tags: 
- smarty-templates
wordpress_url: http://schinckel.net/2005/10/25/globalvar/
---
Looking through the Blogsome/WPÂµ source, I came across a Smarty function `{globalvar}`. "Righto," I thought, "I'll google that, and see what comes up." My template file was the first thing that did. Okay, what this function does is take a Smarty variable, and make it global in the PHP scope. Used in my template, and most Blogsome ones, it sets the variable `$comment` to be a global one. I haven't come up with another good use for it, but it's nice to know. 
