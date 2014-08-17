--- 
wordpress_id: 1227
layout: post
title: appscript, network access and no password
time: "22:46:22"
date: 2007-07-24 22:46:22
tags: 
- python
wordpress_url: http://schinckel.net/2007/07/24/appscript-network-access-and-no-password/
---
Okay, I think I've found an appscript bug. If you attempt to connect to a networked machine, such as doing: >>> from appscript import * >>> it = app(url="eppc://user@machine.local/iTunes") >>> it.activate() Which works fine if you have a password, fails if there is no password. And the error reported is: RuntimeError: Can't get terminology for application (aem.Application(url='eppc://user@machine.local/iTunes')): CommandError -128: userCanceledErr Just because I haven't put in a password, doesn't mean I have cancelled the operation. I'm still working on a fix to get it to work. 
