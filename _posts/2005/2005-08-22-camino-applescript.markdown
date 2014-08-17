--- 
wordpress_id: 376
layout: post
title: Camino AppleScript
time: "16:46:05"
date: 2005-08-22 16:46:05
tags: 
- applescript
wordpress_url: http://schinckel.net/2005/08/22/camino-applescript/
---
Using Open As Dictionaryâ€¦ in Script Editor doesn't work with Camino. Nor did the hint to remove a certain file from the Package. Never mind. It's possible to look at the file Camino.scriptSuite (it's just a plist file), and work out what commands can be sent, and classes can be read: Classes: only the one, `URL`, `Â«class curlÂ»` (Obviously all of the standard _NSApplication_ classes still exist: especially `name of window`.) Commands: 

  * DoJavaScript
  * GetURL
  * OpenURL
  * RegisterEchoHandler
  * UnregisterEchoHandler

I haven't figured out how to use them all yet, or any of them for that matter. But someone else might use this info to figure our how to actually script Camino to do something useful... 
