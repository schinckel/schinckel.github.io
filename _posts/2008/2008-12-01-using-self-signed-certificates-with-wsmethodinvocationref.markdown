--- 
wordpress_id: 1615
layout: post
title: Using Self-signed Certificates with WSMethodInvocationRef
time: "20:03:37"
date: 2008-12-01 20:03:37
tags: 
- general
- soap
- cocoa
wordpress_url: http://schinckel.net/2008/12/01/using-self-signed-certificates-with-wsmethodinvocationref/
---
I've played quite a lot with the Cocoa methods for doing WebServices: lots of people whinge about how little support is given to SOAP from Cocoa, but I actually think it's not too bad.

To create a SOAP request is quite complicated, but it's easy to abstract most of this out.

The first step is to create the WSMethodInvocationRef, using WSMethodInvocationCreate. This takes three arguments, one of which is the endpoint URL, which for most cases will be the same across all of your application's requests. The second is the method name, and the third is the protocol you are using.

You then just need to set the parameters, namespace, headers and so on. This takes care of generating all of the SOAP Envelope stuff, and you can then just use this object to pass to WSMethodInvocationInvoke. This returns a CFDictionaryRef, which is toll-free bridged with an NSDictionary, and gives you status information, as well as results. Notably, this dictionary contains one with the key "/Result", which contains another dictionary with all of the result data - and this is the cool part - it has already been converted back from XML into whatever structure it represents!

I've wrapped this up a little further into some classes - they are still a little under construction, but I'll release them on bitbucket or something when I've cleaned them up a little. I may even make it into a Framework. Which I have been meaning to learn how to do.
