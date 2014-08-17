--- 
wordpress_id: 1284
layout: post
title: Scheme/UC Berkeley
time: "09:20:16"
date: 2007-11-20 09:20:16
tags: 
- objective-c
- scheme
wordpress_url: http://schinckel.net/2007/11/20/schemeuc-berkeley/
---
While I'm in the "learning a new language" mode, I thought I may as well start listening to the podcasts I'd downloaded from UC Berkeley, from the well-regarded CS61A course, and the associated textbook The Structure and Interpretation of Computer Programs.

The textbook is also freely available, including in a handy PDF version, and I'm working through that too.

The language used is Scheme, which is a Lisp derivative. It actually looks a bit like Objective-C in the way functions are called. Thus you see stuff a bit like:

`(+ 5 6)`

`(solve 4 65 3)`

That is, a prefix notation is used. The function (and operators, such as +-/* are also functions) comes first, followed by the argument(s). Compare this to Objective C:

`[celsiusTextField setTextColor: [NSColor blueColor]];`

In Objective C, the object comes first, then the method, then the argument(s). A different structure appears where there are multiple arguments:

`[object methodName: argument1 secondArgName: argument2]];`  


I'm still struggling to think back to my C days, but there are lots of things about every language I've used since python that I don't like. Memory management, pointers, static typing, there just doesn't seem to be any reason to have to worry about this shit.

Probably the biggest thing for me is that it is exciting me about study next year. Even if it will be learning Java, and putting up with rubbish all over again…
