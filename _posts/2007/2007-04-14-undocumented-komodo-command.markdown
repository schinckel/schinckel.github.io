--- 
wordpress_id: 1130
layout: post
title: Undocumented Komodo Command
time: "00:37:36"
date: 2007-04-14 00:37:36
tags: 
- javascript
- komodo
wordpress_url: http://schinckel.net/2007/04/14/undocumented-komodo-command/
---
I was trying to do something earlier, where instead of creating a Command, I just used a macro that executed a command, but I wasn't really able to. Then, I happened to record a macro where, instead of having made the command earlier, I ran it while recording. The following JavaScript is the macro: 

// Macro recorded on Sat Apr 14 2007 00:30:57 GMT+0930 (CST)  
komodo.assertMacroVersion(2);  
if (komodo.view) { komodo.view.setFocus() };  
komodo.doCommand('cmd_selectAll')  
Run_RunEncodedCommand(window, 'python -u {\'operateOnSelection\': True}');

Now, I just need to see if I can use python macros to get the same effect. 

[Tonight May Have To Last Me All My Life][1] • [The Avalanches][2] • [Since I Left You][3] ★½

   [1]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Tonight+May+Have+To+Last+Me+All+My+Life&artistTerm=The+Avalanches
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=The+Avalanches
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Since+I+Left+You&artistTerm=The+Avalanches

