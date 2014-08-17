--- 
wordpress_id: 1185
layout: post
title: Subversion and OS X
time: "16:29:39"
date: 2007-07-05 16:29:39
tags: 
- programming
wordpress_url: http://schinckel.net/2007/07/05/subversion-and-os-x/
---
There are a couple of cool things you can do with Subversion and OS X. The first is the Finder plugin, that recognises when you are viewing files that have been checked out of an SVN repository, and puts nice little badges on the icons, so you can see if they are up to date, changed or not in the repository. This is great for a couple of reasons - it works regardless of IDE or editing program(s) you are using. As it turns out, both things I use (Komodo and Xcode) have SVN handling built in (or at least I think Komodo Edit does, I'm still using the Komodo IDE demo on my new machine...). But sometimes I want to have files that are of a different format, or projects that are not necessarily coding projects, that I still want to have version control over. So, I have a local subversion repository directory (~/.SVN, so I don't see it in the Finder, but it should still be backed up when I back up my home directory), and I've currently got a couple of repositories - one for [Jaq's website][1], and another for my new project, which will (eventually) add the ability to change an iCal event attendee's status with a pop-up menu. The first of these brings up the only limitation of SVN I've come across so far. I use xattrs to store metadata in a multi-machine setup (more than one Mac can't seem to share metadata very well, things like Finder comments aren't always propagated across network shares). SVN doesn't seem to store xattrs, which makes the really cool system I made for generating Jaq's website fairly useless. 

   [1]: http://www.jaquiehagan.com

