--- 
wordpress_id: 809
layout: post
title: Other AJAX/Blogsome functions
time: "08:57:33"
date: 2006-03-23 08:57:33
tags: 
- blogsome
- javascript
- asides
wordpress_url: http://schinckel.net/2006/03/23/other-ajaxblogsome-functions/
---
Really, I don't like the term AJAX. However, technically, I think that's what my DeleteComment function does. It sends a request to the server, and updates the current DOM to reflect this. There's no reason why normal Comments can't be added or edited in the same way. Instead of the Edit Comment/Post opening up a new page, I might just make them turn the area into a textarea, and allow editing. Then, when clicking out (or perhaps, Save), the data is uploaded back to the server, and the page updated. This would make it very cool to edit posts in-place. For this, I might be better off investigating other options rather than re-building my own. Although that is kind of fun. 
