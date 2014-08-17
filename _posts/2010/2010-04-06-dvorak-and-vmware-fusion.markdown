--- 
wordpress_id: 1686
layout: post
title: Dvorak and VMWare Fusion
time: "09:30:49"
date: 2010-04-06 09:30:49
tags: 
- general
- vmware-fusion
- dvorak
wordpress_url: http://schinckel.net/?p=1686
---
I made the choice a year or so ago to go Dvorak: I was on holidays and I spent the time I was free doing a typing tutor. I really liked how quickly I was able to make the transition. Most words and sentences can be written with little movement of the fingers off the home row. I also use the Programmers Dvorak layout, including swapping the orientation of the numeric keypad to be more like a phone, not a calculator. This was the only part I needed to actually swap the keycaps on my keyboards around on, as I touch-type on the main keyboard, but tend to look a bit more when entering values. 

I have noticed that quite a few applications don't handle a different keymap that well. It appears they are using the keycodes, which are independent of the values that should be presented to the operating system. I can understand why this is in many cases: for games for instance, you want to be able to continue to walk around using the aswd keys in World of Warcraft regardless of the layout of the keymap. I guess it makes a bit of sense to pass through this stuff to the virtual machine too: after all, it has its own keymap to interpret. 

With VMWare Fusion, however, the translation of Mac Shortcuts to Windows Shortcuts is slightly broken. Because on my keymap, the ⌘-keys match their keycode (didn't want to re-learn all of the shortcut keys), then they are not passed through correctly. Luckily, they are editable in the VMWare Fusion preferences. Mine now look like this: 

[![][1]][2] 

Now, I can hit ⌘S in notepad, under Windows, and it saves my document. And I can use the cut/copy/paste/undo shortcuts again! 

   [1]: /images/2010/04/vmwarekeyboardshortucts-300x128.png (vmwarekeyboardshortucts)
   [2]: /images/2010/04/vmwarekeyboardshortucts.png

