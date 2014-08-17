--- 
wordpress_id: 755
layout: post
title: Edit/Delete Comment
time: "13:40:03"
date: 2006-03-13 13:40:03
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/03/13/editdelete-comment/
---
At times, it's annoying to have to go into the Dashboard, just to delete a Comment that has appeared, or to Edit a comment I have made (or fix the text of someone else's comment). Luckily, you can create links or buttons to allow you to do these two jobs while viewing a Post page: ✍ Edit ✗ Delete In your `Comments.html` template, find the location you want to put the links. To just have the Edit Comment link (you can delete a comment from it's editing page), insert the following: 
    
{% highlight smarty linenos %}
    {edit_comment_link}
{% endhighlight %}

To have both an Edit and a Delete link, try the following: 
    
{% highlight html+smarty linenos %}
    {capture name=edit_comment}{edit_comment_link link="&#9997; Edit"}{/capture}
    {if $smarty.capture.edit_comment != ""}
        {$smarty.capture.edit_comment}
        <a href="http://schinckel.net/wp-admin/post.php?action=confirmdeletecomment&comment={comment_ID}">Delete</a>
    {/if}
{% endhighlight %}

I have mine all nicely styled, using the following (and some CSS): 
    
{% highlight html+smarty linenos %}
    {capture name=edit_comment}{edit_comment_link link="&#9997; Edit" before='<span class="button">' after="</span>"}{/capture}
    {if $smarty.capture.edit_comment != ""}
        <div class="right">
            {$smarty.capture.edit_comment}
            <span class="button"><a href="http://schinckel.net/wp-admin/post.php?action=confirmdeletecomment&comment={comment_ID}">&#10007; Delete</a></span>
        </div>
    {/if}
{% endhighlight %}
