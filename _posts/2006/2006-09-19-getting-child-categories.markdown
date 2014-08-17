--- 
wordpress_id: 980
layout: post
title: Getting Child Categories
time: "22:45:58"
date: 2006-09-19 22:45:58
tags: 
- smarty-templates
wordpress_url: http://schinckel.net/2006/09/19/getting-child-categories/
---
I've been racking my brain thinking about how to get child categories of a specific category. And I think I've just figured it out. Examine all of the other categories in a complete list, and grab all of them that have the current page's URL at the start. The next word will be the sub-category . Of course, knowing how to split stuff in Smarty is a bit difficult. I was thinking in JavaScript... 

[It Don't Hurt][1] • [Sheryl Crow][2] • [The Globe Sessions][3] ★★½

   [1]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=It+Don't+Hurt&artistTerm=Sheryl+Crow
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Sheryl+Crow
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=The+Globe+Sessions&artistTerm=Sheryl+Crow

