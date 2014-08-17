--- 
wordpress_id: 1552
layout: post
title: Yeah, that's public, Java.
time: "16:52:42"
date: 2008-09-13 16:52:42
tags: 
- rants-and-raves
- java
wordpress_url: http://schinckel.net/2008/09/13/yeah-thats-public-java/
---
Having to program in Java is a real eye-opener. It's really not something I enjoy, mainly because I know there are better ways to do just about everything other than "the Java way".

Take visibility, for instance. You can declare attributes and methods as private, protected or public. But if you have two objects of a particular class, they can access each others private variables. How fucking crazy is that? I mean, something is hardly private is a different object can still access it!

Another place where visibility is fucked up is in terms of methods and availability of these. If I have a class that is not defined as a public class, and I have an instance of this class, I can find out what it's declared methods are. But I cannot invoke them, even if they are public!

I've got a project where I have to build a parser, and evaluate expressions. Sometimes there is a statement that can affect the state of the afore-mentioned object (which is in turn a sub-class of JFrame).

One of the statements is to resize the JFrame, which I can do by using the .setSize() method on this object. However, I cannot declare my own methods, even as public ones, and then call then from the client class.  


Seriously, this is shit. All I want to do is basically pass a message to this object, and there's no way for me to do so without changing the visibility of the class. I have a reference to the fucking object, I just can't really do much with it.
