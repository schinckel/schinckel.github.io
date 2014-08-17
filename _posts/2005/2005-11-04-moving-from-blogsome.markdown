--- 
wordpress_id: 544
layout: post
title: Moving from Blogsome
time: "08:41:16"
date: 2005-11-04 08:41:16
tags: 
- blogsome
- ecto
wordpress_url: http://schinckel.net/2005/11/04/moving-from-blogsome/
---
[Luis Suarez][1], over at elsua.net wanted to know how to [get his posts out of Blogsome][2]. It's really quite simple - all you need to do is use any XMLRPC offline composer that can get an arbitrary number of posts. [ecto ][3]is a great example. Then set it to get more posts than you have, and it will grab them all from the server. You may need to learn how to set it all up - I won't go through that here, but if enough people comment, I will write a tutorial.  You can then re-post these entries to another server. IIRC, there isn't a way to say 'post all of these entries to another server for me', so I wrote an AppleScript to do this when I migrated to Blogsome. Basically, it grabbed all of the posts from an Account, and cycled through them, posting each one to Blogsome (after changing the date to match the original, I think - there was an issue where it thought each post was a 'new' post, rather than using the old date). If you are on a Windows box, there is a version of ecto for Win, but obviously no AppleScript, so you may wish to investigate other solutions. It should be possible to write a simple program that just does this (copies posts from one host to another, via XMLRPC), but I don't have the need, so I won't write one ;) As it turns out, [Louis asked for, and received a zipped file of all his posts ][4]anyway, but incase anyone else needs to do it fast... Oh, and Louis, I didn't write a Comment because I didn't want to have to create yet another account somewhere. Maybe you could consider turning on Comments, and using some sort of Spam protection other than requiring logging in. Casual commenters will be quickly turned off this. All of my Comment Spam is gone, just by using a simple JavaScript - now all I get is Trackback Spam. 

   [1]: http://www.elsua.net/
   [2]: http://www.elsua.net/?p=3
   [3]: http://ecto.kung-foo.tv
   [4]: http://www.elsua.net/2005/10/17/weblog-content-migration-is-about-to-get-started/

