--- 
wordpress_id: 905
layout: post
title: Members Only Blog
time: "11:11:43"
date: 2006-07-04 11:11:43
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/06/30/members-only-blog/
---
I had a thought on the way home: how to make a blog that only registered users can see. Basically, it will use a similar method how the template decides whether or not to show the captcha. From the Blogsome site, and my comments.html: 
    
    
{% highlight html+smarty linenos %}
      {if $captcha_image_URL != "" && $blog_user_level == -1}
        {$captcha_hidden_form_fields}
        <p>
            <input type="text" name="captcha_value_typed"><img src="{$captcha_image_URL}" align="center"><br>
            Anti-spam measure: please retype the above text into the box provided.
        </p>
      {/if}
{% endhighlight %}
    

So, we should be able to use the following code: 
    
    
{% highlight html+smarty linenos %}
    {if $blog_user_level == -1}
        This blog is members only.  Please {wp_loginout}.
    {else}
        All content goes here.
    {/if}
{% endhighlight %}
    

Of course, you'll want do disable just anyone from registering, else it defeats the purpose of it... I'll try to test this on my test blog over the next couple of days. 
