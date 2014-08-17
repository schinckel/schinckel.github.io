--- 
wordpress_id: 1367
layout: post
title: Java and Arrays
time: "09:11:24"
date: 2008-03-05 09:11:24
tags: 
- python
- java
wordpress_url: http://schinckel.net/2008/03/05/java-and-arrays/
---
Java almost handles arrays well.

Almost.

Maybe I'm spoilt by python, but having datatypes that are effectively a hybrid between lists and arrays is excellent. You get both of the advantages - being able to iterate easily, and access by index (attributes of arrays), and having dynamic sizes and non-sparse lists (the only decent attributes of lists).

In fact, the text I am reading now has a three-and-a-half page code fragment called "Partially-filled lists", which is about 200 lines of code, which implements what I describe. Except the upper limit of the size, which must be determined at compile-time. And it requires a new class if you want it to be for anything other than doubles, or whatever you have written it for.

The other thing which was bugging me was the looping of arrays. In python you can do cool stuff easily iterate over elements of an array. Recent versions of Java can also do this.

Python:
    
    
{% highlight python linenos %}
    for element in theList:  
        print element
{% endhighlight %}
    

Java:
    
    
{% highlight java linenos %}
    for (element: theList)  
        System.out.println(element);
{% endhighlight %}
    

It gets pretty close. I think I still like the simplicity of the python notation - brackets only where they are really required to indicate function/method calls, and for expression ordering. Having a required bracket around if test-expressions and the like just makes me think _if_, _switch_ and so on are functions. Which they can't possibly be, since Java doesn't have functions, only objects and methods.

And don't get me started on braces...
