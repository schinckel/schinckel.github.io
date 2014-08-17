--- 
wordpress_id: 546
layout: post
title: $smarty.get.*
time: "15:25:29"
date: 2005-11-04 15:25:29
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2005/11/04/smartyget/
---
I don't know how I never found this before... You can use `{$smarty.get.<var>}` to get the URL variable you want. For instance, you can use the following ones in WordPress MultiUser: 

  * `year`
  * `monthnum`
  * `day`
  * `name`
  * `paged`/`page`
  * `category_name`
  * `wpblog`

Unfortunately, these variables don't seem to be set with _Pages_, rather than _Posts_. However, this has given me some tips as to how to fix the `.htaccess `RewriteRule problems causing Blogsome not to display subsequent pages of monthly archives. Possibly something to do with the fact it uses `page`, rather than `paged`, and that for some reason it parses the word _page_ as the name of the post. This looks like not a `.htaccess `bug at all, now that I think of it. 
