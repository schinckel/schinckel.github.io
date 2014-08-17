--- 
wordpress_id: 468
layout: post
title: Script to XHTML
time: "14:39:13"
date: 2005-10-05 14:39:13
tags: 
- applescript
wordpress_url: http://schinckel.net/2005/10/05/script-to-xhtml/
---
I wrote my own script to convert the selection (or whole front document) in Script Editor to XHTML. It uses the same CSS tags as Jonathon's program, but does not add the style data in, unless a property is set. I've also got the Source Code for his program, so it will be interesting to see similarities. 
    
    
{% highlight applescript linenos %}
    (*
    Script to XHTML v1.0
    ©2005 Matthew Schinckel
    http://schinckel.net/
    
    Converts selection (or whole document) into XHTML code.
    
    Insert the StyleSheet into your CSS if you want.  Else set externalCSS to false.
    
    Put it in your Scripts Menu, and it will work a treat for you.  
    Even copies the data to the clipboard.
    
    Bugs/Issues:
    
    • Script Editor reports the start of comments [--] as being black, not grey.
    • Doesn't handle references.
    • Operators and values are treated all as values.
    
    *)
    
    property StyleSheet : "
    .AppleScript { background-color:#ffffff; border: solid black 1px; padding:0.5em 1em 1em 1em; text-align:left; font-family: Verdana,Sans-Serif; overflow:auto; font-size:0.9em; white-space:pre; line-height:1.2em; margin-bottom:9px;}
    .as_new_text  { font-family:Courier; color: purple; }
    .as_operators  { color: black; }
    .as_language  { font-weight: bold; color: blue; }
    .as_application  { color: blue; }
    .as_comments, .as_comment  { font-style:italic; color: gray; }
    .as_values  { color: black; }
    .as_variables ,.as_variable { color: green; }
    .as_references  { color: purple; }
    "
    property externalCSS : true
    
    -- The HTML code either side of the block.
    property htmlStart : "<pre class='AppleScript'>" & return
    property htmlEnd : return & "</pre>" & return
    
    property tagStart : "<span class='"
    property tagMiddle : "'>"
    property tagEnd : "</span>"
    
    -- Apparently, this one is different to 'return'
    property enter : "
    "
    -- For testing, set this to 2, for use via Script Menu, set to 1.
    property win : 1
    
    if externalCSS is not true then set htmlStart to htmlStart & "<style>" & return & StyleSheet & return & "</style>" & return
    
    tell application "Script Editor"
    	set theData to contents of selection of document of window win
    	if (theData is "") then
    		-- No selection, let's do the whole document.
    		set textList to attribute run of contents of document of window win
    		set fontList to font of attribute run of contents of document of window win
    		set colorList to color of attribute run of contents of document of window win
    	else
    		set textList to attribute run of contents of selection of document of window win
    		set fontList to font of attribute run of contents of selection of document of window win
    		set colorList to color of attribute run of contents of selection of document of window win
    	end if
    end tell
    
    set html to ""
    
    repeat with i from 1 to the count of textList
    	set theClass to whichClass(item i of fontList, item i of colorList)
    	set theText to my HTMLify(item i of textList)
    	set html to html & tagStart & theClass & tagMiddle & theText & tagEnd
    end repeat
    
    set the clipboard to htmlStart & html & htmlEnd
    beep
    
    -- Utility Functions
    
    on whichClass(theFont, theColor)
    	-- Set the class according to the font or colour.
    	if theFont is "Verdana-Bold" then return "as_language"
    	if theColor is {16384, 32768, 0} then return "as_variables"
    	if theColor is {19660, 19960, 19960} then return "as_comments"
    	if theColor is {0, 0, 65535} then return "as_application"
    	if theColor is {32768, 0, 32768} then return "as_new_text"
    	return "as_values"
    end whichClass
    
    on replace(theText, find, replace)
    	-- Nice replace function
    	set OldDelims to AppleScript's text item delimiters
    	set AppleScript's text item delimiters to find
    	set newText to text items of theText
    	set AppleScript's text item delimiters to replace
    	set theResult to newText as text
    	set AppleScript's text item delimiters to OldDelims
    	return theResult
    end replace
    
    on HTMLify(someText)
    	-- This might need some more entries.
    	-- Perhaps a better way of doing it...?
    	set someText to replace(someText, "&", "&amp;")
    	set someText to replace(someText, "\"", "&quot;")
    	set someText to replace(someText, "<", "&lt;")
    	set someText to replace(someText, ">", "&gt;")
    	--set someText to replace(someText, tab, "&nbsp;&nbsp;&nbsp;&nbsp;")
    	--set someText to replace(someText, enter, "<br />" & enter)
    	--set someText to replace(someText, return, "<br />" & return)
    	return someText
    end HTMLify
{% endhighlight %}
    
    
