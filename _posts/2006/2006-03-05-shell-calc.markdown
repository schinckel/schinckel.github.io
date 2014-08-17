--- 
wordpress_id: 727
layout: post
title: Shell Calc
time: "09:53:40"
date: 2006-03-05 09:53:40
tags: 
- bash
- mathematics
wordpress_url: http://schinckel.net/2006/03/05/shell-calc/
---
Whenever I need to do any calculations, I generally drop into python and do them from there. However, I came across a neat tip over on Mac Geekery: [When You Need A Calculator][1]. I've modified is ever so slightly so it goes into a `.profile` instead of a `.bashrc`: 
    
{% highlight bash linenos %}
    function calc
    {
        awk "BEGIN {print $* ; }"
    }
{% endhighlight %}
    

Sweet. 

   [1]: http://www.macgeekery.com/tips/cli/when_you_need_a_calculator

