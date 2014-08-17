--- 
wordpress_id: 87
layout: post
title: Logging in from PC to MacOS
time: "00:59:14"
date: 2005-01-19 00:59:14
tags: 
- general
wordpress_url: http://schinckel.net/2005/01/19/logging-in-from-pc-to-macos/
---
I have a few aliases and functions running in my `~/.profile`, and some of them run MacOSX applications - for instance I like to edit files in SubEthaEdit, but I like to just use the word edit as the command to start the process. This is all well and good, until I'm remotely accessing a command line only, and try to edit a text file. If I'm logged into the Mac, up pops SubEthaEdit, and if I'm not logged in, I see `kCGErrorRangeCheck : Window Server communications from outside of session allowed for root and console user only INIT_Processeses(), could not establish the default connection to the WindowServer.Abort trap` Not much fun at all. So I wrote a function that will run the right program if I am remotely logged in. I found that Terminal sets the environment variable `TERM_PROGRAM` to `'Apple_Terminal'`. 
    
{% highlight bash linenos %}
function edit
{
  if test `echo $TERM_PROGRAM` == 'Apple_Terminal' ; then
      open -a 'SubEthaEdit.app' "$*" &
  else
      pico "$*"
  fi
}
{% endhighlight %}
    

So far so good. But when I exit pico from my other terminal, I see an error of: `-bash: test: ==: unary operator expected` What's happening is that the ``echo $TERM_PROGRAM`` is displaying "" (empty string) which test doesn't like on the left hand side of a "==". So the first lines of my `~/.profile` are now: 
    
{% highlight bash linenos %}
if test `echo $TERM_PROGRAM""1` == '1' ; then
 export TERM_PROGRAM='Unknown'
fi
{% endhighlight %}
    

This took me a while to twig to - for ages I was just happy to have the error appear! The only issue with this is if I telnet from my imac (where the variable is set) into the same machine - you then lose the ability to automatically run the graphical programs set up in the functions. The other programs I use differently according to where I am are: 

  * appswitch - use as a replacement for ps, kill, and to show/hide running programs.
  * SubEthaEdit - use as edit, and sedit (edit as Super User).
  * openman - a new window for each man page, allowing them to stay open while I keep working.

I also have a function called browse, that opens the current (or supplied) directory in the Finder. I'd love to be able to tell Windows Explorer to open this, but this would require some heavy duty inter-machine communication. 
