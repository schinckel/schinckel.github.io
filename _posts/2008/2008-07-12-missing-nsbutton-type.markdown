--- 
wordpress_id: 1499
layout: post
title: Missing NSButton Type
time: "17:53:33"
date: 2008-07-12 17:53:33
tags: 
- macos-x
- programming
wordpress_url: http://schinckel.net/2008/07/12/missing-nsbutton-type/
---
I'm trying to make a control that allows me to indicate when a record in my application is synced with the AddressBook person of the same name - I have made it so that I can only enable syncing when a person with the exact same name exists in both places, but to indicate it, I want to use a button that shows a pressed-in state, but also alters the image.

I want the image to be black-and-white by default, but when pressed in, it becomes coloured.

Apparently, this isn't possible. You can either have a button which changes it's image, or displays a pressed in look.

Might have to subclass it.

Update: You can subclass it, but there's no need to. Just give yourself a reference to it (myButton, for instance), and then:

{% highlight objc linenos %}
[[myButton cell] setShowsStateBy:NSPushInCell | NSCellLightsByContents | NSCellLightsByBackground];
{% endhighlight %}