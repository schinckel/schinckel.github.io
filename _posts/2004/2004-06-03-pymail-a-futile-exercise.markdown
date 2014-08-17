--- 
wordpress_id: 30
layout: post
title: PyMail - a futile exercise?
time: "09:07:19"
date: 2004-06-03 09:07:19
tags: 
- python
wordpress_url: http://schinckel.net/2004/06/03/pymail-a-futile-exercise/
---
I spent a few hours last night playing around with scripting Mail.app - what I really want to be able to do is read my email from a shell interface (like _pine_, or something), but still use the emails I've stored in my Mail.app mailboxes. 

**Option 1: Use pine.** 

I first tried this by creating sym-links from the various mailboxes found in `~/Library/Mail/Mailboxes/*.mbox/mbox`, and `POP-``_accountname@server_``/*.mbox/mbox` into `~/mail/` (the default location of pine mailboxes). Mail.app stores a seemingly normal unix/pine mbox file, but there are some other files there as well: `Info.plist content_index table_of_contents` and a folder for each attachment, with a decoded version of the attached file. However, creating a symlink from the Finder, or a softlink (`ln -s`) doesn't work - pine won't recognise the files as being there. Using a hard link (`ln -i` for safety) works, but has the undesired side effect of resetting the mark (Unread/Read/Flagged - the blue dot that notes a new message) on all messages in the mailbox to Unread. Not acceptable. 

Cleverly, I thought, what about making the original file read-write, and the `~/mail/` hard links (which are a _bit_ like another version of the file that the system keeps synchronised) read-only. However, changing the flags on one reference to a file changes it on the other. _Does it do the same for a change of ownership?_ Yes, interesting. _\[Fixes up a problem that was occurring with a shared itunes library because of this. Sometimes sym-links are better then hard links!\]_ So, it looks like Option 1 is no good. 

**Option 2: use OSA scripting to get mailbox and message details from Mail.app** 

First thing I noticed was that this is dog slow. Maybe because I can't get the osa module working in python, so I have to create a string, and `os.popen()` it: 
    
{% highlight python linenos %}
def get_mailboxes():
    cmd_str = """osascript &lt;&lt;END
tell application "Mail"
get mailboxes
end tell
END
"""
    fp = os.popen(cmd_str)
    data = fp.read()[8:-1].split(", ")
    return data
{% endhighlight %}

Even so, I persevered, eventually creating a [program][1] that is able to get a list of mailboxes, and then a list of messages within a mailbox, and then all of the data from a message. Since python has it's own email module, it is easier to just do an `email.message_from_string()` on a string of text, rather than ask Mail.app for the headers. However, as soon as you start having attachments, it's quicker to get the headers from Mail. And waiting 30 sec just to look in my inbox is too long. Still, better than getting my GF to switch users. Then, I discovered something worse than this. A switched-out user is unable to run any AppleScripts - the same reason that you can't telnet/ssh in and run an Application (`open -a`) without sudo-ing - cannot access the Display Server. 

**Option 3: directly read the mailboxes from python, but don't make any changes.** 

This looks like it might be the only way to go - can be done with a switched-out (or not even logged-in) user. Of course, it was 3am by the time I came to this decision, so It'll have to wait for another day. In the meantime, checkout [pysh][2], a fully python replacement for bash/sh. 

   [1]: http://members.optusnet.com.au/~matt.schinckel/files/pymail.py
   [2]: http://unixnaut.com/skills/Languages/python/pysh.html

