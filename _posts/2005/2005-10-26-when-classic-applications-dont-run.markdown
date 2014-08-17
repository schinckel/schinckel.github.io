--- 
wordpress_id: 524
layout: post
title: When Classic Applications Don't Run
time: "17:59:52"
date: 2005-10-26 17:59:52
tags: 
- general
wordpress_url: http://schinckel.net/2005/10/26/when-classic-applications-dont-run/
---
_ManOpen_ is a great idea. Why be limited to viewing man pages in the _Terminal _you are working in, when you can offload it to another window, another application even. Even before this came along, I investigated other solutions, like using `groff `to generate a PDF, and viewing that (too slow), and starting a new Terminal window and viewing the man page in that. Generally, this would involve a **Cmd-N**, then `man _whatever_`. Then I found ManOpen. I blogged about how I had some [issues with ManOpen under Tiger][1], but an update fixed this. What the update didn't fix, in fact, what it screwed up were some Classic Applications. See, in OS X, Apple decided to use extensions rather than meta-data as the main way of telling if a file is an application or porn. Or any other type of file, for that matter. Which is all well and good if the application has a name that actually ends in .app. But what about older OS9 applications, like Photoshop 5.5. I know, I know, upgrade to CS. Well, we run that too, but PS5.5 runs under Classic, and we kind of need to run under Classic to get decent print quality. Or decent PDF quality and small sizes. So, _Adobeâ„¢ Photoshopâ„¢ 5.5_, which ends with a `.5` used to work. Before ManOpen decided to '0wn' all of the files that end in _.5_, or `.n` (where _n_ is any single digit, excluding 0). Which meant that trying to run this program caused ManOpen to, well, open. I didn't twig this until I had tried as hard as I could to get _PS5.5_ to actually run itself. File Buddy was showing it as a Classic Application, but the Finder just wouldn't. The bizarre thing is that I only have ManOpen installed under one user's `~/Applications`, so in theory it shouldn't affect other users. But for some reason, it changed the owner of all files ending in `.5`, and Script Editor decided it should try to open it. So, if Google sent you here, the solution is: add `.app` to the file name. It's as simple as that... 

   [1]: http://schinckel.net/2005/10/04/tiger-man-page-for-bash-dodgy/

