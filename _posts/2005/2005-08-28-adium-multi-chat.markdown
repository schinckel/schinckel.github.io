--- 
wordpress_id: 394
layout: post
title: Adium Multi Chat
time: "22:04:36"
date: 2005-08-28 22:04:36
tags: 
- adium
wordpress_url: http://schinckel.net/2005/08/28/adium-multi-chat/
---
I had to fix a couple of things in my Adium Scripts tonight: I figured out that if you are a chat with more than one person (like in a Jabber 'room'), and you use `serviceClass of contact of the active chat of the first interface controller` you will get a list of items, not just one. Actually, you always get a list, just usually it's only one item long. So, to test if the chat serviceClass is in a set that can handle HTML in chats, you need to use `first item of serviceClass...` instead of just `serviceClass...` Note that this returns correct values, wheras `serviceClass of chat 1` (where it is a group chat) will return an empty string. Bad coding, Adium. Anyway, I've fixed `/who` to work with multi-person chats, too. 
