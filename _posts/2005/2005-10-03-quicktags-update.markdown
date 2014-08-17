--- 
wordpress_id: 454
layout: post
title: Quicktags Update
time: "16:12:54"
date: 2005-10-03 16:12:54
tags: 
- javascript
wordpress_url: http://schinckel.net/2005/10/03/quicktags-update/
---
**Note:** The seperate Quicktags toolbar is not supported. Please use the full toolbox script, or hack it any way you like. The remainder of this post remains for posterity only. • I've combined my two quicktags scripts into one, it now has an (optional) argument to the `edToolbar();` function. If you pass it the argument of 'Link', then it will render the toolbar as a series of `<a href="javascript:...">` links, rather than the buttons that it defaults to. You can get it from here. Or use the code `<script type="text/javascript" src="http://schinckel.net/images/quicktags.jpg> </script> <script type="text/javascript">edToolbar(); </script>` in your page, where you want the toolbar to appear, and `<script type="text/javascript"> edCanvas = document.getElementById('comment'); </script>` after the TextBox you are using to have comments in (make sure it's id is comment, or change the second script. 
