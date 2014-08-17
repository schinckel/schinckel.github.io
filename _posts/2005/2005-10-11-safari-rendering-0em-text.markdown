--- 
wordpress_id: 485
layout: post
title: Safari Rendering 0em Text.
time: "23:17:52"
date: 2005-10-11 23:17:52
tags: 
- general
wordpress_url: http://schinckel.net/2005/10/11/safari-rendering-0em-text/
---
Safari spits the dummy when it comes across a `text-size:0em;` clause in a CSS file. Which is kind of annoying, as it was nice to have zero-sized text, which naturally doesn't appear, and replace it with an image, which does appear. Saves having to do a `node.style.display = "block";` Oh well. 
