--- 
wordpress_id: 1288
layout: post
title: NSTableView hassles
time: "22:41:25"
date: 2007-11-22 22:41:25
tags: 
- objective-c
wordpress_url: http://schinckel.net/2007/11/22/nstableview-hassles/
---
Well, I'm learning stacks about Cocoa/Objective C. Quite a bit of what I'm doing is trial and error, and I still haven't got the hang of retain/release. But I do have a couple of working programs.

The first one is an RPN calculator. Typing in or pressing buttons enters numbers, and the right arrow pushes them onto the stack. The exchange button swaps the top two items in the stack, the roll button moves the top item to the bottom.

When you press one of the operator keys, then it operates on the current data and the top item in the stack, or the top two items if there is nothing in the current data.

![][1]

And this is all working very well. The calculator functions work as expected, and as described. However, the stack display in the NSTableView does not work. For some reason, whilst the data is stored, it isn't being displayed.

A little more detail about that. The data is being put into the table, and I can select the X number of items that are in the stack. But they do not display. It is like the data is there, but just not being painted! And it is annoying the hell out of me!

I've done a heap of testing, and I can kind of describe what is not happening. There are two functions that need to be implemented by a dataSource, both of which I have implemented.
    
    
{% highlight objc linenos %}
    - (int)numberOfRowsInTableView:(NSTableView *)aTable;
    - (id)tableView:(NSTableView *)aTable 
                 objectValueForColumn:(NSTableColumn *)aCol 
                 row:(int)aRow;
{% endhighlight %}
    

These are the interface definitions. The implementations are simple - they just use the data stored in an NSMutableArray, and return the size of the array, and the (nth) item in the array.

But the problem is the second one does not appear to be actually being executed. The first one is, each time I call `[stackView reloadData]`. And I have no idea why the second one, which actually puts the data into the table, isn't.

I'm giving up, for now. At least I have (mostly) implemented my 9-letter puzzle solver:

![][2]

Although, it would be kind of nice to be able to use an NSTableView here, too. Although I might finish the implementation using an NSTextView, and style the 9-letter words differently. Just to totally make it the same as the wxPython version I wrote.

   [1]: /images/2007/11/200711222328.jpg
   [2]: /images/2007/11/200711222340.jpg

