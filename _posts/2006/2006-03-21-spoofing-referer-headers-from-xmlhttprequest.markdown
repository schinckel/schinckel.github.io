--- 
wordpress_id: 805
layout: post
title: Spoofing Referer Headers from XMLHttpRequest
time: "17:58:01"
date: 2006-03-21 17:58:01
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2006/03/21/spoofing-referer-headers-from-xmlhttprequest/
---
I couldn't find a simple explanation of how to do this, so here is one. First, a bit of background. I wanted to be able to delete a comment from a standard post page, without having to a) go to a confirmation page, and b) have to navigate back to the original page afterwards. The following code creates an HTTP request, opens the required page, then fakes the header so it looks like it came from an admin page, before sending the request. When the request is complete, it refreshes the current page, so as to update the display. 
    
{% highlight javascript linenos %}
    del = new XMLHttpRequest();
    del.open("GET","{$siteurl}/wp-admin/post.php?action=deletecomment&comment={comment_ID}");
    del.setRequestHeader("Referer", "{$siteurl}/wp-admin/post.php");
    del.send("");
    document.location.reload();
{% endhighlight %}

A better option might be to just hide the deleted comment from view - that would be immediate, and if the user refreshed the page it would reflect reality. 
    
{% highlight javascript linenos %}
    document.getElementById('{comment_ID}').style.display='none';
{% endhighlight %}

However, if the user was to somehow cause the comment to become visible again, it doesn't get it's number back, at least in Firefox. There are a multitude of other ways to handle this case: `.style.visibility = 'hidden'` hides the object, but leaves the space. You could also delete the object from the whole DOM structure, using: 
    
{% highlight javascript linenos %}
    document.getElementById('{comment_ID}').parentNode.deleteChild(document.getElementById('{comment_ID}'));
{% endhighlight %}
