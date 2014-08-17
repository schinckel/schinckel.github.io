--- 
wordpress_id: 478
layout: post
title: BugMeNot Bookmarklet
time: "11:33:42"
date: 2005-10-08 11:33:42
tags: 
- javascript
wordpress_url: http://schinckel.net/2005/10/08/bugmenot-bookmarklet/
---
Had a good idea for a bookmarklet today: get a username/password for the current domain from bugmenot, and automatically add it into the fields! I've got one that pops up a window: [BugMeNot][1], but it would be cool if it interacted with the page. 

   [1]: javascript:window.open('http://www.bugmenot.com/view.php?url='+window.location, 'bmpopup', 'width=500,height=400,menu=no').focus(); bmpopup.focus();

