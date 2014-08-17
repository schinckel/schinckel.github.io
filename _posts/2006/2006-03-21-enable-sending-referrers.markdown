--- 
wordpress_id: 803
layout: post
title: Enable Sending Referrers
time: "10:44:47"
date: 2006-03-21 10:44:47
tags: 
- blogsome
wordpress_url: http://schinckel.net/2006/03/21/enable-sending-referrers/
---
Occasionally, people report a particular error when trying to delete posts or comments. 

> Sorry, you need to [enable sending referrers][1] for this feature to work.

I came across this twice in the past week. Once was when I changed my `$siteurl `variable, and this disappeared when I returned it to the normal value. The other was when I tried to set up a shortcut to delete a comment from the post page.  The original shortcut was: `{$siteurl}/wp-admin/post.php?action=confirmdeletecomment&comment;={$comment_ID}` Which worked, but loaded a confirmation page. I replaced it with: `{$siteurl}/wp-admin/post.php?action=deletecomment&comment;={$comment_ID}` And made the confirmation a confirm dialog instead: `return confirm("Delete Comment by {$comment_author}?\nThis cannot be undone.");`, which is the way it is done in the Edit Comment page (not the Mass Edit though, I don't think). This is when I received the error page. I think what is happening is that the referrer of the second page must be within the `{$siteurl}/wp-admin/` domain for it to be accepted. I wonder if I can fake the referrer, and make it work. This also explains why the error appeared when changing the `{$siteurl}` variable, since it's looking for a referrer and obviously getting the wrong one. Knowing this may help me to a fix so that I can change the `{$siteurl}` variable, and avoid the referrer errors. 

   [1]: http://codex.wordpress.org/Enable_Sending_Referrers

