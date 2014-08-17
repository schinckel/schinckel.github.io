--- 
wordpress_id: 447
layout: post
title: Automation of XHTML Cleanup
time: "18:30:21"
date: 2005-09-29 18:30:21
tags: 
- blogsome
- applescript
wordpress_url: http://schinckel.net/2005/09/29/447/
---
I use _SubEthaEdit_ all of the time, and the feature I like just about most is the _Copy As XHTML_ â‡§âŒ˜C. This will create some nice marked up text that accurately represents what _SubEthaEdit_ looks like - it takes your current syntax styling layout and creates is as XHTML. There are a couple of issues, at least with Blogsome. Firstly, for some reason Blogsome needs all style tags inside the block to use ', not ". I think it might be to do with the fact it is a `<pre>` block. I did notice it was screwing with some double-quotes on another script I was posting. My other hassle is that the syntax highlighting isn't quite right for AppleScript: it doesn't take into account terms used from applications, so sometimes the wrong colour appear. I will write an Automator action that grabs the XHTML from SubEthaEdit, replaces " with ', and pastes it into the current active text box, I think. I also started using _Convert Script To Markup Code_ - don't recall where I found this, but it does a much better job of marking up the text from Script Editor, and everything looks much nicer. 
