--- 
wordpress_id: 191
layout: post
title: Images other than inline.
time: "17:22:37"
date: 2005-05-28 17:22:37
tags: 
- ecto
- web-design
wordpress_url: http://schinckel.net/2005/05/28/images-other-than-inline/
---
[![000 0020][1]][2]
Is it possible to have images not inline in ecto - that is, spanning more than one line? In short, no. To do it like this page is, you'll need to hand edit the HTML code (which almost removes the beauty of ecto), and put in a table. Just placing the photo and text inside a `<table>`, and `<tr>`, but with the image in one `<td>`, and the text in another `<td>` will do it.
Update: A better method can be found at [Using CSS to replace Tables][3]. 

   [1]: http://schinckel.net/images/images/000_0020-tm.jpg
   [2]: /images/images/000_0020.jpg
   [3]: http://schinckel.net/2005/09/13/using-css-to-replace-tables/

