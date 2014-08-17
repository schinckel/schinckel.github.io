--- 
wordpress_id: 579
layout: post
title: "{todayayearago}"
time: "19:52:35"
date: 2005-11-28 19:52:35
tags: 
- blogsome
- php
- smarty-templates
wordpress_url: http://schinckel.net/2005/11/28/todayayearago/
---
Another Blogsome user was wanting to use `{todayayearago}` to get posts from a week ago, which reminded me I do it with a month ago. Looking through the source to see if a weekly one exists (it doesn't, as yet), I came across this little nugget: 
    
{% highlight php linenos %}
    function todayayearago( $when, $wpblog, $spacer ='<br /' )
{% endhighlight %}

Now, ignoring the apparent typo (I think there should in fact be a closing tag to that there BR tag...), what do you see that is notable?  That's right, you can choose a different blog. So I tried this with my test blog: 
    
{% highlight html+smarty linenos %}
    {todayayearago when='month' wpblog='schinckel'}
    {if $todayayearago != ''}
        <h2>A Month Ago</h2>
            <ul>
                {foreach from=$todayayearago key=id item=details}
                    <li>
                        <a href="{get_permalink id=$id}" title="{$details.content|truncate:25:"..."}">
                            {$details.title|truncate:20:"..."}
                        </a>
                    </li>
                {/foreach}
            </ul>
    {/if}
{% endhighlight %}

Now, this gives some very interesting results. Firstly, it works, except for the part that tries to get the permalink: 
    
    href="{get_permalink id=$id}"

This fails, because it (naturally) tries to grab the permalink from the current blog, not the other one. My next step was to see if `{get_permalink}` can handle an argument like `wp_blog`. The sad news is it can't. So, the next question is: does the URL get returned in the data structure along with the content and title. I suspect so, but need to see how. Looking through the source of wp-db.php doesn't throw much light on the topic, so it's time for trial and error. That's what a test blog is for, after all! Aha! You can see most of what happens from the _todayayearago_ file itself: 
    
{% highlight php linenos %}
    foreach( $reqhistory as $row )
    {
     $todayayearago[ $row->ID ] = array( "title" => strip_tags( stripslashes($row->post_title) ),
      "content" => strip_tags( stripslashes( $row->post_content ) ) );
    }
{% endhighlight %}
    

Which clearly shows that only the title and content are 'grabbed'. So, until I rewrite this function (so it includes the URL, and perhaps even so it allows for other intervals), it's use is still limited to posts within your own blog, from either a year or a month ago. Unless I can find a way to get post data from another blog's database... 
