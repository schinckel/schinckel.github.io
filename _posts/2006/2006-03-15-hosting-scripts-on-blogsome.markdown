--- 
wordpress_id: 782
layout: post
title: Hosting Scripts on Blogsome
time: "22:11:47"
date: 2006-03-15 22:11:47
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2006/03/15/hosting-scripts-on-blogsome/
---
Blogsome is great. You can blog, upload up to 25Mb of images, but unfortunately, you can't upload your own JavaScripts and use them from the Blogsome server. Or can you?  It is actually possible to host a JavaScript on your Blogsome blog, you just need to be a bit tricky. If you have a script called `myscript.js`, and you try to Upload it using the standard Upload menu item, it will fail. Blogsome only allows files with the extensions `.jpg`, `.gif` and `.png`. Note well that they do not need to be that type of file, but only have that extension. I think you know what I'm going to do next, and that's rename my file to `myscript.js.jpg`: leaving in the `.js` reminds me that this is a JavaScript file, and the `.jpg` allows me to upload it. Which I did. When you include the script in your template, all you need to use is: `<script type="text/javascript" src="/images/myscript.js.jpg"></script>` Browsers are smart enough to allow this to happen. 
