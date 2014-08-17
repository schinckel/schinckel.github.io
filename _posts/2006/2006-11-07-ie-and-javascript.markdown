--- 
wordpress_id: 1028
layout: post
title: IE and Javascript
time: "10:02:48"
date: 2006-11-07 10:02:48
tags: 
- javascript
wordpress_url: http://schinckel.net/2006/11/07/ie-and-javascript/
---
I've got a lovely inline/AJAX search tool, but it doesn't quite work properly with Internet Explorer. I use `onsubmit="Search(); return false"` so that it works well with JavaScript, and still continues to load the search page if JavaScript is disabled, but this fails in IE. That is, it still loads the search page, even though it attempts to load the results inline first. I wonder if I need to make the `Search()` function `return false` too? 
