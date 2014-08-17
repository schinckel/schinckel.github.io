--- 
wordpress_id: 1648
layout: post
title: Python Line Continuations
time: "11:11:42"
date: 2009-04-11 11:11:42
tags: 
- python
- ruby
- textmate
wordpress_url: http://schinckel.net/2009/04/11/python-line-continuations/
---
Using TextMate, it is very easy to get snippets and commands to do things that you often do. However, the python bundle is a bit lacking, and this is a great opportunity to improve that.

I've created a Command that will enter a newline, and if not inside a list, function call, dictionary or multi-line string, automatically add a trailing \.

I've hooked it in to the Enter key, and the other settings can be seen in the screenshot below:

[![][1]][2]

The actual code follows:
    
{% highlight ruby linenos %}
#!/usr/bin/env ruby

scope = ENV['TM_SCOPE'].split

no_trail = ['punctuation.definition.arguments.end.python',
            'meta.structure.list.python',
            'meta.structure.dictionary.python',
            'string.quoted.single.block.python',
            'string.quoted.double.block.python']

print (scope & no_trail) == [] ? "\\\n" : "\n"
{% endhighlight %}
    

   [1]: http://ember.realmacmedia.com/files/192980200749dff0967e5f4_m.png
   [2]: http://emberapp.com/schinckel/image/python-line-continuation

