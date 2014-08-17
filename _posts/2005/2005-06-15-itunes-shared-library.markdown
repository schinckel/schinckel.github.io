--- 
wordpress_id: 224
layout: post
title: iTunes Shared Library
time: "13:04:45"
date: 2005-06-15 13:04:45
tags: 
- itunes
wordpress_url: http://schinckel.net/2005/06/15/itunes-shared-library/
---
Jaq and I share two computers, an iMac G4, and a Dell PC. I also bought a Linksys NSLU2 and a large USB Hard Drive, so that all of our music and videos can be stored on a server, and accessed from either computer (or the Xbox) without having to make sure the iMac was on. (That was the main computer, and the one we fight to get onto). Of course, the NSLU2 helped remove clutter from the iMac's hard drive, not to mention freeing up a heap of space. Anyway, because we have a rather large music collection, it's meaningless and wasteful to have copies of music stored in two places - I set up an SMB share on the NSLU2, wrote a small AppleScript to mount this on bootup, and pointed iTunes towards this location. This has the feature of storing one copy of all of our music, in the one location. There are some drawbacks, however:

  1. If I import music, it doesn't appear in Jaq's library by default. Similarly, if she imports, I don't see it. Every now and then you need to drag the Music folder onto iTunes, and wait for it to update the library. Both of us need to do this, incase both of us have imported music.
  2. If one of us edits a track's artist, title or album, iTunes for the other user sometimes cannot find the track. If you then re-import you wind up with two copies of the track, one of them (the one with the rating, and playcount) is a 'dead track'.
  3. Sometimes a re-import causes a track to appear twice in the library. Sometimes it creates a second copy of the file in the directory.
  4. There is a lot of music in our library that one or other of us doesn't really like that much. For instance, I listen to a lot of Classical music, but don't like Red Hot Chilli Peppers. Even if you remove a track from your library, it gets re-added when you do a re-import.

Of course, there are some great benefits, too:

  1. Each person gets to have their own rating and playcount for each track. Initially we had a shared iTunes library file (both of us had read/write access to it), which worked well when only one user could run iTunes at a time, but fails dismally when multi-user is taken into account.
  2. Our iTunes library only takes up half of the space.
  3. I can modify the tags belonging to a track, and it gets propogated to her library.

I'm fairly confident the benefits outweigh the costs, but I'm still keen to come up with a better solution. Here are some ideas I have had to resolve some of the issues. iTunes stores a copy of it's library in an XML file - it should be a trivial task to scan this and get some information that might be useful. For instance, compare the location field of each track to the directory structure, and work out if there are tracks that need to be added, or the path they have needs to be updated. 

This requires a couple of things: 
  * A decent XML parser (in some cases just a simple grep will do the trick - for instance seeing if a filename exists in the XML file).
  * An interface (AppleScript) to iTunes, to tell it to add/remove/re-locate files.
