--- 
wordpress_id: 1128
layout: post
title: Komodo 4.1 Paste Bug
time: "22:08:15"
date: 2007-04-13 22:08:15
tags: 
- komodo
wordpress_url: http://schinckel.net/2007/04/13/komodo-41-paste-bug/
---
I have discovered a bug in Komodo IDE, version 4.1.0-beta1, build 276433, platform macosx-powerpc; Built on Fri Mar 2 17:20:02 2007. If you fill the clipboard with text that is wider than the buffer, which defaults to being 250 characters wide, and paste this into a new document, then the scrollbar down the bottom does not reflect the new width. Thus, if you drag the scrollbar across to the right, you do not see all of the inserted text. If you click on the scrollbar arrow, then you can still move further to the right, as if you drag-select in the editing frame. This bug does not always appear in Windows, which moves the cursor to the end of the inserted text. However, if multi-line text is pasted, then the bug displays itself. Hopefully, the images below make this clearer. I did try to record a screencast, but the quality was crap, and the filesize was huge... Clicking on the images will open them in a new window. You can see enough detail without doing this, if you know what to look for. [![][1]][2] Image 1 shows the HTML document before I paste in the long lines of text. [![][3]][4] Image 2 shows how the Scroll Bar width has not changed. [![][5]][6] Image 3 shows how the full text is not visible if the thumb is fully dragged to the right. [![][7]][8] Image 4 shows how drag-selecting the text changes the size of the thumb. 

   [1]: http://schinckel.net/images/thumb-KomodoPasteBug01.png
   [2]: /images/KomodoPasteBug01.png
   [3]: http://schinckel.net/images/thumb-KomodoPasteBug02.png
   [4]: /images/KomodoPasteBug02.png
   [5]: http://schinckel.net/images/thumb-KomodoPasteBug03.png
   [6]: /images/KomodoPasteBug03.png
   [7]: http://schinckel.net/images/thumb-KomodoPasteBug04.png
   [8]: /images/KomodoPasteBug04.png

