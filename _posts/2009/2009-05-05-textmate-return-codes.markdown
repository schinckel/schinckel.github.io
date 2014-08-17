--- 
wordpress_id: 1658
layout: post
title: TextMate return codes
time: "18:04:26"
date: 2009-05-05 18:04:26
tags: 
- general
- ruby
- textmate
wordpress_url: http://schinckel.net/2009/05/05/textmate-return-codes/
---
From the TextMate manual:

> These functions only work when the initial output option is not set as "Show as HTML". The list of functions is as follows:
> 
>   * exit_discard
>   * exit_replace_text
>   * exit_replace_document
>   * exit_insert_text
>   * exit_insert_snippet
>   * exit_show_html
>   * exit_show_tool_tip
>   * exit_create_new_document  

This is all well and good, but what about when you are in another language?

Simple. Just ensure your exit code matches. The values start at 200, for exit_discard, and 205 is exit_show_html.

This is probably not the best way to do it, as these may change in the future. But, I couldn't think of another way, at least not offline.
