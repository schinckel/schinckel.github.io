--- 
wordpress_id: 231
layout: post
title: "realdump: dump RealPlayer stream to file"
time: "18:36:50"
date: 2005-06-19 18:36:50
tags: 
- music
- bash
wordpress_url: http://schinckel.net/2005/06/19/realdump-dump-realplayer-stream-to-file/
---
The following function/script will dump the data from a RealPlayer stream to disk as a WAV file. Put it into your `~/.profile`, or make a shell script out of it. 
    
{% highlight bash linenos %}
    function realdump
    {
        if test -f $1 ; then
            realdump `cat $1`
        else
            export temp=${1/#*\//}
            export filename=${temp/.*/.wav}
            ~/bin/mplayer -cache 128 -vc dummy -vo null -ao pcm -aofile $filename $1
        fi
        if test $_# -gt 1 ; then
            shift
            realdump $*
        fi
        
    }
{% endhighlight %}

It creates a file with the same basename (the filename minus the extension), with an extension of `.wav`; there is no checking to see if the file exists already, and old file will be overwritten. The argument to realdump can be either the URLs of the streams, or the name of a file with the URLs of the streams in it. It should handle files with multiple entries, so you can concatenate a series of `.ram` files, and it should download each of them in turn. Ensure they have different filenames, not just different directories! 
