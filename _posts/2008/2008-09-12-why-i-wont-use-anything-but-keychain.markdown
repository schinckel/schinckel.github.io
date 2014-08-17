--- 
wordpress_id: 1550
layout: post
title: Why I won't use anything but Keychain
time: "17:34:20"
date: 2008-09-12 17:34:20
tags: 
- macos-x
wordpress_url: http://schinckel.net/2008/09/12/why-i-wont-use-anything-but-keychain/
---
Since I got my laptop, I no longer need to use either the same password for everything, or the same 'head', and contextual 'tails' for each site. (For instance, a head of 'foobar' and a tail like 'macosxhints' results in a password of 'foobarmacosxhints' for the MacOS X Hints website).

Instead, I can rest assured that I can type any random sequence of characters into the password box, and have the keychain remember them. It has the side effect that I don't use Firefox, only Safari (or Camino, which also accesses the Keychain, like a good OS X application should).

It gets even better when you use something like QuickPass, which lives in the menu bar, and every time you need a password, it generates a whole stack of random ones for you:

  
![QuickPass.png][1]

Note, that since I didn't actually choose any of these, they aren't used for any of my passwords. Selecting one puts it into the clipboard, which is the only real security issue. If someone else got access to my clipboard, then they could see my password.

Since no one else gets hold of my laptop at all, then I'm fairly secure.

I will not use any other password storage system, since not only does it save my web passwords, but passwords for dozens of other applications too. Ecto stores it's passwords for blogs there. Airport Utility stores passwords for the wireless routers I manage, as well as WPA keys for networks I use. These passwords are all secured (with the keychain protected by my login password), and yet I don't need to copy-paste them, since the application(s) that need access are granted access on a need-to-know basis by the system.

I think this is one of the best features of the OS. No longer do I need to remember passwords, nor store them in a text file. As long as the browser I use accesses keychain, then I have all of my web passwords available in each browser.

So, the idea of Gorilla Password doesn't appeal to me at all. Not least that I don't have to use other machines (other than one unix system, which I only use at Uni, and then only store one password on, to access the Uni learning web-app), but the fact it doesn't use system-provided services. That's one of the main issues of cross-platforminess.

   [1]: /images/2008/09/quickpass.jpg

