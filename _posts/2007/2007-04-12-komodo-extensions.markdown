--- 
wordpress_id: 1124
layout: post
title: Komodo Extensions
time: "02:11:43"
date: 2007-04-12 02:11:43
tags: 
- languages
wordpress_url: http://schinckel.net/2007/04/12/komodo-extensions/
---
Komodo is really designed for scripting/interpreted languages. However, I quite like it (although it's a bit sluggish, but that may be me), and I'd like to use it for the small amount of compiled stuff I do. For instance, I had cause to decompile, edit and recompile a Java application. I was able to edit it using Komodo IDE, however the debugger doesn't work, and it doesn't execute. I did come up with the following command that will check the modified dates on the source and target files, if necessary compile the source to byte code, and then execute the program. This is for Java only at this stage, however, I'm planning to extend it. 
    
{% highlight bash linenos %}
    if test "%F" -nt "%b.class"; then 
    { 
        echo Compiling %F; javac "%F" ; 
        if test "$?" == "0"; then 
            echo Executing %b.class; java -classpath . "%b"; 
        fi; 
    } else {
        echo Compiled file %b.class is up to date; 
        echo Executing %b.class; java -classpath . "%b"; 
    } fi
{% endhighlight %}

This was all on one line in the Add Command... box: 
    
{% highlight bash linenos %}
    if test "%F" -nt "%b.class"; then { echo Compiling %F; javac "%F" ; if test "$?" == "0"; then echo Executing %b.class; java -classpath . "%b"; fi; } else echo Compiled file %b.class is up to date; echo Executing %b.class; java -classpath . "%b"; fi
{% endhighlight %}

I'm actually going to go a bit further and create a toolbar for compiling programs, which may take the form of language extensions, or GUI extensions, or just plain macros and commands. The other thing I really liked about SubEthaEdit was that you can get the source code as HTML, that is, code that keeps the syntax colouring, which can be cut and pasted into your blogging client/whatever. I'll have to try to build this too. There is already an extension out there, called [Clipboard Helper Extension][1], that puts a new contextual menuitem into the mix that allows for copying as encoded HTML entities, or as a URL. This could be used as a basis for Copy as XHTML Source. Basically what I need to be able to do is get the editor's data about syntax highlighting (preferably with the class names, such as string, and so on), and them mark up the plain text using this. Then escape the HTML entities (or do this first), and place into the clipboard. Finally, back onto Java source code. I can get it so that double-clicking on a Java Source file will cause it to be edited by Komodo, but only if Komodo is already running. It seems that on startup, it checks the filetype being passed to it, or something, and fails to load properly if it isn't a predetermined type. It works with the predefined python, perl and so on, but not Java. Strange. 

   [1]: http://support.activestate.com/forum-topic/clipboard-helper-extensio

