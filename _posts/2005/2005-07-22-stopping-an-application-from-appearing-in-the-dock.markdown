--- 
wordpress_id: 283
layout: post
title: Stopping an Application from appearing in the Dock
time: "17:30:37"
date: 2005-07-22 17:30:37
tags: 
- general
wordpress_url: http://schinckel.net/2005/07/22/stopping-an-application-from-appearing-in-the-dock/
---
To stop an Application appearing in the Dock under Mac OS X add the following to the `Contents/Info.plist`: 
    
{% highlight xml linenos %}
    <key>NSUIElement</key>
    <string>1</string>
{% endhighlight %}
    
