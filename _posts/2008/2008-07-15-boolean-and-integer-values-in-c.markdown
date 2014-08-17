--- 
wordpress_id: 1504
layout: post
title: Boolean and Integer values in C
time: "21:45:09"
date: 2008-07-15 21:45:09
tags: 
- c
wordpress_url: http://schinckel.net/2008/07/15/boolean-and-integer-values-in-c/
---
I got tripped up by how C represents Boolean values today.

To save space, but more to make comparisons easy, I was storing a series of bits (representing hours in a day) as integers. I had built up some structure so that my sub-classed NSMatrix could use Cocoa Bindings and be connected to a Controller, so that changing the values in an NSArray of Integers in that controller would change the selected cells in the matrix, and changing the cell selection similarly affects the values stored in the array.

But, and it took me a while to figure this out, I was having problems getting the data back from the array properly. For some reason, numbers greater than 255 were not displaying properly. Basically, I seemed to be losing bits off the top. So I spent ages rewriting the code using longs, long longs, and unsigned long longs, but nothing seemed to work.

Eventually, I pinpointed the error to this: in C an integer with the lower 8 bits all set to 0 evaluates to FALSE.

It doesn't seem to matter if the integer is a long, or whatever.

Thus, when I checked, using a bitwise AND (& operator), the stored value against a value representing the cell value, and stored it directly in a BOOL, and then used said BOOL to set the selection of that cell, it was evaluating to False for all values greater than 255.

All I needed was to change one line of code:

`BOOL highlight = (value & bin);`  


becomes:

`BOOL highlight = (value & bin) > 0;`  


All fixed.
