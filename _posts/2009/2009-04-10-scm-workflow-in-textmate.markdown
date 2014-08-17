--- 
wordpress_id: 1646
layout: post
title: SCM workflow in TextMate
time: "17:32:57"
date: 2009-04-10 17:32:57
tags: 
- general
- textmate
- scm
wordpress_url: http://schinckel.net/2009/04/10/scm-workflow-in-textmate/
---
I'm loving coding in [TextMate][1] - it makes ruby much more fun. And python, too.  

It integrates really well with heaps of other tools, including my diffing app of choice ([Changes.app][2]), and my preferred DVCS ([Mercurial][3]).

It even has its own Commit pane that appears when you choose to commit. There is one problem with it, however. Invariably I have made a change to a file and can't remember exactly what it was. You can't view the changes using the Mercurial bundle and Changes, and leave that window open while you commit. So, I end up having a terminal window open that I type `hg chdiff` into.

Instead, we should be able to quickly see the changes made to the working copy. Perhaps using a button like below:

[![][4]][5]

Of course, that's just a mockup (although it is done in IB) - the button is not connected up to anything. I have no idea how to reverse engineer the Commit.app to do this. But it would be cool. 

Update: It appears all you have to do is tell the CommitWindow.app tool that you want to use `--diff-cmd "hg,diff"`, and it is all done.

   [1]: http://macromates.com/
   [2]: http://changesapp.com/
   [3]: http://www.selenic.com/mercurial/wiki/
   [4]: http://ember.realmacmedia.com/files/50604720849defb2299a74_m.png
   [5]: http://emberapp.com/schinckel/image/textmate-commit-app-diff

