--- 
wordpress_id: 1165
layout: post
title: wget and large files
time: "15:31:09"
date: 2007-06-11 15:31:09
tags: 
- software
wordpress_url: http://schinckel.net/2007/06/11/wget-and-large-files/
---
Apparently, wget is only able to recognise files smaller than 2G as proper sizes. You can download files larger than this, but unusual sizes are displayed: ![negative file sizes displayed by wget][1] This was funny when I first started this download, as it reported a negative number of bytes to go, but after crossing the 2G threshold in downloads, it now reports a true value of the file size remaining. 

[Shoulder Holster][2] • [Morcheeba][3] • [Big Calm][4] ★★

   [1]: http://schinckel.net/images/negative_file_size.png
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Shoulder+Holster&artistTerm=Morcheeba
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Morcheeba
   [4]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Big+Calm&artistTerm=Morcheeba

