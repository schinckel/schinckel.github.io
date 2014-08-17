--- 
wordpress_id: 416
layout: post
title: Archive and Links Pages
time: "13:10:51"
date: 2005-09-12 13:10:51
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2005/09/12/archive-and-links-pages/
---
It would be nice to be able to have a links and/or archive page under blogsome: that just had a list of all links, or a list of all posts/months/days (whatever). The problem is that Pages cannot use template tags, and it is not much fun to update these pages by hand. A solution presented itself to me today, and it goes like this: 
    
{% highlight html+smarty linenos %}
    {if $smarty.server.REQUEST_URI == '/links/'}
        {get_links_list}
    {elseif $smarty.server.REQUEST_URI == '/archives/'}
        {get_archives type='postbypost' limit='' format='html'}
    {/if}
{% endhighlight %}

This code can go into the Main Page template, just after `{content}`, or into the `post.html `template if you've used my previous hack to get Pages processed by the post template. You'll also need to create Pages: Links and Archives (if you use different names, be sure to ensure the page-slug is the one that is listed in the code above). I had to put a `<br />` into each Page in order to get rid of all errors. You can see the results here: [Archives][1], [Links][2]. It's more than likely that a similar solution exists for categories: I'll do that too. Update: [Categories][3], [Pages][4]. Note: Make sure you have the slash following the URL when you try to access them. It may be possible to have a double `{if}` clause (with slash and without), but I'm not sure yet... _later_ works a treat: 
    
{% highlight html+smarty linenos %}
     {if $smarty.server.REQUEST_URI == '/links/' || $smarty.server.REQUEST_URI == '/links'}
        {get_links_list}
{% endhighlight %}
    

And so on... 

   [1]: /archives/
   [2]: /links/
   [3]: /categories/
   [4]: /wp-pages/

