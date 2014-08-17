--- 
wordpress_id: 33
layout: post
title: Age in AppleScript
time: "08:47:49"
date: 2005-03-27 08:47:49
tags: 
- applescript
wordpress_url: http://schinckel.net/2005/03/27/age-in-applescript/
---
Someone on the AppleScript Studio Mailing List wanted to know how to get an age; here's my take: 

set birthday to date "Thursday, 1 April 1976 12:00:00 AM" set age to (year of (current date)) - (year of birthday) if month of (current date) < month of birthday then     set age to age - 1 else if month of (current date) = month of birthday then     if day of (current date) < day of birthday then         set age to age - 1     end if end if get age
