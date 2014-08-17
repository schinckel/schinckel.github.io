--- 
wordpress_id: 230
layout: post
title: Downloading RSTP streams.
time: "23:02:45"
date: 2005-06-18 23:02:45
tags: 
- music
wordpress_url: http://schinckel.net/2005/06/18/downloading-rstp-streams/
---
The [BBC][1] has a heap of stuff available on their website as part of the [Beethoven Experience][2], but I found my copy of [RealPlayer][3] had expired. I'd rather dump the data to disk and listen to it later (on my iPod, probably). But, the only ways I could find to do this didn't work with the software I had. Specifically: 
    
    
{% highlight bash linenos %}
    mplayer -dumpstream rtsp://rmv8.bbc.net.uk/radio3/classical/pizarro/sonata01.rm
{% endhighlight %}
    

fails, as does using [VLC][4]. I'm downloading newer versions of both of these, but I'm not that hopeful. [Mplayer][5] seems to not want to access network protocols, [VLC][4] cannot decode. Nor can it just dump to disk, without interpreting the data. 

   [1]: http://www.bbc.co.uk
   [2]: http://www.bbc.co.uk/radio3/beethoven/
   [3]: http://www.real.com/
   [4]: http://www.videolan.org/vlc/
   [5]: http://www.mplayerhq.hu/
