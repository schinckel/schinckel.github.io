--- 
wordpress_id: 1224
layout: post
title: which python?
time: "19:55:42"
date: 2007-07-24 19:55:42
tags: 
- python
- ecto
wordpress_url: http://schinckel.net/2007/07/24/which-python-2/
---
I came across a strange issue today. I have written a script that adds acronym tags to a post created in ecto, and another that adds the currently playing iTunes track, as nice links to iTMS. However, the problem that arose is that the script wouldn't run. I had the shebang line, and everything, but no joy. Then I noticed that I have upgraded my python installation to 2.5, but for some reason the `/usr/bin/python` was still pointed at 2.3 - but my interpreter run from the bash shell, or from Komodo was 2.5. This itself wouldn't be too much of an issue, except I was using _appscript_, and I had only installed _appscript_ into the 2.5 Python installation library. So, it was failing (way too silently, for my liking), and I couldn't tell why. All fixed now, though. 

[Fly Me Away][1] • [Supernature][2] • [Goldfrapp][3]

   [1]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Fly%20Me%20Away
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Goldfrapp&albumTerm=Supernature
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Goldfrapp

