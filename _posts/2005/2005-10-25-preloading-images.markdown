--- 
wordpress_id: 518
layout: post
title: Preloading Images
time: "11:08:55"
date: 2005-10-25 11:08:55
tags: 
- general
- javascript
wordpress_url: http://schinckel.net/2005/10/25/preloading-images/
---
Apparently, it's possible to use JavaScript to preload images. `checked = new Image(); checked.src = "/images/true.gif"; unchecked = new Image(); unchecked.src = "/images/false.gif";` This is better than doing the CSS trick `display:none;`, as this doesn't always preload in every browser. 
