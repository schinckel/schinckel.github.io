--- 
wordpress_id: 1341
layout: post
title: EyeTV and two tuners
time: "10:05:40"
date: 2007-12-24 10:05:40
tags: 
- eyetv
wordpress_url: http://schinckel.net/2007/12/24/eyetv-and-two-tuners/
---
I love my Mac Mini. It does almost everything I want. With the purchase of a second tuner, EyeTV actually becomes useful. Previously, when I tried to record two programs that adjoined one another, but were on different channels, then you were likely to miss the start of the second program, and/or the end of the first program. Even if you set some padding (I use -5/+15), because there was a single time where the transfer needs to take place, chances are you miss some TV.

So, with two tuners, the system flawlessly records two programs at once. Which means the pre/post padding is respected, as long as there is no clash with other scheduled recordings. It means you then need to edit (or just skip, if you plan on watching only, not keeping), but at least you get all of the material. Oh, and it takes up a bit more disk space.

But the hassle I discovered is that the USB subsystem seems to choke under the load, if you record a program and try to watch another. The picture and sound of the program you are watching becomes jumpy and broken.

I made the program smoother by putting the record buffer into RAM. (And making it much, much smaller).

![][1]

Note that this is using a USB disk as the recording location, I'm hoping to get much better performance when I move the drive to a Firewire enclosure. However, I can record two programs without jumpiness, so it may be something to do with the Live TV Buffer and how it is handled.

I don't use live buffering much anyway, so I may just live without.

   [1]: /images/2007/12/200712241100.jpg

