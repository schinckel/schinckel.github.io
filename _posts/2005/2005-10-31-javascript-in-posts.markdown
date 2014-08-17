--- 
wordpress_id: 532
layout: post
title: JavaScript in Posts
time: "19:54:32"
date: 2005-10-31 19:54:32
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2005/10/31/javascript-in-posts/
---
Clearly, this is the first time I've tried to do this. No, that's not quote true. I've been working on a post that does it, I just haven't published it yet. I've discovered that JavaScript is really neat for doing lots of cool stuff. However, WordPress has a couple of issues with it. It's okay to use JavaScript in template files, or include external JavaScripts, and even to use JavaScript in Pages, but if you try to use it in Posts, it fails. It converts " into `&quot;`, and ' into `&apos;`. Or more strictly, into the `#8220;`-ish version. Which isn't much good, as then any JavaScript which uses quotes, to define a string, for instance, will not work. You could define a function elsewhere, and then just call it, that should work. But not do anything that requires quotes. There seem to be a couple of WordPress workarounds, but not in WordPress-MU. Or Blogsome, that means. I may have a look at the source, to see if I can figure out a way to make it work nicer. Oh, and that reminds me. I need a decent text editor for Windows. Notepad just ain't cutting it anymore. Especially if I try to open a Unix file. 
