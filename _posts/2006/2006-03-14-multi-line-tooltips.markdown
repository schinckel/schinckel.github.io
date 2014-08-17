--- 
wordpress_id: 761
layout: post
title: Multi-line Tooltips
time: "01:07:57"
date: 2006-03-14 01:07:57
tags: 
- web-design
wordpress_url: http://schinckel.net/2006/03/14/multi-line-tooltips/
---
Firefox doesn't display Title Tooltips very well. If they are too long, it just truncates them: ![Display of Tooltips (href title attribute) under Firefox][1] Camino does a much better job: ![Display of Tooltips (href title attribute) under Camino][2] So does Safari: ![Display of Tooltips (href title attribute) under Safari][3] However, using the [Popup ALT Attributes extension][4], you can get something a little better: ![Display of Tooltips (href title attribute) under Firefox, with extension installed.][5] I'll have a fiddle with the source code, and see if I can get it to break on commas, like the other X browsers do. Opera has a slightly different view of what should be happening. At least they are multi-line, but all of the commas have been removed! And the tooltip is rather wide, on my screen: ![Display of Tooltips (href title attribute) under Opera][6] Internet Explorer (Windows) displays them as: ![Display of Tooltips (href title attribute) under Internet Explorer (Windows)][7] Out of all of these, I like the way Safari and Camino display tooltips, especially in this case, where the list items are in fact seperate posts, and should be displayed on a seperate line. 

   [1]: /images/hrefTitlesFirefox.png
   [2]: /images/hrefTitlesCamino.png
   [3]: /images/hrefTitlesSafari.png
   [4]: http://piro.sakura.ne.jp/xul/_popupalt.html.en
   [5]: /images/hrefTitlesFirefoxPlusExtension.png
   [6]: /images/hrefTitlesOpera.png
   [7]: /images/hrefTitleIE.png

