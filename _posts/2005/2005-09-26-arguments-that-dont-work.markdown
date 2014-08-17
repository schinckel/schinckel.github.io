--- 
wordpress_id: 435
layout: post
title: Arguments that don't work
time: "22:34:59"
date: 2005-09-26 22:34:59
tags: 
- blogsome
- php
- smarty-templates
wordpress_url: http://schinckel.net/2005/09/26/arguments-that-dont-work/
---
I've come across several Smarty Tags that call WordPress functions that have listed arguments that don't work. I didn't bother too much about it - usually I can live with it. Then, I realised how I solved one instance of this happening: the Recent Comments plugin. 

I downloaded the source to this, and looked at it. Besides there being some spelling mistakes, it had argument names which differed from the documented ones. No wonder it was failing when I tried to change the number of comments, and the comment length!  So, looking at the code helped me solve the problem. Maybe it will with the other issues I have come across: most notably `{previous_post_link}` and `{next_post_link}`, and `{edit_post_link}`. 

I'll start with the `{edit_post_link}`. The codex says the argument I want to change is called _text_, but the source reveals it to be _link_. Changing this enabled me to change the text that is presented to whatever I want. The same goes for `{edit_comment_link}`. 

I was originally using the tags `{previous_post}` and `{next_post}`, but was unable to change the _previous post:_|_next post:_ text that appeared. Changing the name of the argument from _text_ to _previous_ and _next_ (as applicable) fixed this. Similarly, since `{previous_post}` and her sister are deprecated, `{previous_post_link}` has arguments that differ from those detailed in the Codex. The arguments it (and `{next_post_link}`) can handle are: 

* _format_ - defaults to `&laquo; %link`. You need to have the `%link` where you want the URL to appear! You can add more stuff that you want to appear but not be part of the link itself.
* _link_ - defaults to `%title`. Add other text that you want to add into the link area.
* *in_same_cat*
* *excluded_categories*

Depending upon if you want an image clickable, you can either insert the code into the `format` or `link` argument. Just for fun, I included my favicon in the non-link section of the link text (ie, the format argument). I'll leave it there for a while, just to prove it can be done...in the meantime, I'm going to fix the Codex. 
