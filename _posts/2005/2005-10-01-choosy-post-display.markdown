--- 
wordpress_id: 450
layout: post
title: Choosy Post Display
time: "13:52:45"
date: 2005-10-01 13:52:45
tags: 
- smarty-templates
wordpress_url: http://schinckel.net/2005/10/01/choosy-post-display/
---
Someone on the Blogsome Forums wanted to be able to have the main page only display posts from a certain category. To do this, edit your post.html file, and add the following right at the start: `{capture name=in_cat}{in_category category='1'}{/capture} {if $smarty.server.REQUEST_URI != '/' || $smarty.capture.in_cat == '1'}` Then, right at the end, add `{/if}` If you are wanting a category other than the default one to be the only one shown on your front page, look up the category id in the dash, and replace the '1' in the first line with this number. This could easily be extended to get a sticky-post setup. I'll do that later tonight, when I'm drunk. Just to make it a challenge. Happy 30th Sam. 
