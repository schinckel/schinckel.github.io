--- 
wordpress_id: 1506
layout: post
title: NSScrollView copiesOnScoll Slowdown
time: "16:15:39"
date: 2008-07-16 16:15:39
tags: 
- general
- cocoa
wordpress_url: http://schinckel.net/2008/07/16/nsscrollview-copiesonscoll-slowdown/
---
I have a custom class, called MultiMatrix, which is basically an NSMatrix that has header rows and columns. Selecting a header row or column will select the whole row/column, and selecting the top-left cell will select the whole table. These header cells will also automatically select themselves if their whole row/column/table is selected.

Because I dynamically update the size of the matrix according to some data elsewhere in my program, I needed to embed it into an NSScrollView, so that when the size exceeds the normal size, then users can scroll to select cells.

I did this, and I was having huge slowdowns. I could select cells alright, but selecting a header cell meant about a one second delay.

Solution: turn off the NSScrollView's copiesOnScroll.

Even though I wasn't scrolling, for some reason this was causing big performance issues.

I suspect it's making my custom matrix class do something lots of times, or perhaps it's related to the controller and the bindings I have set up. Regardless, unchecking the Copies On Scroll box in IB fixed it.
