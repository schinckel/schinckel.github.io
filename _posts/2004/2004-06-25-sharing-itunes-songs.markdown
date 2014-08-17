--- 
wordpress_id: 777
layout: post
title: Sharing iTunes Songs
time: "23:34:23"
date: 2004-06-25 23:34:23
tags: 
- itunes
- python
- applescript
- xbmc
wordpress_url: http://schinckel.net/2004/06/25/sharing-itunes-songs/
---

I finally got around to downloading the 10.3.4 OS X update, <a href="http://www.hornware.com/sharepoints/">SharePoints</a>, and <a href="http://www.xboxmediacenter.de/">Xbox Media Centre</a> (XBMC).  My aim for some time has been to share my iTunes library to my Xbox, which is connected up to the TV and Stereo in the lounge.

The MacOS X update provided (apparently) updated Samba sharing, but I still couldn't get XMP (Xbox Media Player - the previous incarnation of XBMC) to connect to the SMB share I had set up, with all of my MP3s on it.  SharePoints fixed that - all I had to do was create a publicly available share.  

Setting up XBMC was a breeze, and it even has a cool interface!  UnleashX is (almost) banished from my system, and XBMC is my main Dash.


Then I discovered that XCMC can play AAC files!  So, I started (and have not yet finished) converting all of my MP3s to AAC.  And not just converting, but re-importing, at a bitrate of 128 (small file size, but apparently equivalent to 256 in MP3).  See <a href="http://www.macosxhints.com/article.php?story=2004022711221967">this</a> hint for some tips (and my comments).

I also wanted to re-jig how I had set up sharing my iTunes songs between users - I had a couple of links to the relevant files in each user's `~/Music/iTunes`, and all files were located in <code>~shared/Music</code> (which all of admin can RW, and all of the world can R).  I needed to have seperate Library files, so that we can have our own ratings (I hate Abba, and she isn't that big a fan of Paul Kelly, for instance).  So, I knocked up a script that scanned the <code>~shared/Music</code> folder and compared any files found to the iTunes LIbrary.  If they weren't in it, it added them.

Here we go:

{% highlight applescript linenos %}
set _tracks to “”
tell application “iTunes”
    set sel to tracks of playlist 1
    –set sel to get a reference to selection
    repeat with t in sel
        set _tracks to _tracks & “
” & (location of t as string)
    end repeat
end tell

tell application “Finder”
    set _files to “”
    set _library to “Macintosh HD:Users:Shared:Music”
    set _artists to folders of folder _library
    repeat with _artist in _artists
        set _albums to folders of _artist
        repeat with _album in _albums
            set temp to files of _album
            repeat with _file in temp
                set _files to _files & “
” & _file
            end repeat
        end repeat
    end repeat
end tell
set _missing to “”
repeat with para in paragraphs of _files
    set para to para as string
    if para is not in _tracks then
        set _missing to _missing & “
” & para
    end if
end repeat

tell application “iTunes”
    repeat with para in paragraphs of _missing
        set para to para as string
        if para is not “” then
            set _file to para
            add _file
        end if
    end repeat
end tell{% endhighlight %}




Which worked, but was a bit slow.  So I came up with the following system instead:

Create a file called <code>~/.last_check</code>

Enter the following into a script, and then run it. (I've had to modify some lines to get it to look good - particularly the fp=os.popen... line).

{% highlight python linenos %}
#! /usr/bin/env python 
# Check for songs newer than ~/.last_check, and add them to iTunes

import os
import sys

fp = os.popen(
"find ~shared/Music -name *.m?? -newer ~/.last_check")

data = fp.readlines()

if len(data) == 0:
    print "No New Songs."
    sys.exit(0)
    
for line in data:
    filename = "Macintosh HD"+line[:-1]
    filename = filename.replace("/",":")
    print "Adding", filename
    os.system('''osascript < <END
tell application "iTunes"
add "'''+filename+'''"
end tell
END
''')
{% endhighlight %}

Should be pretty quick - I only tested it with a few files, but seems to work okay.  iTunes is even smart enough to not re-add files that are already there (I think!), so it won't add duplicates!

My library lives in <code>~shared/Music</code>, yours may vary!

You will, however, need to use something like <a href="http://www.malcolmadams.com/itunes/scripts/scripts01.php?page=1#removedeadsuper">Super Remove Dead Tracks</a> if you update one library with a new encoder!

I accept no responsibility if it screws up your iTunes Library file!
