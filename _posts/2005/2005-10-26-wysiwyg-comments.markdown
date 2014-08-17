--- 
wordpress_id: 523
layout: post
title: WYSIWYG comments.
time: "12:15:20"
date: 2005-10-26 12:15:20
tags: 
- web-design
wordpress_url: http://schinckel.net/2005/10/26/wysiwyg-comments/
---
Editing comments in IE is annoying - until just now I had a `width:100%;` clause in my StyleSheet, and this somehow caused IE to resize the box every time a character is typed. Now, you lose access to the scrollbar, but it doesn't do the jumping thing. It actually got me thinking about how to implement WYSIWYG commenting. Instead of typing into a TextArea form, you type into a div. This div doesn't allow for HTML to be actually typed in, but does have the quicktags. Any HTML code is actually converted to how it would display. Pressing any of the quicktags formats the text automatically. The raw text (actually, the raw HTML) is also stored in a hidden textarea, and this is what is sent to the server. This kills a few birds with one stone: 

  * Only allows HTML that is 'approved' to be typed in.
  * Fixes any problems with Safari and inability to find cursor position in textarea (which has been fixed in recent builds of the WebKit, btw).
  * Removes the need for a Comment Preview box.

Potential problems that may appear (this may be extended): 

  * Clicking a buttons removes the selection from the div - no idea where to insert the formatting tags,
  * Doesn't seem to be a way to make just any part of the page editable.
