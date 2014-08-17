--- 
wordpress_id: 804
layout: post
title: Blogsome Post Parser
time: "16:13:37"
date: 2006-03-21 16:13:37
tags: 
- blogsome
- php
wordpress_url: http://schinckel.net/2006/03/21/blogsome-post-parser/
---
A bit down the track, I want to fix some things with the way Posts are parsed when they are created or edited using Blogsome. I'm loath to change too much the stuff in the actual edit box: people need to be able to put Raw HTML code in there if they want, and if they don't, they can use the WYSI-editor. However, the Title field needs to be escaped before being saved to the database. Having an & in the title generates invalid XHTML code. This is basically the same issue as what causes the errors when extended (non-latin) characters are used in the title, and transferred into the post-slug. This should be fairly easy to fix: just a function that looks at this field on posting (and perhaps the post-slug field also, just to check), and replaces any invalid characters with the escaped version. I only thought about this again, as I had two posts with & in their titles in the past week. 
