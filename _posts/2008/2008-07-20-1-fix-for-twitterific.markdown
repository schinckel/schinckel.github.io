--- 
wordpress_id: 1509
layout: post
title: "#1 Fix for Twitterific"
time: "12:30:04"
date: 2008-07-20 12:30:04
tags: 
- asides
- cocoa
wordpress_url: http://schinckel.net/2008/07/20/1-fix-for-twitterific/
---
It annoys me that when I click off the Twitterrific window, it doesn't auto-hide. There doesn't seem to be a setting to make this happen.

Luckily, you can fix this with a quick edit to the MainMenu.nib file.

(This requires you have InterfaceBuilder, and therefore the developer tools installed.)

View the contents of the Twitterrific.app package, and navigate to the Resources/English.lproj directory, and open up MainMenu.nib. Find the Tweet Window, and change it's properties to "Hide on Deactivate".

Save the nib, and restart Twitterrific. Bingo, clicking off the window auto-hides.
