--- 
wordpress_id: 1062
layout: post
title: Welcome back, python
time: "01:05:48"
date: 2006-12-12 01:05:48
tags: 
- python
- tiger
wordpress_url: http://schinckel.net/2006/12/12/welcome-back-python/
---
It's been too long since I last coded in python. I've been doing a fair bit of AppleScript, and JavaScript over recent months, but tonight I had cause to do some scripting in python. And, how I've missed it. I still keep wanting to write `if (something) then`, but I'm getting over it. I've been doing some stuff to organise digital photos, as indicated in the previous post. What I've come up with so far is some code that grabs the EXIF data from the file, and if it's a photo (and larger than 640, to remove thumbnails from the process), move/copy/link it to a particular location. This location is `$base_dir/year/month/day/`, where `$base_dir` is a definable constant, and `year/month/day` is grepped from the EXIF data. I've come up with two simple methods of getting the EXIF data - one is to use the [EXIF.py][1] module (not installed by default), the other uses [jhead][2]. The jhead one is much faster, but I wonder whether I can hand-code one that is even faster, since I only need three bits of data (date, xSize and ySize). \[Some time passes...\] A grep is marginally faster, but is only easy to do when you know the structure of the data you are looking for. A Date/Time is easy: 
    
{% highlight bash linenos %}
    grep '[12][0-9][0-9][0-9]:[01][0-9]:[0-3][0-9] [0-2][0-9]:[0-5][0-9]:[0-5][0-9]' -m1 -o -a filename.JPG
{% endhighlight %}

But getting the same for a resolution (which could just be any value that is a multiple of 8, or even any other number if the image had been edited!), is a bit tricky. Regardless, jhead is much, much faster than EXIF.py, by several orders of magnitude. So I'll use that. Anyway, the cool bits of my code are: 
    
{% highlight python linenos %}
    date_string = os.popen('jhead ' + filename + ' | grep Date/Time').read().split(' : ')[1].strip()
    
    resolution = os.popen('jhead ' + filename + ' | grep Resolution').read().split(' : ')[1].strip().split(' x ')
    
    if resolution[0] < 640 and resolution[1] < 640: 
        return None # Low-res, must be a thumbnail.
    
    date_dir = os.path.join(base_dir, date_string.split(' ')[0].replace(':','/'))
    
{% endhighlight %}

I'm fairly happy with these bits of code, and of course there are more things being added. I do have it working that it grabs the data, and creates links in the chosen directory. I've decided to use links until I've finished getting all of the album data from iPhoto, since then I don't have to worry about disk space (hard links don't take up any room, they are just another reference to the file). Jaq wanted to know if there was a UI for my system - I think there will be. Initially, it will just be using the Finder (and perhaps some Folder Action Scripts to move the files to the right locations), and Spotlight to index the files, but I may move to a proper UI. I think I'll still use Spotlight as the data store - that way it doesn't rely on an external database, and if the data is fixed, it updates in my system automatically. Unlike iTunes. This is really heading back to the way it could be done in BeOS. I could have just had this system, and a series of Queries, and it would have all been beer and skittles. The next step will be to look at Albums. At this stage I'm thinking of using hard links for albums, but the thing that worries me about that is the Macintosh's habit of not rewriting to a file, but saving a new copy, and then overwriting that. Perhaps soft links will be better for Albums. Again, that will rely on the OS doing the maintenance, not my application. Of course, the problem might be with Spotlight not really indexing files that well. I've run mdimport, and only one file seems to really be appearing. The others appear as 'ghost' files, that AFAIK are aliases. Or so it appears to the system. 

[Barber's Adagio For Strings][3] • [William Orbit][4] • [Open Space][5] ★★★★

   [1]: http://home.cfl.rr.com/genecash/digital_camera/EXIF.py
   [2]: http://www.sentex.net/~mwandel/jhead/
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Barber's+Adagio+For+Strings&artistTerm=William+Orbit
   [4]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=William+Orbit
   [5]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Open+Space&artistTerm=

