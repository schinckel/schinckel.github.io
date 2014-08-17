--- 
wordpress_id: 172
layout: post
title: Transferring posts with ecto.
time: "21:38:13"
date: 2005-05-18 21:38:13
tags: 
- blogging
- ecto
wordpress_url: http://schinckel.net/2005/05/18/transferring-posts-with-ecto/
---
I moved blogs from one server to another some time ago, and luckily I was using [ecto][1] to post, so had an archive of the posts on my computer. I wrote an AppleScript to move a post from one server/account (ecto calls them personalities) to another, and popped it into the ~/Library/Application Support/ecto/scripts directory, set up a shortcut key, and then it was just a matter of opening a post, pressing the key, and it posted the old post to the new server. Some posts caused ecto to crash, but I could live with that. Anyway, here is the script: **tell** application "ecto"     **set** _draft **to** document 1     **tell** _draft         **set** _date **to** entry date         **set** current personality **to** "Blogsome"         **set** entry date **to** _date         do post     **end** **tell** **end** **tell **

   [1]: http://ecto.kung-foo.tv/

