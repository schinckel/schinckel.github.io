--- 
wordpress_id: 1080
layout: post
title: Random Password
time: "15:27:55"
date: 2007-01-03 15:27:55
tags: 
- bash
wordpress_url: http://schinckel.net/2007/01/03/random-password/
---
I needed a nice random password, something that is fairly strong. Enter `/dev/urandom` and `md5`: `$ head /dev/urandom | md5` `e98afcb4f093bafa0cc5f90f150df8b7` Obviously, that's not the password I used. Problems with this method: if you don't write it down, or save it somewhere, you will not be able to get it back. Second, it only uses a small subset of the ascii codeset - `0123456789abcdef`. I've tried to come up with something that converts this to ascii, but I'm still working on it. You'd also likely want to ignore 8-bit values, as these can be extended characters. If you ever needed to type this in, it's sometimes hard to do. The big advantage is that this is a totally random method, and you won't get the same code twice. 
