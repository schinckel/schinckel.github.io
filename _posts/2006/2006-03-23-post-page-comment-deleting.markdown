--- 
wordpress_id: 808
layout: post
title: Post Page Comment Deleting
time: "08:51:01"
date: 2006-03-23 08:51:01
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2006/03/23/post-page-comment-deleting/
---
I've implemented the ability to delete a Comment while viewing it on a normal (user) post page. It will only appear if you are an admin. There are some issues: the first is that it doesn't work under Internet Explorer. I didn't realise until I read [Using the XML HTTP Request object][1] that IE uses a different way of initialising the `XMLHttpRequest() `object. I'll build that in later. The second is that any user can (try to) delete a Comment when logged in - currently this script doesn't check to see what is returned, and removes the Comment from the Post page regardless. What I need to do is examine the resulting HTML code, and find out if the request to delete the comment was successful. I'll need to do some experiments to check this, but an `xmlhttp.status `might do the trick. To use it, just include `<script type="text/javascript" src="http://schinckel.net/images/toolbox.js"> </script>` in your `<head>`, and have a button/link with `class="delete"`, inside your Comment `<li>` definition. Else, you can download the script, and examine how it works: [http://schinckel.net/images/toolbox.js][2]. The actual function that deletes the comment is: 
    
{% highlight javascript linenos %}
    function DeleteComment(e){
        li = parentWithTagName(eventTarget(e),'LI');
        id = li.id.split('-')[1];
        if (!getById(li.id)) return true; //Fallback to Link!
        if (!confirm("Delete Comment #"+id+"?\nCannot be undone.")) return false;  
        var admin = "http://" + document.domain + "/wp-admin/";
        var delreq = new XMLHttpRequest();
        delreq.open("GET",admin+"post.php?action=deletecomment&comment="+id);
        delreq.setRequestHeader("Referer",admin);
        delreq.send("");
        li.parentNode.removeChild(li);
        return false; //Stop Link being followed
    }
{% endhighlight %}

With the function: 
    
{% highlight javascript linenos %}
    function parentWithTagName(node, tagName){
        if (node==document) return false;
        if (node.tagName==tagName) return node;
        return parentWithTagName(node.parentNode, tagName)
    }
{% endhighlight %}

existing elsewhere, and being used in this case. I like the neatness of this recursive function, which I originally wrote for finding a parent `<form>` element. I've also got a function `getById()`, which is a cross-browser wrapper for `document.getElementById()`, and `eventTarget()` which is the same for finding the target of an event. To add the function to the button, I use a script that just finds all elements with `class="delete"`, and add `onclick=DeleteComment`. That's all that needs to be done! 

   [1]: http://jibbering.com/2002/4/httprequest.html
   [2]: http://schinckel.net/images/toolbox.js

