--- 
wordpress_id: 1192
layout: post
title: tail -f /var/log/syslog is your friend
time: "00:29:24"
date: 2007-07-09 00:29:24
tags: 
- ubuntu
wordpress_url: http://schinckel.net/2007/07/09/tail-f-varlogsyslog-is-your-friend/
---
I've just spent about three hours troubleshooting encrypted passwords for _netatalk_. Basically, the plain netatalk that comes with Ubuntu, due to licensing reasons, does not include SSL support, which means only plaintext password authentication is supported. That wouldn't be too bad for my purposes (I'm running on a secure network), but OS X complains each time you try to connect using plaintext only passwords. So, I followed the instructions from [coderspiel: A year of plaintext AFP passwords is enough][1], but it wouldn't work. Firstly, it needs BerkelyDB 4+, but will uninstall this to install 3+, which the package manager thinks it needs. Stupid. Secondly, some bits and pieces won't compile. I did do some editing, but I felt this may break the whole thing, so I didn't want to install the whole lot, just the missing uams. Basically, `uams_dhx.so` was missing. So, I built this, and others, and installed them. Still no joy. I did kind of get `uams_randomnum.so` or something to work, but it kept saying incorrect password. Then, I stumbled on the idea to use `tail -f /var/lov/syslog`. This immediately showed me I was missing the symlink from `uams_dhx_passwd.so` to `uams_dhx.so` So that's all there was to it. Now connections work perfectly. And AFP connections seem to be a bit more robustly handled (ie, less spinning beachballs of death), and faster for things like iTunes. 

   [1]: http://technically.us/n8/articles/2006/11/16/a-year-of-plaintext-afp-passwords-is-enough

