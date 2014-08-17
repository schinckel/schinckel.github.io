--- 
wordpress_id: 347
layout: post
title: Changing FavIcon
time: "09:57:48"
date: 2005-08-11 09:57:48
tags: 
- web-design
wordpress_url: http://schinckel.net/2005/08/11/changing-favicon/
---
I'll do this later, but to change the favicon (the one that newer browsers show next to the URI), you need to include the following in your Main Page template. `<link rel="shortcut icon" href="insert path of file here" />` Probably you should put it near the top. I'd suggest uploading a file called `favicon.gif`, and then making the code: `<link rel="shortcut icon" href="/images/favicon.gif" />` That way you can change it by uploading another one with the same name later. Favicons should be 16x16 pixels, or possibly up to 32x32 for display in a _Favourites _menu. 
