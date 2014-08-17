--- 
wordpress_id: 384
layout: post
title: Getting the Active Chat in Adium
time: "22:08:55"
date: 2005-08-24 22:08:55
tags: 
- adium
- applescript
wordpress_url: http://schinckel.net/2005/08/24/getting-the-active-chat-in-adium/
---
Getting the active chat in Adium from AppleScript appears at first look to be a little dicey: Adium needs to actually be the active application before the code actually works! For instance, if you open up the Script Editor, and type in the following: 

tell application "Adium"     get contact of the active chat of the first interface controller end tell

  
You will get an empty list: {} To get a result, all you need to include is: 

    activate

  
just before you access something belonging to the active chat. If you are creating an AdiumScript, and are testing it in the Script Editor, chances are you have used the idiom: 

on run     my substitute() end run

  
To get this to work if you are using the active chat, it just needs to be changed to: 

on run     tell application "Adium" to activate     my substitute() end run

  
Happy AdiumScripting! 
