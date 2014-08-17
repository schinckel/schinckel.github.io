--- 
wordpress_id: 1351
layout: post
title: Dictionary returns in ZSI
time: "20:16:38"
date: 2008-02-06 20:16:38
tags: 
- python
wordpress_url: http://schinckel.net/2008/02/06/dictionary-returns-in-zsi/
---
For my day job, I am developing a SOAP server in python. I have been using ZSI as a framework, and it is very good. It will, with mod_python, allow you to build a complete application in python (and even without mod_python you can have it as a standalone process). One of the touted features is easy return of lists and dictionaries, without having to declare ComplexTypes classes.

However, it doesn't quite work. And the not-working-bit is really odd.

If you return a dict, such as the following:
    
{% highlight python linenos %}
  return {"uid":23,"gid":993,"cid":333}
{% endhighlight %}

Then ZSI creates a SOAP response like:

{% highlight xml linenos %}
    <uid id="1234" xsi:type="xsd:int">23</uid>  
    <gid id="5678" xsi:type="xsd:int">993</gid>  
    <cid id="0987" xsi:type="xsd:int">333</cid>
{% endhighlight %}

But, if you return a dictionary with values that happen to be the same, as I did with my boilerplate code:
    
    
{% highlight python linenos %}
    return {"uid":"xsd__string",
            "gid":"xsd__string",
            "cid":"xsd__string"}
{% endhighlight %}
    

Then it fails. The second and any other instance of any dict key where the _value_ has already been used by another key is empty, and the wrong type:  

{% highlight xml linenos %}
    <uid id="1234" xsi:type="xsd:string">xsd__string</uid>  
    <gid href="#5678"></gid>  
    <cid href="#0987"></cid>
{% endhighlight %}

This can be overcome with liberal use of classes (or subclasses, since most of the time I am returning dicts or lists). It is a bit of a pain in the arse, though. I've filed a bug report. And stopped using ZSI. If I found this bug this fast, then I don't want to know how many more there are. It's just easier to convert the XML to python objects and back again, and package it up to look like a SOAP request. Which is kind of what SOAP does anyway.
