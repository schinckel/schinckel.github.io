--- 
wordpress_id: 774
layout: post
title: More on Sharing iTunes Songs
time: "23:30:11"
date: 2004-07-01 23:30:11
tags: 
- itunes
- bash
wordpress_url: http://schinckel.net/2004/07/01/more-on-sharing-itunes-songs/
---
After all of the mucking around with getting an AppleScript to work, and then using python anyway, I discovered a far faster method of adding tracks to iTunes: just drag the folder they all live in, and iTunes will only add the songs that aren't in the Library yet! Probably well documented, but I didn't find it! What you may need to do, particularly if multiple people need to be able to change MP3 Tags or artwork, is do the following: 

  * Change the owner/group of the files to something that all people can access - I use shared/admin, since all non-admin users are scum, and do not need to be able to change stuff. 
  * Change the protection bits of the files to allow owner R+W, group R+W, all R. 

Code to do this should be easy: ` find ~shared/Music -name *.m* -not -perm 664 -exec chmod 664 {}; find ~shared/Music -name *.m* -not -owner shared -exec chown shared:admin {}; ` But bash interprets the ; itself, and gives the following error: `find: -exec: no terminating ";"` Bitch. Can't be bothered figuring out how to use another shell, so knock up a script in python: [UpdateShared.py][1] This script also updates the owner/group and permissions for files in ~shared/Movies and ~shared/iPhotoLibrary. **Update:** the `;` must be `\;` for the bash commands to work. 

   [1]: http://members.optusnet.com.au/~matt.schinckel/files/UpdateShared.py

