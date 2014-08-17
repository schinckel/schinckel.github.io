--- 
wordpress_id: 436
layout: post
title: Reconnect all Adium Accounts.
time: "23:26:40"
date: 2005-09-26 23:26:40
tags: 
- adium
- applescript
wordpress_url: http://schinckel.net/2005/09/26/reconnect-all-adium-accounts/
---
Just a little quickie: sometimes Adium loses connections. This script will reconnect any disconnected accounts. 
    
{% highlight applescript linenos %}
    tell application "Adium"
        repeat with acc in accounts
            connect acc
        end repeat
    end tell
{% endhighlight %}
