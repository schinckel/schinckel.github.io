--- 
wordpress_id: 6
layout: post
title: Not Quite Right, Yet.
time: "03:43:04"
date: 2005-04-04 03:43:04
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/04/04/not-quite-right-yet/
---
Okay, this site is nearly ready to be used.&#160; I have dragged across the template from [Vanilla Mist][1], and adjusted it so it kind-of works with [blogsome.com][2] The only hassles I have are: 

  1. Ecto seems to mentally add Uncategorized to each post.&#160; Regardless of if I uncheck it.*
  2. For some reason having more than two posts on a page results in the sidebar being left at the bottom of the page.&#160; Not cool.
  3. I cannot just double-click on an entry in ecto and then choose the new blog-site, click Publish and go, as ecto changes the date of the edited post to now if you change blogs.
  4. Posts do not appear until GMT, or UTC or whatever, is the time at which I posted it.&#160; The settings page does not work when I try to change the blog timezone.&#160; (That's why this page hasn't appeared yet...)

* - okay, this might not be entirely ecto's fault, as when it retrieves the post, it has the extra Uncategorized category. Fixed No. 2: I was missing a </div> tag on the post.html page - and had an extra one on the index.html which was making it work with one or two posts. 

   [1]: http://www.vanillamist.com/blog
   [2]: http://www.blogsome.com

