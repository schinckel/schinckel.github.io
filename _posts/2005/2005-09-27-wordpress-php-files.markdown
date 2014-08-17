--- 
wordpress_id: 438
layout: post
title: WordPress PHP files
time: "15:10:40"
date: 2005-09-27 15:10:40
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/09/27/wordpress-php-files/
---
Since someone on the forums mentioned that you can change some hardcore options with `/wp-admin/options.php`, I got a little interested, and discovered there are other filest that you can run, and do interesting stuff with.  All of these PHP files are located in `http://yourblogname.blogsome.com`: `/wp-admin/install-xxx.php`, where xxx can be: `b2, blogger, greymatter, livejournal, mt, rss, textpattern`. These will allow you to import the contents of your blog directly into blogsome, I assume. I haven't done this, so cannot tell if they will work - I imported mine via ecto, an offline reader. Actually, it looks like the b2, blogger, greymatter ones might work - the others require you to edit the files that you open. And I cannot seem to identify these files in the editing screen, so I'm stuck. `/wp-admin/plugin-editor.php` This would be cool, except you cannot actually change any files. Oh well, at least you can examine a plugin and see how it works... Also interesting are the Smarty Template files. I may learn something here about what extra things I can do from Smarty in Blogsome. custom_fields.enclosure.php & custom_fields.photoblog.php I already use enclosure, but I didn't know about photoblog. Have to investigate that one. function.blogroll.php, function.cork.php, function.eightball.php, function.googleit.php, function.photoblog.php, function.pirate.php & function.relatedstories.php `{blogroll}` allows you to use [blo.gs][1] to track your blogroll. I'm pretty happy with RSS at home, so I'll leave it there. `{cork}` - don't know what this does yet. `{eightball}` looks like it wants to be a magic eightball simulator, but only ever seems to give me the one result: _Maybe in your reality_. `{googleit}`, `{photoblog}` & `{pirate}` will require further study. `{relatedstories}` looks interesting, but I cannot get any result as yet: this I may work on. I think it's pretty much like `{todayayearago}`. outputfilter.protect_email.php `{'string'|protect_email}` does not work: it causes the pages not to load. 

   [1]: http://blo.gs

