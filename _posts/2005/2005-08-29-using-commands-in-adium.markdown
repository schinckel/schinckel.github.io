--- 
wordpress_id: 396
layout: post
title: Using /commands in Adium
time: "12:12:12"
date: 2005-08-29 12:12:12
tags: 
- adium
wordpress_url: http://schinckel.net/2005/08/29/using-commands-in-adium/
---
I had a thought as to why it might not be a good idea to use `/commands`, instead of `%_commands `in Adium. If the text you type is part of a URL, then it will be replaced by the substituted text. For instance, _http://itunes.schinckel.net/_ would be replaced by _http:/â™« The Chemical Brothers (Feat. The Flaming Lips) • The Golden Path.schinckel.net/_, which is probably not desired behaviour. I'm not sure if this is a big enough deal for me to stop using them. I did also note that an `afp://` had a smiley inserted into it instead... **Update:** You can add the following to the Info.plist: 
    
{% highlight xml linenos %}
                <key>Prefix Only</key>
                <true/>
{% endhighlight %}

Where the keyword appears. This will mean that the tag must be at the start of a 'word' for it work. Thanks, Reikon! 
