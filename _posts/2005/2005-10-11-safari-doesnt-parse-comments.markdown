--- 
wordpress_id: 483
layout: post
title: Safari Doesn't Parse Comments
time: "00:41:46"
date: 2005-10-11 00:41:46
tags: 
- javascript
wordpress_url: http://schinckel.net/2005/10/11/safari-doesnt-parse-comments/
---
Apparently, Safari does not 'render' comments in HTML. That sounds silly, but it strips them out. Which means that JavaScripts that use comments as placeholders will fail. Which means I can do one of two things: not support Safari, or rewrite my handlers so they use p, div or span tags, instead of comments. This really annoys me, as it's much nicer to be able to tell someone to put: `<!--catchpa-->` into their web page, rather than `<p id="catchpa"></p>` What other self-closing tags could I use? `<br id="catchpa" />` ??? It's going to mean a significant restructure of my code. But since I've learned how to import scripts, that might not be such a bad idea. 
