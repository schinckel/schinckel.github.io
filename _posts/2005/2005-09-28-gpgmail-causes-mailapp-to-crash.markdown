--- 
wordpress_id: 443
layout: post
title: GPGMail causes Mail.app to Crash
time: "22:02:45"
date: 2005-09-28 22:02:45
tags: 
- general
wordpress_url: http://schinckel.net/2005/09/28/gpgmail-causes-mailapp-to-crash/
---
Not that I get a lot of PGP encrypted email, but I had GPGMail installed, and I upgraded to Tiger (I missed the chance to do an Archive & Install, apparently - they hid that a bit too well). Mail complained on startup that GPGMail wouldn't run, but apparently it still was trying to render the emails through it, as every email I tried to view caused Mail.app to crash. A cursory inspection of the Crash Report told me this was the cause. Disabling it fixed it alright. 
