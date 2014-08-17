--- 
wordpress_id: 1335
layout: post
title: EyeTV Settings of Interest
time: "18:22:38"
date: 2007-12-22 18:22:38
tags: 
- eyetv
wordpress_url: http://schinckel.net/2007/12/22/eyetv-settings-of-interest/
---
Still hacking away with EyeTV.

`$ defaults read com.elgato.eyetv`

Has some interesting values:

  * "use TenFoot UI" = 0;
  * volume = 1;
  * picture = { brightness = 128; contrast = 142; hue = 128; saturation = 128; };
  * "pip offset horizontal" = 0.08333333333333333;
  * "pip offset vertical" = 0.08333333333333333;
  * "pip rel height" = 0.25;

I'm guessing that the volume one might be useful, if you can make it louder than 1. As for the PIP settings, as I've found the window to be somewhat too large.
