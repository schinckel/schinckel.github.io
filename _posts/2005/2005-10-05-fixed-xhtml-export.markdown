--- 
wordpress_id: 466
layout: post
title: "'Fixed' XHTML Export"
time: "01:53:19"
date: 2005-10-05 01:53:19
tags: 
- blogging
- applescript
wordpress_url: http://schinckel.net/2005/10/05/fixed-xhtml-export/
---
Since I need to replace all " in the generated XHTML with ', I use the replace function from the [previous post][1]. 
    
    
{% highlight applescript linenos %}
    (* 
    Bugs:
    
    Does not like no selection: no real way to get the selection from SEE anyway.
    Sometimes does not execute if called from Script Menu.  Intermittant.
    *)
    
    -- If called from Script Menu, need to do this.
    
    tell application "SubEthaEdit"
    	activate
    	tell application "System Events" to keystroke "C" using {command down}
    end tell
    
    set theStart to (the clipboard)
    
    set the clipboard to (my replace(theStart, "\"", "'"))
    
    beep
    
    -- Another way of the Replace Function being called:
    
    -- set the clipboard to (replaceText from theStart to "'" instead of "\"")
    
    on replace(theText, find, replace)
    	set OldDelims to AppleScript's text item delimiters
    	set AppleScript's text item delimiters to find
    	set newText to text items of theText
    	set AppleScript's text item delimiters to replace
    	set theResult to newText as text
    	set AppleScript's text item delimiters to OldDelims
    	return theResult
    end replace
    
    -- Alternate version of replace()
    
    to replaceText from theText to replace instead of find
    	set OldDelims to AppleScript's text item delimiters
    	set AppleScript's text item delimiters to find
    	set theText to text items of theText
    	set AppleScript's text item delimiters to replace
    	set theText to theText as text
    	set AppleScript's text item delimiters to OldDelims
    	theText
    end replaceText
{% endhighlight %}
    
    

   [1]: http://schinckel.net/2005/10/05/applescript-replace-text/

