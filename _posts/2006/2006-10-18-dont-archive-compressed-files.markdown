--- 
wordpress_id: 1012
layout: post
title: Don't Archive Compressed Files
time: "18:03:02"
date: 2006-10-18 18:03:02
tags: 
- rants-and-raves
wordpress_url: http://schinckel.net/2006/10/18/dont-archive-compressed-files/
---
I recently had cause to download something via bit-torrent: it's immaterial if the something was legal or not, but I did notice, sometime after starting the 710Mb download, that the torrent had a series of files inside of it: 

> filename.nfo filename.part01.rar filename.part02.rar ... filename.part51.rar filename.sfv

Thankfully, The Unarchiver.app was able to decompress this multi-part RAR archive. However, the file that was created, filename.ext, was 700.2Mb. That's right, the compressed version of the file was larger than the original. There really is no need to do something silly like compress MP3, AAC, AVI or other already compressed media files. If the compression scheme that was used to create the file from uncompressed data (i.e., WAV audio file, .DV movie) is worth it's salt, it will already be much smaller than the same file compressed using RAR, ZIP or whatever. Files that are compressed are reduced using an algorithm that looks for patterns in the data, and replaces duplicates with an alternative. Data that has already been compressed will be effectively random, as any duplicate patterns will already have been removed. Thus, you are wasting CPU time in compressing the files further, and in fact, in many cases, will end up with files that are larger. This is due to the inherent overheads in compressed archives. So, whoever created that .torrent, you wasted a bit of my time, and everyone who has read this since... 

[Make It Easy On Yourself][1] • [The Walker Brothers][2] • [The Love Songs Of Burt Bacharach][3] ★★

   [1]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Make+It+Easy+On+Yourself&artistTerm=The+Walker+Brothers
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=The+Walker+Brothers
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=The+Love+Songs+Of+Burt+Bacharach&artistTerm=

