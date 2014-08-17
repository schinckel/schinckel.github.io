--- 
wordpress_id: 1162
layout: post
title: VMWare Fusion and OS x86
time: "09:36:44"
date: 2007-06-09 09:36:44
tags: 
- osx86
wordpress_url: http://schinckel.net/2007/06/09/vmware-fusion-and-os-x86/
---
Don't, under any circumstances, even try to install VMWare Fusion if you are running OS x86. That is, on a non-Apple machine. I think it happened with the last beta too, but this one causes a Kernel Panic on installation, after it has managed to install the files that cause the panic. Which means a reboot also causes a panic. If you find this happens to you, boot in Single User mode (-s), and, after running fsck and mounting the root partition as readable, move or delete one or both of the following things: 

  * `/Library/Application Support/VMWare Fusion/`
  * `/Library/LaunchDaemons/com.vmware.launchd.vmware.plist`

Then, reboot, and run the Uninstaller. 

[Lazy River][1] • [Louis Armstrong][2] • [This is Jazz 1][3] ★

   [1]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Lazy+River&artistTerm=Louis+Armstrong
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Louis+Armstrong
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=This+is+Jazz+1&artistTerm=Louis+Armstrong

