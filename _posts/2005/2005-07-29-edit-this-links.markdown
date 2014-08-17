--- 
wordpress_id: 301
layout: post
title: Edit This links
time: "16:35:11"
date: 2005-07-29 16:35:11
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/07/29/edit-this-links/
---
Playing around with WP tags, I discovered it's easy to put Edit This links/buttons onto posts and comments, that will only appear when a user who is able to edit them is logged in. So, there's now a reason to register as a user: it means you can edit any comments you make. Of course, it's easier to just comment, and enter your details. Since I don't get much comment spam, I won't be turning on 'Only Registered Users Can Comment' any time soon, but a nice feature for me to have. The code in my templates is: 

  1. To change the links at the top of the page to Login/Logout, and Register/Site Admin, depending on context, use the following Smarty Tags:

    * `{wp_loginout} `
    * `{wp_register} `

  2. To put the Edit This in the post header:

    * `{edit_post_link before='<span class="button">' after='</span>'} `

  3. To put the Edit This in the comment box:

    * `{edit_comment_link before='<span class="button" >' after='</span>'} `
