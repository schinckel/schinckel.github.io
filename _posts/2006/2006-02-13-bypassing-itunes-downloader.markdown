--- 
wordpress_id: 676
layout: post
title: Bypassing iTunes Downloader
time: "14:54:38"
date: 2006-02-13 14:54:38
tags: 
- itunes
- applescript
- radio-and-podcasting
wordpress_url: http://schinckel.net/2006/02/13/bypassing-itunes-downloader/
---
My biggest hate about iTunes is that if the download of a Podcast fails, it needs to restart the whole download, rather than just resume. This really sucks if you are 21Mb into a 22.5Mb download. Using the technique illustrated in [Adding a Podcast to a Pre-Existing Subscription][1], it's possible to download the files in another program, such as `wget`, which can handle resumes. It also tends not to drop out as much as iTunes does when the network is congested. Which it is automatically when three downloads are concurrently occurring. There are some changes that need to be made to the process, but these are really just simplifications. You need to know the URL of the file you want to get, which can be obtained using the following AppleScript: 
    
{% highlight applescript linenos %}
    tell application "iTunes"
        set the clipboard to address of item 1 of selection
    end tell
{% endhighlight %}

Then, set up your http server, and create the same directory structure from your server root. Go to the relevant directory, and download the files you want to grab. Finally, go offline, and point the domain(s) at your own computer. Go back into iTunes, and use the GET button to grab the files from your own 'server'. Don't use the Update Podcasts button, or an error may occur. This removes the need to recreate the XML file, which is the most labour intensive part of the process illustrated in the previous post. It works a treat. 

   [1]: http://schinckel.net/2006/02/08/adding-a-podcast-to-a-pre-existing-subscription/

