--- 
wordpress_id: 1410
layout: post
title: Mercurial with OS X GUI tools.
time: "18:35:38"
date: 2008-04-26 18:35:38
tags: 
- software
wordpress_url: http://schinckel.net/2008/04/26/mercurial-with-os-x-gui-tools/
---
Before anyone gets excited, this isn't about the long-awaited Finder plugin that will do for `hg` repositories what [SCPlugin][1] does for `svn` repositories: adding badges to the icons and allowing operations from within the Finder.

No, this is about using two great tools, [SubEthaEdit][2] and [Changes][3] with [mercurial][4].

Firstly, let's look at how we can use SubEthaEdit to be the editor for commit messages.

SubEthaEdit has a command line tool, which has some useful arguments. Use `man see` to see them.

The first of the ones I use is `-w`, which waits until the file has been closed before continuing the execution of the calling program. This is a required argument, as without it your message won't be committed properly.  


The next I use is `-r`, which causes the application that called see to be brought to the front after closing the file. This is not completely necessary, but saves a mouse-click.

`-o new-window` means open the file you are planning to edit in a new window. Again, not completely necessary, and irrelevant if you don't use tabs at all, but I find it helps me to see which file I am editing if it appears 'new'.

`-m` allows you to choose a particular mode to edit the file in. I have created a handy little `hgCommit` mode, so this can be used. I like this idea, as it means that lines that will not be committed are easily distinguished. And you can use a different background colour, so that it's really clear what you are doing.

Finally, `-j` allows a custom title addition. Again, this is just a nicety, but I use it nonetheless.

The file `~/.hgrc` allows you to have settings for an editor - I find that SubEthaEdit doesn't quite work right with crontab, so I leave the `EDITOR` environment variable to nano. In the `[ui]` section of the `.hgrc` file, I have a line that looks like:

`editor = see -w -r -o new-window -m hgCommit -j 'Mercurial Commit Message'`  


My hgCommit mode can also be downloaded, if you wish: [hgCommit.mode.zip][5].

The next hint is using Changes. You'll probably know this, if you have read the Changes WIki, but you can use the extdiff extension of Mercurial. The bit I missed is that you can also use Changes to merge by default. I wish you could do the same for diff.

To make Changes the default merge tool, create a script at `/usr/local/bin/chmerge`, or somewhere similar.

All that needs to go in this file is:

{% highlight bash linenos %}
    #!/bin/sh
    chdiff ---wait $3 $1
{% endhighlight %}

And ensure it is executable. Mine is also owned by root, I think.

Then, in your `.hgrc`, add in the following line after your editor line:

    merge = /usr/local/bin/chmerge

My final hint is how to get around errors when you have a remote filesystem mounted under sshfs, and you get an untrusted user or group error when trying to perform a mercurial operation. In my case, the files in question were owned by `user 1001`/`group 1001`. I added the following to my `.hgrc`:

{% highlight ini linenos %}
    [trusted]
    users = 1001
    groups = 1001
{% endhighlight %}

   [1]: http://scplugin.tigris.org/
   [2]: http://www.codingmonkeys.de/subethaedit/
   [3]: http://changesapp.com/
   [4]: http://www.selenic.com/mercurial/
   [5]: /images/2008/04/hgcommit.mode.zip (hgCommit.mode.zip)

