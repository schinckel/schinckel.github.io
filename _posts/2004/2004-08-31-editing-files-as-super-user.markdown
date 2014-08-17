--- 
wordpress_id: 767
layout: post
title: Editing files as super-user
time: "18:28:24"
date: 2004-08-31 18:28:24
tags: 
- bash
wordpress_url: http://schinckel.net/2004/08/31/editing-files-as-super-user/
---
Since one of the security updates, Apple 'fixed' open so `sudo open` wouldn't run the app as root, but I liked the ability to do this. Instead, one needs to actually run the application (located in `ApplicationName.app/Contents/MacOS/ApplicationName`) with a `sudo`. I often need to edit text files, and I use _SubEthaEdit_. So I put the following lines in my `.profile`: 
    
    
{% highlight bash linenos %}
function edit
{
    if test `echo $TERM_PROGRAM` == 'Apple_Terminal' ; then 
      open -a 'SubEthaEdit.app' "$*" &
    else
      pico "$*"
    fi
}

function sedit
{
    if test `echo $TERM_PROGRAM` == 'Apple_Terminal' ; then
      sudo ~/Applications/SubEthaEdit.app/Â¬
                  Contents/MacOS/SubEthaEdit "$*" &
    else
      sudo pico "$*"
    fi
}
{% endhighlight %}

    

If you don't mind the prompt not returning until you finish, you can remove the `&` from the relevant lines. Why the `pico` lines? (And the test...) Because I sometimes `ssh` or `telnet` into my machine, and I like to be able to just type in (s)edit rather than have to remember another command. Other tips I use - change the background colour of SEE to blue for normal use, and another colour, like red/orange for `sudo` use. That way, you will know when you are editing a file as a superuser. You will need to sedit first to go through the 'initial use agreement'. You could also use this trick with another editor...like `pico`...:-) 
