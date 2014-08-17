--- 
wordpress_id: 1084
layout: post
title: Better Random Password
time: "11:53:25"
date: 2007-01-04 11:53:25
tags: 
- bash
wordpress_url: http://schinckel.net/2007/01/04/better-random-password/
---
An even better method of getting a random (ascii) password: `$ head /dev/urandom | strings -n 5 | sed 'N;s/$//;s/\n//g;s/\n//g' | sed 'N;s/$//;s/\n//g' | head -n 1` (All on one line, naturally). I had to do the two `sed`s to make it work properly. It would have been nicer if this combined all of the lines, and then I could just trim as many chars as I wanted, but this was tricky. The `head -n 1` discards any lines other than the first. 
