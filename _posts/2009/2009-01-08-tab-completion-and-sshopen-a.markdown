--- 
wordpress_id: 1631
layout: post
title: Tab completion and ssh/open -a
time: "10:08:31"
date: 2009-01-08 10:08:31
tags: 
- bash
- macos-x
wordpress_url: http://schinckel.net/2009/01/08/tab-completion-and-sshopen-a/
---
I use the Terminal just as much as the Finder, and have tab-completion turned on in bash. To make it better, you can set it so that it will complete differently depending upon what you have already typed in.

The first one of these tips will autocomplete from the ~/.ssh/known_hosts file, so that when you type in:

`$ ssh ma[tab]`  

{% highlight bash linenos %}
complete -W "$(echo `cat ~/.ssh/known_hosts | cut -f 1 -d ' ' | sed -e s/,.*//g | uniq | grep -v "\["`;)" ssh
{% endhighlight %}
    
it will autocomplete the servers you ssh to that start with "ma".

The next one is more complicated - it allows you to complete from all available applications when typing:

`$ open -a [tab]`  

{% highlight bash linenos %}
complete -W "$(/bin/lsregister -dump | /usr/bin/sed -E -n -e '/\/Applications/{s/^.+ ((\/Applications|\/Developer).+\.app)$/\1/p;}' | \/usr/bin/sed 's/ /\\ /g' | \/usr/bin/sed -e s/\'/\\\\\'/g | /usr/bin/xargs /usr/bin/basename -s '.app' | /usr/bin/sed 's/ /\\\\\\ /g')" open -a
{% endhighlight %}

These can be added to one of your bash startup files: mine live in `~/.bashrc`. 
