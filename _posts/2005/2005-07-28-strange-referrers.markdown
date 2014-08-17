--- 
wordpress_id: 293
layout: post
title: Strange Referrers
time: "13:01:45"
date: 2005-07-28 13:01:45
tags: 
- blogging
wordpress_url: http://schinckel.net/2005/07/28/strange-referrers/
---
I've written about referrer logs before, on various points, but today something strange occurred. I checked my referrer logs just now, and I had nearly 500 hits. Cool, but it's only early in the (server) day, and I normally only get around 300 for the whole day. So, I checked the logs, and most of them are _DIRECT_, and point to invalid URLs. The weird thing is that they are all /wp/admin/, and I am the only user. When I try to visit one, it fails: 
    
    http://schinckel.net/wp-admin/www.blogsome.com//page/5/

Not only is it a weird URL, with a www.blogsome.com, and /wp-admin/, it's also got a double slash (//). But otherwise, it nearly points to a valid page (schinckel.net/page/5/ is a valid and active URL). Strange. 
