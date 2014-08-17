--- 
wordpress_id: 86
layout: post
title: MacOS X Slowdown II
time: "04:37:44"
date: 2005-01-19 04:37:44
tags: 
- general
wordpress_url: http://schinckel.net/2005/01/19/macos-x-slowdown-ii/
---
I had noticed my iMac 1.25 GHx slowing down. Here's what sped it up most: 

  * Getting more RAM. I upgraded from 256 Mb to 768 Mb. Applications loaded faster, particularly when lots of them were already running. Especially noticeable when other users were still logged in.
  * Cleaned Application cache. Using System Optimizer X I was able to do this, which while it makes each application pop up a dialog the first time it is run via a double-click on a document, fixes corruption in the Application Cache, enabling applications to load much faster. This includes the Finder, so it only takes seconds (instead of minutes) to log in.
  * Update executable library prebindings. Since this too was done with SOX, I wasn't able to tell which of these two made the biggest difference.

No, I'm not affiliated with SOX, and apparently it's possible to do just about everything here with CLI commands, I just don't know what they are yet... 
