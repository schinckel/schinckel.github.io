--- 
wordpress_id: 440
layout: post
title: Simple Catchpa
time: "20:41:58"
date: 2005-09-27 20:41:58
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2005/09/27/simple-catchpa/
---
**Note:** This has been updated to reflect most of the feedback I received from the comments and emails. One of the ways to combat comment spam is to use a Catchpa: or a Completely Automated Turing Test to Tell Humans and Computers Apart. I have implemented one with a simple bit of JavaScript.  You need to have two sections of code in your comments.html: 
    
{% highlight javascript linenos %}
    function checkCatchpa()
    {
        var catchpaResponse = document.getElementById("catchpa").value;
            if( catchpaResponse == theAnswer )
            {
                return true;
            }
        return false;
    }
    
    function SubmitComment()
    {
        if (checkCatchpa() == true)
        {
            document.commentform.submit();
        }
    }
{% endhighlight %}

This one needs to be inside a `<script>` block: I have it where I also use a couple of functions to show a comment preview. You will also need to surround the script block with `{literal}` tags to prevent it from screwing up your template. The next one creates the puzzle. It should go after the URI box in your comment form: 
    
{% highlight html linenos %}
    <p>
        <input type="text" name="catchpa" id="catchpa" value="" size="28" tabindex="4" />
        <label for="catchpa">{_e text="<acronym title='Completely Automated Turing Test to Tell Humans and Computers Apart'>Catchpa</acronym>: "}</label> 
        <script type="text/javascript">
            var firstNumber = Math.ceil(Math.random()*10); 
            var secondNumber = Math.ceil(Math.random()*10); 
            document.write("What is "+firstNumber+" plus "+secondNumber+"?");
            var theAnswer = firstNumber + secondNumber;
        </script>
    </p>
{% endhighlight %}

You will also then need to tell the form itself to call the `checkCatchpa()` function, rather than just submitting: 
    
{% highlight html linenos %}
         <form action="{$siteurl}/wp-comments-post.php" method="post" id="commentform" name="commentform" onSubmit="return checkCatchpa()">
{% endhighlight %}
    

Depending on your setup, you may also need to use the `SubmitComment()` call on your link or button that actually submits the form. 
    
{% highlight html linenos %}
    <a class='button' href='javascript:SubmitComment();'> Post Reply </a>
{% endhighlight %}

I've tested this and it works: I'll leave it on my site for a couple of days so you can test it out: if you have any problems, leave a response here (if you can!), or [AIM][1]/[email][2] me. 

   [1]: aim:schinckel@mac.com
   [2]: mailto:matt@schinckel.net

