--- 
wordpress_id: 373
layout: post
title: Sending Files under Adium
time: "20:58:04"
date: 2005-08-20 20:58:04
tags: 
- adium
- applescript
wordpress_url: http://schinckel.net/2005/08/20/sending-files-under-adium/
---
I wrote a small AppleScript that sends the currently playing iTunes track to the current chat user in Adium. The only tricky part was that the line: 

send the active chat of the first interface controller file filename

requires Adium to be the frontmost application: you cannot test this with Script Editor, only install the code as a an AdiumScript and then run it from within Adium. Since it is usually illegal to copy music, all of the usual disclaimers apply: only use this to send music to which you own the copyright, or is in the public domain. Here's the full code, if you want the whole thing, [email][1] or [IM][2] me. 

on substitute()     tell application "System Events"         try             get process "iTunes"         on error             return         end try     end tell          tell application "iTunes"         set filename to location of current track     end tell          tell application "Adium"         send the active chat of the first interface controller file filename     end tell          return theChat end substitute

   [1]: mailto:matt@schinckel.net
   [2]: aim:goim?screenname=schinckel@mac.com

