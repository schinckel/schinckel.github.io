--- 
wordpress_id: 765
layout: post
title: Export Artwork and Playlists
time: "22:20:22"
date: 2004-07-06 22:20:22
tags: 
- itunes
- applescript
wordpress_url: http://schinckel.net/2004/07/06/export-artwork-and-playlists/
---
### Exporting Artwork

Seeing as how XBMC won't read the id3 tags from AAC files, I had to grab the artwork from each album and place it in a file (`folder.jpg`/`folder.png`) inside the album folder. This was actually easier with Windows (aargh!), since iTunes for Windows exports album art as BMP files, which can then be processed. Still, it took me most of the afternoon to do that by hand. I had had a bash at doing it with an AppleScript, but could not work out how to get the data from a `<<class PNG/JPEG *>>` structure into an image file. Until I came across a script that does that. It was then a trivial matter to make it so that it worked for multiple files, and only processed those files it needed to, and ignored those without artwork. **Tip:** iTunes will give you an _Out Of Memory Error_ if you try to get the data from a song that has no artworks! (Took me a while to figure this out!) So, the finished script can be found below. I optimised it a bit, but it still takes a while to run, especially if you run it on lots of tracks. Since it's not something you'll want to run every day, this shouldn't be too much of a problem. 

### Exporting Playlists

I also thought it would be neat to get the playlists I use in iTunes (I use mostly smart playlists, such as _50's - 00's Music_, _Not Played Today_, _Recently Added_ and so on), and use them on XBMC. So, I wrote a script that does this, and then ftp's the resulting files to the xbox. You will need to edit the first few lines: it should be obvious what needs to go where. Anyway, you can download [Export Artwork][1] and [Export Playlists][2]. You can also download [Bracket Change][3], a small script that swaps the round & square brackets in a track name. (Right-click and choose to download them, else they will just open in your browser window). All of these files should go into `~/Library/iTunes/Scripts` (User only) or `/Library/iTunes/Scripts` (System-wide) for best effect. **Note:** The first Script is no longer required, since more recent builds of XBMC can handle the data from AAC files. 

   [1]: http://members.optusnet.com.au/~matt.schinckel/files/Export%20Artwork.scpt
   [2]: http://members.optusnet.com.au/~matt.schinckel/files/Export%20Playlists.scpt
   [3]: http://members.optusnet.com.au/~matt.schinckel/files/Bracket%20Change.scpt

