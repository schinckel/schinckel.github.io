--- 
wordpress_id: 1394
layout: post
title: Changing UNIX shell without actually changing it
time: "19:48:41"
date: 2008-03-31 19:48:41
tags: 
- bash
wordpress_url: http://schinckel.net/2008/03/31/changing-unix-shell-without-actually-changing-it/
---
Very rarely, I encounter a computer system I have to use regularly, but I don't have _superuser_ status on. Notably, at Uni, I have access to a SunOS system, where I actually have to use it from time to time. Most of the time this is just via `ssh`, but sometimes it's a physical login to a SunRay workstation.

I much prefer `bash` over other shells, not because it is necessarily better, but that it is just the one I use most of the time. I've got some nice systems to help me out, like using a different colour for the `user@host` string on each machine, so I can easily see which machine the current `ssh` session is actually logged into.

However, at Uni there are lots of restrictions. We can run `/usr/bin/bash`, but we can't change our default shell to it. In fact, we can't change our default shell _at all_, which is kinda dumb. I've tried all sorts of tricks, but I just can't do it.

The next step is to have your `.login`, or whatever, run the shell you want. For me, this is safe-ish, since `tcsh` (the current default shell) executes the contents of `.login`, but `bash` doesn't. If you are using one shell that uses a particular login or profile file, and you want to change to another which uses the same file, you might struggle, or get stuck in an infinite loop. Which is probably worse.

Just having `/usr/bin/bash -login` in your `.login` file will then cause `bash` to run, and execute the contents of your `.profile`: without the `-login` it won't execute the contents of said file. But what about when you exit the `bash` shell, using _Ctrl-D_, or `exit`, or `logout`, or whatever?

If you put a `logout` after the `/usr/bin/bash -login` line will cause the original shell to logout immediately after leaving the bash shell. Which is exactly what we want.

Now, all I need to do is figure out how to get rid of the line that says : `tcsh: using dumb terminal settings.`

That one's too easy. Use `xterm` instead of `xterm-color` in the Settings➞Advanced area of the Terminal Preferences: 

![xterm-color.png][1]  


   [1]: /images/2008/03/xterm-color.jpg

