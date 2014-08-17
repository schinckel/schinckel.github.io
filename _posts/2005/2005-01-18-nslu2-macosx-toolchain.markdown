--- 
wordpress_id: 90
layout: post
title: NSLU2 MacOSX Toolchain
time: "18:09:52"
date: 2005-01-18 18:09:52
tags: 
- languages
- nslu2
wordpress_url: http://schinckel.net/2005/01/18/nslu2-macosx-toolchain/
---
I've just paid for (and expect to receive in the next couple of days) a large (160Gb) USB Hard Drive, and in the next week or so I'll also buy a Linksys NSLU2 NAS device, to share the HDD with all devices in my network. One of the reasons I decided on this route is the extreme hackability of the NSLU2 - it comes with a cut-down version of Linux with only SMB sharing turned on, but by flashing a new ROM it's possible to set it up as a complete server. I aim to use it for mainly sharing files, but just for fun I'll try and build [python][1] for it. I had a whole lot of experience building python for BeOS/PPC a few years back. It started to run into problems when building sockets and anything that used mmap(), and after about 2.2 I'm not sure I ever got it to work correctly again. Building the cross compilation toolchain to allow me to do this from MacOS X is quite complicated: you have to download about 60Mb of source code, and then build it. More details on [this page][2]. My notes on the topic follow: Make sure you reference the nslu2/bin directory in your path before the other location where the tools you installed are. Bash looks in the order they appear in the environment library list, so if expr is in two places, the first one it is found in is used, for example. The good news is, if the files have been downloaded, and the build fails, it is smart enough not to try and re-download them. Make sure you follow the instructions carefully - I did a `make install` instead of the `cp src/expr $HOME/local/nslu2`, and it failed dismally. 

   [1]: www.python.org
   [2]: http://www.nslu2-linux.org/wiki/HowTo/CompileCrossToolOnOSX

