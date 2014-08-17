--- 
wordpress_id: 679
layout: post
title: Getting Real Audio into Podcast
time: "23:56:05"
date: 2006-02-13 23:56:05
tags: 
- itunes
- bash
- radio-and-podcasting
wordpress_url: http://schinckel.net/2006/02/13/getting-real-audio-into-podcast/
---
Occasionally, the ABC have items on their programs to which they don't have the copyright for, and as such they cannot post an MP3 of the program, but will do a Real Audio stream. Meaning you have to use Real Audio to listen to it, and you cannot archive it. Or so it seems. Now, I refuse to use Real Audio: it's nothing to do with commercial software or anything like that (there is after all a free version), but I just don't like streaming. I find that on dialup it just doesn't work well. And, the time I spend at the computer I am generally reading, so listening to anything other than music just doesn't work well. I much rather listen to Podcasts while commuting. So, how do you get an item into your iTunes Podcast library?  You'll need `mplayer`. You can find it at [the MPlayerOSX Website][1]. Install it, and then add the following to your `~/.profile`: 
    
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
        if test $# -gt 1 ; then
        shift
        realdump $*
        fi
    }
{% endhighlight %}
    

You'll also need something to encode in either MP3, or AAC format. [`faac`][2] is great for the latter, [LAME][3] for the former. I use `faac`, and have the following in my `~/.profile`: 
    
{% highlight bash linenos %}
    function faac_podcast
    {
        faac -b 64 -w $1
    }
{% endhighlight %}

You'll want something similar if you use LAME. The ABC has a placeholder MP3 file, that is usually just a short blurb saying they don't have the ability to put the program up as an MP3. Download this, and then go to the website of the program in question. Find the Real Audio stream, and download the `.ram` file. Open this in a text editor, and use the Terminal to download the stream using: `$ realdump rtsp://www.server.net/path/to/file.ra` Then use the following command to encode the file: `$ faac_podcast filename.wav` This may take some time - although on my computer it was a bit faster than the previous step. In iTunes, ask the Finder to reveal the placeholder file (select it, then use âŒ˜R, or File - Show Song File). Give the replacement file exactly the same name, except keep the right extension, and copy this file to the same location. If they are the same file format, it will overwrite the placeholder, and you are finished. If not, you need to delete the placeholder file, but not the library entry. Moving the file is not enough, you must delete it! Then, to connect the entry to the replacement file, use âŒ˜I (Get Infoâ€¦) and choose to select the file. Choose the replacement file. You can use iTunes to import and convert the file, but for me this was much slower. It requires copying the full WAV file to the library (slow, since mine is on a server), and then converting it to MP3/AAC (again, slow, as it needs to get all of the data back from the server, and then send the new stuff there). 

   [1]: http://mplayerosx.sourceforge.net/
   [2]: http://faac.darwinports.com/
   [3]: http://homepage.mac.com/awk/lame/


