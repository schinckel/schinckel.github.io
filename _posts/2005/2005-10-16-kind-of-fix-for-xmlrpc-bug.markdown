--- 
wordpress_id: 501
layout: post
title: (kind of) Fix for XMLRPC bug.
time: "17:48:37"
date: 2005-10-16 17:48:37
tags: 
- python
- blogsome
wordpress_url: http://schinckel.net/2005/10/16/kind-of-fix-for-xmlrpc-bug/
---

I've been playing around with the version of the WP-mu source that's used on Blogsome's servers, trying to find the exact point where the bug is that escapes apostrophes and quotes.

Basically, the XMLRPC client contacts the server, and sends the data in. According to the console, the content of the post is actually in a field called _description_.

Searching through the XMLRPC file I find only five references to the word description. Two of these are in functions to do with posting. Both are basically the same, one is for blogger, the other metaweblog type connections:

{% highlight php linenos %}
    $post_content = apply_filters('content_save_pre', $content_struct['description']);
{% endhighlight %}

Now, a bit of research showed up that apply_filters is a function that allows plugins and their ilk to access the data before it gets saved to the database. Now, I'm fairly sure it is not a plugin doing this.

I also discovered that it is likely that the update to `XMLRPC.php` that happened was accompanied by a change to another file, that calls `stripslashes()`, another WP function. The XMLRPC update was, after all, a fix that removed the ability for XMLRPC calls to run unescaped code. So it makes sense that it escapes stuff.

In the short term, I discovered ecto has the ability to automatically run a script as you post: in the **New Post** window, make sure **Options** are showing, and choose the **Formatting** tab. (Incidentally, if you are only using double-quotes, it seems the Smarten Quotes will help, but it may mess with code).

I use a script that is like this to fix everything up:

{% highlight python linenos %}
import sys
data = open(sys.argv[1]).read()

data = data.replace(“'”,“'”)
data = data.replace('“',”“”)

open(sys.argv[1],'w').write(data)
{% endhighlight %}


This on its own is not enough - I seemed to have to go into the HTML editing mode before it would work. I think ecto does its own conversion of certain HTML entities to real characters.

This post is a test post to see how it all goes with `<pre>` tags and the like.
