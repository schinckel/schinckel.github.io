--- 
wordpress_id: 89
layout: post
title: Cross Compilation NSLU2/MacOSX
time: "23:13:09"
date: 2005-01-18 23:13:09
tags: 
- languages
- nslu2
wordpress_url: http://schinckel.net/2005/01/18/cross-compilation-nslu2macosx/
---
So, I've built the toolchain - it's about 69Mb raw, which zips to about 26Mb. Tarring and BZip2ing it reduces it to 18Mb. What I want to know is: is it only the stuff in bin/ that is used when cross-compiling? If so, this compresses to around 3.6Mb, which is small enough to post for others to use... Also, it's possible to just copy the `armv5b-softfloat-linux-*` files (I used ln, so they are still in the original spot, but take up no extra room) to a place in your path. From what I've just read, the only thing really used is the compiler, but surely the linker is too. I have built a `hello.c` program, but cannot test it until I get my NSLU2. 
