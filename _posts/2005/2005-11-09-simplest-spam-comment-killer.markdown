--- 
wordpress_id: 556
layout: post
title: Simplest Spam Comment Killer
time: "18:01:32"
date: 2005-11-09 18:01:32
tags: 
- blogging
- javascript
wordpress_url: http://schinckel.net/2005/11/09/simplest-spam-comment-killer/
---
There are two main tasks that are required to implement a Comment Spam Protection system. The first is to disable comments for all people. The second is to enable it for people who legitimately want to comment. A very simple way to solve the first task is to remove the action from the form tag. In my template, the code looked like this: 
    
{% highlight html+smarty linenos %}
    <form action="{$siteurl}/wp-comments-post.php" method="post" 
        id="commentform" name="commentform">
    ...
    </form>
{% endhighlight %}

(Obviously, I've removed most of the code for brevity.) Deleting the contents of the form action works to a certain extent, except it creates invalid code. Another option is to replace the action with another URI, such as `http://www.google.com`. The second task is to re-enable it where appropriate. Since most Spammers use an automated system of some sort to generate comments, and these bots don't use JavaScript, we can just write a JavaScript that puts the right value back in. This will prevent a user who has JavaScript disabled, or who is in an old browser, from leaving a comment. I'm prepared to live with this. Anyway, I don't usually add script tags directly into a page, but in this case I will, just to make it easier. After the close of the form tag, insert the following: 
    
{% highlight html linenos %}
    <script type="text/javascript">
        document.forms[0].action="{$siteurl}/wp-comments-post.php";
    </script>
{% endhighlight %}

Of course, if this isn't the first form in your document, for example your search form appears in the source before this one, then you'll need to change the number of `forms[_x_]` accordingly. You could try using `document.getElementById("commentform").action`, but I think there's an issue with this method not being available until the DOM is complete, which it isn't at this stage. 

