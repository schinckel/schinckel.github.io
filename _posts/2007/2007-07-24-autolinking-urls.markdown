--- 
wordpress_id: 1225
layout: post
title: Autolinking URLs
time: "21:38:08"
date: 2007-07-24 21:38:08
tags: 
- programming
wordpress_url: http://schinckel.net/2007/07/24/autolinking-urls/
---
I use ecto for posting, which is pretty cool. I'd like to be able to have it so that it creates links automatically from URLs that I happen to write in. Thus _http://www.google.com_ automatically becomes <a href="http://www.google.com">http://www.google.com</a> enabling me to just enter a URL in a post. The best method for doing this would have to be regex: 
    
    ((?<!(<a href="))(?<!(>))((https?|ftp://)|((mailto|aim|svn):)|(file:///)|((?<!://)www\.))[a-zA-Z0-9_$!&%?,#@'/.*+;:=~-]+\w)\.{0}

This will match a URL that isn't already in an href link. Took me ages to work out. This will also match www.google.com. And not the dot at the end. I'm still working on code that will create links. I think a seperate regex for each type of URL might be useful. 

[Hamoa Beach][1] • [Gomez][2] • [How We Operate][3]

   [1]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Hamoa+Beach&artistTerm=Gomez
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Gomez
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=How+We+Operate&artistTerm=Gomez

