--- 
wordpress_id: 1132
layout: post
title: Fixing Broken Samba Sharing
time: "14:17:57"
date: 2007-04-24 14:17:57
tags: 
- osx86
wordpress_url: http://schinckel.net/2007/04/24/fixing-broken-samba-sharing/
---
Well, I had installed OS X on an unsupported machine, and had virtually everything I wanted working. With two exceptions. Finder wasn't able to connect to any file sharing servers, but I was able to manually create mounts, using: `$ mount_smbfs //user:pass@machine/mount /mnt` I was also able to do something similar with AFS shares. Which, by the by, are much nicer - they actually allow me to copy icons from my iMac to my Dell. Then, I happened across this forum post: [Personal File Sharing & Samba, JaS 10.4.7][1] Basically, it seems that some of the files from the Hackintosh installation aren't perfect. So, the following needs to be done: 
    
{% highlight bash linenos %}
    $ cd /usr/sbin
    $ sudo rm AppleFileServer
    $ sudo ln -s /System/Library/CoreServices/AppleFileServer.app/Contents/MacOS/AppleFileServer AppleFileServer
    $ sudo unlink /System/Library/Filesystems/afpfs.fs
{% endhighlight %}

I'm not sure about the last one, but I did it anyway. And then I was able to use the Finder "Connect to Server..." tool. And have shortcuts on my desktop to servers. 

   [1]: http://forum.insanelymac.com/index.php?showtopic=25841&hl=AppleFileServer%20sudo%20unlink&st=20#

