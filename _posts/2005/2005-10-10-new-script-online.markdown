--- 
wordpress_id: 482
layout: post
title: New Script Online
time: "01:13:06"
date: 2005-10-10 01:13:06
tags: 
- blogging
- javascript
wordpress_url: http://schinckel.net/2005/10/10/new-script-online/
---
**Note:** there is a newer post you should read instead of/as well as this one: [Updated Toolbox Scripts][1]. I've finished the Mozilla part of the new script: I think there's some issues with Internet Explorer, and Safari, but I'll work on those over the next week. You can use the script by including the following code in the head section of your main page template: `<script type="text/javascript" src="http://schinckel.net/images/toolbox.jpg"></script>` And then, where you want the following tags, enter them: `<!--quicktags-->` `<!--catchpa-->` `<!--commentpreview-->` `<!--resize-->` If you put the following inside your comment area, a gravatar will appear for each commenter: `{capture name=reader}{comment_author_email}{/capture}` `<div class="gravatar">{$smarty.capture.reader|encode:"hex"}</div>` There's also the functionality to change post and comment times to a more human readable form: `<span class="post_time"> Posted at: 12:34pm</span>` Comment times are a bit more difficult: they require a time difference. Getting this on Blogsome is cumbersome at the moment, so I'll write up a better way of doing it later. At the momement it uses the value obtained through a complicated `{Smarty}` expression. If you are really desperate, you can find this expression elsewhere on this blog, and put it into a tag as follows: `<span class="timesince"><!--{$since}--></span>` I'll write it up so you can just put in `<!--{the_time d="U"}-{comment_date d='U'}-->`, but that won't be for a day or so. The other feature I have added is automatic: I've got seperate Comments & Trackbacks, and the script will automatically hide whichever one is empty, if the other one isn't. I will write up a way to seperate Comments & Trackbacks using DOM management, but, again, not right now. Finally, all of the stuff on this page could seriously screw with your template/browser. It is still in beta, and doesn't work at all in some browsers. I did kill a bug that caused a hang on Firefox Mac, but there may be more of them. Make sure you have a backup of your template, and don't do this unless you know how to fix it up... 

   [1]: http://schinckel.net/2005/10/12/updated-toolbox-scripts/

