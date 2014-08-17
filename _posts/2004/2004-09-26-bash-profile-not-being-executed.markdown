--- 
wordpress_id: 137
layout: post
title: bash .profile not being executed.
time: "00:30:29"
date: 2004-09-26 00:30:29
tags: 
- general
wordpress_url: http://schinckel.net/2004/09/26/bash-profile-not-being-executed/
---
Well, a strange thing just started happening - when I start the Terminal (OS X), my `~/.profile` is no longer executed. I guess there's something wrong! I can still just do a source .profile and it runs okay, so there's no problem there. It is being executed for other users, so it must be an issue with me somewhere! *Edit* Aha! A quick Google turns up the fact that `~/.profile` is not executed if `~/.bash_profile` is present. I suspect that the PalmOS development tools installer must have created this file - there was nothing new (for me) in it, so a quick `rm ~/.bash_profile` fixed my problem. 
