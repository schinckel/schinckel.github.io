--- 
wordpress_id: 429
layout: post
title: Blogsome Gravatars
time: "10:20:21"
date: 2005-09-15 10:20:21
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2005/09/15/blogsome-gravatars/
---
**Note:** this post is now out of date. Go to [Gravatars in Blogsome][1] instead. I did [get Gravatars working in Blogsome to some extent a while ago][2], but it exposed the email addresses. What I've done now is obscure the email addresses, and it should be safe to use:  `<script type="text/javascript"> {capture name=reader}{comment_author_email}{/capture} var ob_email = "{$smarty.capture.reader|replace:'@':';'}"; var email = ob_email.replace(/;/g,"@"); document.write('<div class="right"><img src="http://www.gravatar.com/avatar.php?gravatar_id='); document.write(hex_md5(email)); document.write('&size;=50" /><\/div>'); </script>` Basically, it grabs the Commenter's email address, and changes it in Smarty from _email@domain.com_ to _email;domain.com_ - then JavaScript is used to change it back before passing to the `hex_md5();` function. You will need to have the following code inserted in your template somewhere before this: `<script type="text/javascript" src="/images/md5.jpg"></script>` And the file [md5.jpg][3] stored on your server, or the following line (using the copy on my server): `<script type="text/javascript" src="http://schinckel.net/images/md5.jpg"></script>` If you download my version, clicking on the links won't work: you'll need to right-click and choose Save... 

   [1]: http://schinckel.net/2006/02/23/gravatars-on-blogsome/
   [2]: http://schinckel.net/2005/08/11/gravatars-in-javascript-for-blogsome/
   [3]: /images/md5.jpg

