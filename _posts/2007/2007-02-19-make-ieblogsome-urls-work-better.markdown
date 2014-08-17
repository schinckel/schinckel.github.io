--- 
wordpress_id: 927
layout: post
title: Make IE/Blogsome URLs work better
time: "21:43:05"
date: 2007-02-19 21:43:05
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/08/24/make-ieblogsome-urls-work-better/
---
Internet Explorer has some interesting foibles. And by interesting, I mean annoying. For instance, if I've visited a page on my site, such as: http://schinckel.net/wp-admin/ Internet Explorer seems to remember it as http://schinckel.net/wp-admin Notice that the trailing slash is missing. Blogsome will report that "Page Does Not Exist", or if it looks like a Post page, "No posts made". With access to the HTTP server, this would be easy to fix (just create a rule in the relevant place that allows for URLs of this form), but on Blogsome this is a bit harder. You need to be able to check the last character of the URL string, and if it isn't a `/`, append one. This should work fairly well in all cases, since every reader visible URL ends in a `/`. So how to do this? Getting the URL is easy: `{$smarty.server.REQUEST_URI}`. However, getting the last character is a bit more difficult. Or so it appears. But Smarty allows for accessing strings as an array, so `{$smarty.server.REQUEST_URI[0]}` will get the first character. To get the last is a therefore possible. `{$smarty.server.REQUEST_URI[-1]}` fails, so I'll need to get the length of the string. `{$smarty.server.REQUEST_URI[$smarty.server.REQUEST_URI|count_characters ]}` also fails, but `{$smarty.server.REQUEST_URI[smarty.server.REQUEST_URI|count_characters ]}` works. Now, we just need to test if this value is "/", and if it isn't, then reload the page with that added. Which I can't seem to figure out how to do with Smarty... • Of course, doing the same with JavaScript is a piece of cake: `if (document.URL[document.URL.length-1] != "/")     document.location = document.URL + '/'`
