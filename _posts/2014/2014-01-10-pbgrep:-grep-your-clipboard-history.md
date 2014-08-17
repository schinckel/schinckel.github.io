---
date: 2014-01-10 18:15:41
layout: post
publish: true
tags: [mac-os-x]
title: 'pbgrep: grep your clipboard history'

---

  
I've used [ClipMenu](http://www.clipmenu.com) as my clipboard history manager for several years now: it's unobtrusive, and does _almost_ exactly what I need.

Except, you can't search the clipboard history.

I keep thousands of items in my clipboard history, and today I was trying to find a specific item, that I know was in there. And I couldn't find it after about a minute of scanning through submenus.

Now, ClipMenu can persist it's history to disk, in `~/Library/Application Support/ClipMenu/clips.data`. Which is a binary plist file.

We can view it using ``plutil``:

{% highlight bash %}
$ plutil -p ~/Library/Application\ Support/ClipMenu/clips.data -o -
{% endhighlight %}

I made the decision to limit searching for single-line clips: this means I can grep for lines that contain:

    <string>.*(QUERY).*</string>

Doing single-line matches means I can use ``grep`` (or, as I discovered later, ``ack``), which should be faster than firing up a python interpreter.

My first iteration was:

{% highlight bash %}
$ plutil -convert xml1 ~/Library/Application\ Support/ClipMenu/clips.data -o - \
  | grep "<string>.*test.*</string>" -o
{% endhighlight %}

This works quite well, but includes the XML string tags. I did strip them out using ``sed``, but this is an extra command. It turns out that grep's regular expressions can't handle positive lookahead/behind assertions, and Mac OS X's grep does not support ``--perl-mode``, so I reached for ``ack``:

{% highlight bash %}
function pbgrep() {
  plutil -convert xml1 ~/Library/Application\ Support/ClipMenu/clips.data -o - \
    | ack "(?<=<string>).*$1.*(?=</string>)" -o
}
{% endhighlight %}

That now takes pride of place in my ``.bashrc``, and I can ``pbgrep foo`` to my hearts content.

I guess I could (if there was only one match), put the value back into the clipboard. That might be kind-of nice.