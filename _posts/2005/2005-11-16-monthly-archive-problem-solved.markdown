--- 
wordpress_id: 568
layout: post
title: Monthly Archive Problem Solved
time: "08:39:04"
date: 2005-11-16 08:39:04
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/11/16/monthly-archive-problem-solved/
---
Ronan has fixed the monthly archive issue on Blogsome. That is, you can now affix `page/2/ `to any URL (or at least I haven't found one where it doesn't work!), and it will show any items that are not in the top 10 (by default, changable in settings). This also works for `page/n/` in general. This used to work only for the main page and categories. It now works for monthly, yearly and daily archives. The rule Ronan has used is nicer than my 3 - in that there is just one line for all three cases (as far as I can tell): 
    
    RewriteRule ^blogs/([_0-9a-z-]+)/([0-9]{4})/?([0-9]{1,2})?/?([0-9]{1,2})?/?page/([0-9]+)/?$ /wp-inst/index.php?wpblog=$1&year=$2&monthnum=$3&day=$4&name=&paged=$5 [L]

I'll post this to the [Blogsome Forums ][1]later today. 

   [1]: http://blogsome-forum.blogsome.com

