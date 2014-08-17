--- 
wordpress_id: 785
layout: post
title: Safari Font Display
time: "00:08:19"
date: 2006-03-16 00:08:19
tags: 
- general
wordpress_url: http://schinckel.net/2006/03/16/safari-font-display/
---
For some reason, the character I use as a spacer, â˜†, doesn't seem to want to display in Safari. It works fine in FireFox, Opera, and possibly IE, but not in Safari: ![][1] This surprises me, since this is one browser I would have thought it would work in. As it turns out, Safari may actually be doing the right thing here. To include Unicode characters in the CSS `:before` pseudoselector, you must escape them. Instead of using: `#topnav li:before {content:"â˜† ";}` I've used: `#topnav li:before {content:"\2729  ";}` Thanks to a great post over on [mezzoblue][2]. 

   [1]: /images/FontsInSafari.png
   [2]: http://mezzoblue.com/articles/supplements/2005/07/25/


