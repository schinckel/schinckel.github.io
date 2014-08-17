--- 
wordpress_id: 1524
layout: post
title: Fighting with ssh.
time: "18:30:23"
date: 2008-07-31 18:30:23
tags: 
- general
- scm
- unix
wordpress_url: http://schinckel.net/2008/07/31/fighting-with-ssh/
---
It's still relatively unusual for me to have to work on a system that I don't have superuser status on - at home I am the administrator of all of the machines, and at work I have sudo privs on both the development and production servers.

At Uni, however, I have to play by some other dude's rules.

And, that means sometimes not having software installed that I need.

Take mercurial, for instance. I use this as my exclusive RCS, because it is simple to set up a repo, easy to clone, plays nice with OS X, and with Trac. It's extensible, and easy to merge changes from clones.

But it isn't installed as standard, or even at all on the Solaris machines at Uni. SVN is, but I'm not about to go through the whole rigamarole of setting up an svn server again. It just doesn't do anything for me that mercurial doesn't but it's more setup work.

And I create new repos all of the time. I have one for each of my topics, and every time I start a new project, I create a new repository. It's just that simple: hg init.

So, I tried installing it as a general user. I have it so that it works to some extent: I have the ability to change my environment variables, so I can add `~/bin` to my path, stick all of the hg files in there, and then the `mercurial/` directory into `~/.python`, which I then make my `PYTHONPATH`.

Then, I can happily use `hg` while ssh'd in (or logged in to one of the SparcStation machines).

But, I can't use the remote access.

See, `ssh <machine> hg <command>` will not work unless a) `hg` is in the system path, and b) `mercurial` is in the system python directory. You can fudge the first part (by explicitly telling the local hg where to look for the remote hg) but then I can't figure out how to tell it where to load the python classes from.

So, my solution is this: mount the folder using `sshd` (or in my case, `ExpanDrive`). Then clone the repository from the local machine. You can then happily work away on either machine, but to push/pull you need to have the folder mounted.

Bit of a bummer. I've asked for mercurial to be installed, but we'll see if that happens or not...
