--- 
wordpress_id: 1659
layout: post
title: Fix Redmine not showing repository data
time: "13:06:59"
date: 2009-05-14 13:06:59
tags: 
- general
- django
wordpress_url: http://schinckel.net/2009/05/14/fix-redmine-not-showing-repository-data/
---
For some time, the git repository I am using to track changes for my Django-Management TextMate bundle was not working correctly in Redmine. I was able to connect it up using the settings, but was getting errors about the files not being found.

It turns out that git was not in my path. Putting a link from /usr/local/bin/git to /usr/bin/git fixed that all up.  

