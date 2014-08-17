--- 
wordpress_id: 1481
layout: post
title: To-Many Relations in Core Data using Cocoa Bindings
time: "16:26:04"
date: 2008-07-08 16:26:04
tags: 
- core-data
- objective-c
wordpress_url: http://schinckel.net/2008/07/08/to-many-relations-in-core-data-using-cocoa-bindings/
---
I'm currently learning stacks (and maybe developing a useful application along the way) about Core Data and Cocoa Bindings.

I managed to hook up all of the "first level" Entities to UI elements, but was struggling a bit figurng out how to get the to-many relationships to work.

To make all elements of the type Person appear in an NSTableView, you can create an NSArrayController, set it to the Entity type, and put Person in the relevant field. Then all people will appear in the list.

If you have a manager, who might supervise zero or more people, then how do you get a sub-set of People. More specifically, how do you get a just the other side of a To-many relationship.

I thought I was going to have to resort to actually writing some code, and use a Predicate, or something like that. But there is an IB only method.

You can create an NSArrayController, and as well as putting in the Entity type (and hooking it up to the Managed Object Context), just put that it gets it's Content Set from another object - in this case it would be People.selection.supervises (or whatever it is called).

This isn't quite flawless - if you just hook up a button to the "add:" outlet, then it doesn't quite add properly - the reverse of the attribute is not set. I had to make up an IBOutlet in my window controller that creates a new component, and sets the relationship up.

Which meant I ended up having to write two lines of code. For each relationship.
