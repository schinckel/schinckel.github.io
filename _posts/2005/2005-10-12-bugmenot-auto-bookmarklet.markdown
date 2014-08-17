--- 
wordpress_id: 488
layout: post
title: BugMeNot Auto-Bookmarklet.
time: "15:29:50"
date: 2005-10-12 15:29:50
tags: 
- javascript
wordpress_url: http://schinckel.net/2005/10/12/bugmenot-auto-bookmarklet/
---
I wrote a couple of days ago about a nice little BugMeNot bookmarklet. I have spent an hour or so today coding on that is supposed to grab the data from the window it opens, and enters this into the relevant fields on the page you came from. Unfortunately, I haven't gotten it working yet. I'll explain why the parts I need to work don't as I get to them.  This first part is simple: it gets the location of the current page, and also finds the input tags that it needs to add the data to later. More items may need to be added to the _user_ array. 
    
{% highlight javascript linenos %}
    loc = window.location;
    user = new Array("username","login","userid");
    inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++) {
        if (inputs[i].type=="password") {
            pw=inputs[i];
            un=inputs[i-1];
        }
        for (j=0;j<user.length;j++){
            if (inputs[i].name.toLowerCase()==user[j])
                un=inputs[i];
        }
    }
{% endhighlight %}
    

The next part opens a new window with the required URL. 
    
{% highlight javascript linenos %}
    bmpopup=window.open('http://www.bugmenot.com/view.php?url='+window.location, 'bmpopup', 'width=500,height=400,menu=no');    
{% endhighlight %}

This section is the one that fails: it complains about not being able to access the other document (not enough permissions, or something like that). This is because the new document is from another domain. 
    
{% highlight javascript linenos %}
    bm_accounts = bmpopup.document.getElementById("accountList");
    acc = bm_accounts.document.getElementsByTagname("dd")[0].innerHTML;
{% endhighlight %}
    

The final section closes the window, splits the data up, and puts it back into the form. 
    
{% highlight javascript linenos %}
    bmpopup.close();
    
    bm_user = acc.split("<br />")[0];
    bm_pass = acc.split("<br />")[1];
    un.value = bm_user;
    pw.value = bm_user;
{% endhighlight %}
    

So, there are only two lines that do not work. Shame. I also tried using XMLHttpRequest, but that falls victim to the same problem. You cannot access one of these from another domain. It may be possible to create a new frame on the current page, and put the data into there, and then extract what I need, and then close the frame. I'll look into this. 
