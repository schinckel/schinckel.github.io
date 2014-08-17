--- 
wordpress_id: 1485
layout: post
title: NSSegmentedControl and Core Data.
time: "11:37:22"
date: 2008-07-10 11:37:22
tags: 
- core-data
- objective-c
- cocoa
wordpress_url: http://schinckel.net/2008/07/10/nssegmentedcontrol-and-core-data/
---
It's not possible to directly hook up an NSSegmentedControl (or NSSegmentedCell) to a Core Data controlled NSArrayController (or any, for that instance). I wanted to be able to use one of these controllers to allow the user to select one, many or all items from the array.

To define the behaviour a little bit more: You can select the first item in the control (which will be called "All"), and it will select or deselect all of the other items, depending on what it's state becomes. If you click on another segment, then it will toggle the selection of that segment. If all segments are ON after pressing a segment, then the first segment must also display ON, otherwise it will be OFF.

I did it by creating a new class: SegmentController. (I know, I should put on a prefix...)

SegmentController has two required IBOutlet variables, which refer to the NSSegmentedControl, the NSArrayController, and a property NSMutableIndexSet, which stores, sets and gets the selection indexes (I think this should be indices, but I'll stick with Apple's convention). I also have a sortDescriptors array, so that this object can sort the array controller.

There are a couple of limitations, which I might look at how I deal with - for instance, the NSSegmentedControl must have exactly one more segment than the NSArrayController has items. I'm using it to select one or more days, and this number doesn't change. It should be possible to dynamically create the right number of segments, and populate them with values (I even have a readonly field called shortName set aside in my Day objects for this), but at awakeFromNib the NSArrayController is still empty, and I can't figure out a nice neat way to force a fetch.

Hooking up the elements in Interface builder is easy. Create the NSArrayController, and set that up however you need to. Do the same with the NSSegmentedControl - at this stage you'll need to put values in each of the segments. Now, create a new instance of SegmentController (you might need to add the class files to your XCode project first). Connect the two outlets up to the required objects.

Now, in the Bindings Inspector, connect up you'll want to make the Selection Indexes parameter point to the selectionIndexes model key of your Segment Controller object.

Finally, make the selector of the NSSegmentedControl point to the selectSegment: action of the Segment Controller.

I did notice a slight delay between deselecting one segment and the "All" segment deselecting. A simple optimisation - moving the call to segmentCount out of the loop test and into a local variable made it much smoother.

That should probably do it. It might need a bit of tweaking. You should be able to have multiple instances of this in your project, if it is required. It's been designed that you'll need a seperate one for each Segmented Control, as it refers to the objects it is connected to, rather than the sender of the message.

My source code is here: [SegmentController.zip][1]

   [1]: /images/2008/07/segmentcontroller.zip (SegmentController.zip)

