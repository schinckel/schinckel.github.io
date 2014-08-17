--- 
wordpress_id: 510
layout: post
title: Interesting WordPress Smarty Functions
time: "22:03:07"
date: 2005-10-19 22:03:07
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2005/10/19/interesting-wordpress-smarty-functions/
---
Here are some interesting Smarty equivalents of WordPress functions I hadn't come across before: 

  * `{get_lastpostdate}` or `{get_lastpostmodified}` - returns a timestamp, such as _2005-10-16 07:10:51_ that contains the last post date. `{get_lastcommentmodified}` is identical, but for the last comment.
  * `{human_time_diff from=n to=n}` - similar to a script I [wrote about][1], and implemented. Limited in that it only does days, not any larger unit. Advantage: done by the server, doesn't 'flash' changing text via JavaScript, neater than my Smarty version.
  * `{get_day_link}` - much neater than the version I was using! Generates the URI as described. Also `{get_page_link}`, `{get_year_link}`, `{get_month_link}` and `{get_feed_link}`. 
  * `{globalvar var=varname value=value}` - makes a value a global PHP variable. Very interesting...

   [1]: http://schinckel.net/2005/10/05/time-since-after-the-fact/

