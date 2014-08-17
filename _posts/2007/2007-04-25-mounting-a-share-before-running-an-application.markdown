--- 
wordpress_id: 1135
layout: post
title: Mounting a share before running an application
time: "11:40:23"
date: 2007-04-25 11:40:23
tags: 
- itunes
wordpress_url: http://schinckel.net/2007/04/25/mounting-a-share-before-running-an-application/
---
I have all of my Music, Movies and TV shows stored digitally on a server, located just below my feet at the moment, but soon to be shifted to another location. This server just runs SMB file sharing, and provides access to the same files, as well as a heap of other data, to all of the machines in my network. It also provides easy access to media and installers for guest users, too. The one thing I like about Windows[1][1] over OS X is that you can have shares set to auto-mount on bootup. I used to use an AppleScript to do this, which was okay, except OS X still disconnects when you sleep. Not that I sleep my machine much, anyway. Then today, I read a great hint on [MacOSXHints][2]: [Make sure iTunes mounts a networked music library][3]. Basically, instead of running iTunes from the location it is installed in, you create an alias on the music server volume, and run it (via another alias back into the dock) from there. Then, before loading iTunes, it mounts the volume, if it can find it. Otherwise, iTunes will not run. Which is fine by me, since all of my music is on that server! 

  1. Mind you, Windows does have some other crappiness in conjunction with this. Lately, I've been finding that it won't always mount all of the shares, even though I chose automatically mount after rebooting, and it sometimes forgets my passwords. Similarly, you cannot connect more than once to a server with different credentials. I mean, seriously?

   [1]: #note1
   [2]: http://www.macosxhints.com
   [3]: http://www.macosxhints.com/article.php?story=20070422091558914
