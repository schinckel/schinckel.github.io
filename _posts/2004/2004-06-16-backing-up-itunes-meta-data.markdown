--- 
wordpress_id: 128
layout: post
title: Backing Up iTunes Meta-Data
time: "03:12:10"
date: 2004-06-16 03:12:10
tags: 
- itunes
wordpress_url: http://schinckel.net/2004/06/16/backing-up-itunes-meta-data/
---
iTunes stores most of the meta-data about songs as id3 tags when you have MP3 files in your collection. I'm not sure what it does with AAC - probably they can have id3 tags or similar as well. However, some important bits of data are not stored - the play count, the rating and the added/played dates. [Rating Writer][1] (written by [Cornelius Qualley][2]) fixes some of this, but I thought I would expand it so that it stores the other bits. And so that it is smart about not overwriting comments. Enter [iTunes MetaData BackUp.scpt][3]. Once again I am reminded of how crap AppleScript is if you are not just doing something really basic. Python so rocks. Finally, though, I managed to get everything working, with one exception: you do not seem to be able to convert back into a date from a string, unless you just typed it in as code. I've tried, several times, including stripping out trailing newlines, and then finally by creating a function/subroutine to do it manually. But guess what. None of them actually work. iTunes will not accept any type of date back in. So, it only backs up and restores the rating and the played count. Hardly three hours work, in the end. _Swears under breath._

   [1]: htp://RatingWriter.MidwestDJs.com
   [2]: mailto:cutmoneyc@midwestdjs.com
   [3]: http://members.optusnet.com.au/~matt.schinckel/files/iTunes%20MetaData%20BackUp.scpt

