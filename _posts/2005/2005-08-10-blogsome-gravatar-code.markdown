--- 
wordpress_id: 346
layout: post
title: Blogsome Gravatar Code
time: "21:08:28"
date: 2005-08-10 21:08:28
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/08/10/blogsome-gravatar-code/
---
I like the idea of [Gravatars][1], and they are easy to implement in PHP, but I cannot execute straight PHP code, only Smarty Templates (under Blogsome). I'd like to be able to write a Gravatar plugin in Smarty Code, but I don't know how to MD5 encrypt just in Smarty. I thought the following would work, but it doesn't seem to: `{php}echo md5("email@address.net");{/php}` In fact, I can't seem to get any code to execute using the `{php} {/php}` tags. `{php}echo "Hello, World";{/php}`

   [1]: http://www.gravatar.com

