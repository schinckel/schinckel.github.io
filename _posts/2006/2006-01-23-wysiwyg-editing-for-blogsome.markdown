--- 
wordpress_id: 624
layout: post
title: WYSIWYG editing for Blogsome
time: "12:05:54"
date: 2006-01-23 12:05:54
tags: 
- blogsome
wordpress_url: http://schinckel.net/2006/01/23/wysiwyg-editing-for-blogsome/
---
I've spent a bit of time working on getting some plugins working under Blogsome. In particular, [TineMCE-Wordpress][1] and [WYSI-Wordpress][2]. Neither of them worked too well, and they both just removed the Quicktags. I've also downloaded the TinyMCE source: I may implement a subset of that in a single file, and get that working with Blogsome. I also tried getting the [Gravatar][3] plugin to work, but this fails, as the Post Editor seems to screw up the tags, putting in a close tag. And self-closing the tag fails. `<gravatar matt@schinckel.net>` becomes `<gravatar matt@schinckel.net></gravatar>` And `<gravatar matt@schinckel.net />` gets changed into `<img class=“postgrav” src=“wp-content/gravatars/blank_gravatar.png” alt=“a gravatar image”>` by the plugin, not what it should look like. Which, by the way, isn't Valid XHTML! Note: these are not installed on the actual Blogsome server, but a Test one. 

The More I See You • [Chris Montez][4] • [Room Service][5] ★★

   [1]: http://lifesinger.3322.org/myblog/?p=107
   [2]: http://mudbomb.com/
   [3]: http://www.skippy.net/blog/2005/03/24/gravatars/
   [4]: http://www.google.com/search?q=%22Chris Montez%22
   [5]: http://www.google.com/search?q=%22Room Service%22

