--- 
wordpress_id: 1095
layout: post
title: Use veto wisely under samba
time: "15:37:41"
date: 2007-01-20 15:37:41
tags: 
- nslu2
wordpress_url: http://schinckel.net/2007/01/20/use-veto-wisely-under-samba/
---
I reformatted my file server, and installed OpenSlug on it (much faster than LinkSys firmware, I've noticed), and when I was setting up the Samba shares, I thought I'd be a clever bastard, and outsmart the Finder. See, when you access a directory, or copy files using the Finder, and you are copying to a non-HFS disk, it creates a file `._Filename.ext` that stores meta-data, the new version of the Resource Fork, for all of you old-school Mac heads. So, I thought, if I use: `veto files = /._*/.DS_Store/` then I won't have any problems with these files littering up the directory structure. But, this won't work. It doesn't allow for the creation of these files, which causes the Finder to choke: ![][1] Removing the veto (I moved it into hide files, which should prevent other clients from seeing them) fixed the problem. For search engines, the text of the dialog box is: 

> You cannot copy some of these items to the destination because their names are too long or contain invalid characters for the destination. Do you want to skip copying these items and continue copying the other items? 

It took me quite a while to figure out why this was happening... 

   [1]: /images/Veto_Dot_Underscore.png

