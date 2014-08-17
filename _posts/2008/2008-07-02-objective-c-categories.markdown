--- 
wordpress_id: 1477
layout: post
title: Objective-C Categories
time: "09:46:20"
date: 2008-07-02 09:46:20
tags: 
- objective-c
wordpress_url: http://schinckel.net/2008/07/02/objective-c-categories/
---
Categories are pretty cool in Objective C. Say you have some special methods, which you'd like to have another class to have, or wish to override a method for every instance of a class.

You can, with every OO language, just create a sub-class. However, this would mean having to use the sub-class in all of the locations throughout your program.

With categories, you can just (re)define a method, and use the same class. All of your code will know that this new method is available, or will automatically use the overriden version.

This to me obviates the need which is apparent in most OO languages to sub-class the hell out of everything. This in fact is what I like most about Cocoa/Objective-C. Most of the time, you don't need to sub-class the widget and other API classes. Instead, you have archived instances of them.

Much tidier.
