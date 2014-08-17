--- 
wordpress_id: 1679
layout: post
title: Am I connected remotely?
time: "23:31:34"
date: 2010-03-30 23:31:34
tags: 
- bash
- macos-x
wordpress_url: http://schinckel.net/2010/03/30/am-i-connected-remotely/
---
I now share my dotfiles between the various OS X machines I use daily, using Dropbox and symlinks.

However, I have many aliases and functions that need to act differently if I only have a console session at the machine in question, or a full GUI session.

With bash, this is easy to test:
        
{% highlight bash linenos %}
export EDITOR='nano'
if [[ -z "$SSH_CONNECTION" && $OSTYPE =~ ^darwin ]]; then
export EDITOR='mate --wait'
export TEXEDIT='mate -w -l %d "%s"'
export LESSEDIT='mate -l %lm %f'
fi
{% endhighlight %}
    

Now, if I am remotely connected to a machine, then I will get `nano` as my editor, but if I am sitting directly in front of it, then it will open Textmate.
