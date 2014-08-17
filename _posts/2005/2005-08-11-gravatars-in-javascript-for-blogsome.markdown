--- 
wordpress_id: 348
layout: post
title: Gravatars in JavaScript for Blogsome
time: "11:19:50"
date: 2005-08-11 11:19:50
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2005/08/11/gravatars-in-javascript-for-blogsome/
---
To create an image tag for a Gravatar in JavaScript, for use on Blogsome. Download the [md5.jpg][1] file (it's really a .js file, but we are tricking Blogsome into allowing it to be uploaded), and upload it to your site. Put the following code into your Main Page template (probably in the head section): `<script type="text/javascript" src="/images/md5.jpg" />` Put The following code where you want the Gravatar to appear: `<script type="text/javascript">document.write('<img src="http://www.gravatar.com/avatar.php?gravatar_id='); document.write(hex_md5("{comment_author_email}")); document.write('&size=20" />'); </script>` You can change the size of your Gravatar image with the `size=20` part, set it to whatever value you want. Enjoy! **Edit: **Don't use this code, as it displays the email address to the browser, and then asks it to generate the MD5 fingerprint. This means that a Spam-collector would actually have access to the raw email address. I've diasabled the code until I figure out how to get around this... 

   [1]: /images/md5.jpg

