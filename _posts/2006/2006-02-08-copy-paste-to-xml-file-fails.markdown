--- 
wordpress_id: 668
layout: post
title: Copy-Paste to XML file fails
time: "00:24:13"
date: 2006-02-08 00:24:13
tags: 
- itunes
wordpress_url: http://schinckel.net/2006/02/08/copy-paste-to-xml-file-fails/
---
For some reason, copying the data for the description of a Podcast and then pasting this into the XML file I'm creating doesn't work. In one instance, it just left the field blank when adding this Subscription to iTunes, yet typing this very same information in worked perfectly. Apparently, however, using é, and I assume other extended characters, doesn't work - you need to encode characters. Otherwise, iTunes decides the XML file is invalid - which it may well be… 

**Update:** the XML file is indeed invalid, unless you have defined an encoding that allows this type of character, such as, at the start: 
    
{% highlight xml linenos %}
    <?xml version="1.0" encoding="UTF-16"?>
{% endhighlight %}
