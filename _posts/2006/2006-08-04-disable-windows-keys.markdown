--- 
wordpress_id: 917
layout: post
title: Disable Windows Key(s)
time: "16:19:48"
date: 2006-08-04 16:19:48
tags: 
- general
- wow
wordpress_url: http://schinckel.net/2006/08/04/disable-windows-keys/
---
When playing _World of Warcraft_, we use a program called [TeamSpeak][1] to communicate, rather than trying to type madly like idiots. It works pretty well, and most users have a _push-to-talk_ key setup, so that you only transmit when this key is pressed. This is all well and good, but sometimes users have the Alt key as their PTT key. But WoW uses the Tab key as _Select Nearest (or next) Enemy_. So, if our rogue, and Main Assist, _Heropsycho _is running towards a target, and talking, there is a fairly high chance he'll Alt-Tab out of WoW, and have to wait for the system to catch up before rejoining the fight. And, it turns out that Hero is our main damage dealer, so being without him is rather bad. Enter this idea. Remove the mapping for the Win key, so this can be the PTT key. Save the following into a text file, with the extension .reg: 
    
{% highlight ini linenos %}
    Windows Registry Editor Version 5.00
    
    [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout]
    "Scancode Map"=hex:00,00,00,00,00,00,00,00,03,00,00,00,00,00,5B,E0,00,00,5C,E0,00,00,00,00
{% endhighlight %}

Double-click this file, and restart. You can them map Win as your PTT key, and pressing it will no longer open the Start Menu. I mean, when was the last time you used this key to get to the Start Menu anyway? Or, you can get the file from [http://files.schinckel.net/disable_both_windows_keys.reg][2]. 

   [1]: http://goteamspeak.com
   [2]: http://files.schinckel.net/disable_both_windows_keys.reg

