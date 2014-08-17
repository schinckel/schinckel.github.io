--- 
wordpress_id: 726
layout: post
title: Styling Asides Differently
time: "09:46:21"
date: 2006-03-05 09:46:21
tags: 
- blogsome
- smarty-templates
- web-design
wordpress_url: http://schinckel.net/2006/03/05/styling-asides-differently/
---
I thought I'd already written up a post on this, since I discovered it about a month ago, but apparently not. Blogsome has a nice little function called `{is_asides}`. It allows for easy alternate formatting of posts within a category called _Asides_. So, to have these fancy little numbers, the first thing you'll need is an Asides category, with a post in it. Then, in your Post Template, try the following code: `<div class="post {is_aside}{if $is_aside=='true'}Asides{/if}" id="post-{the_ID}">` This sets up the class of the post to also be Asides if it is in that category. I'll make a note here that this could be done with any category, and just use `{the_category seperator=" "}`. This would allow alternate styling for any given category, but I wanted to use the {is_asides} Smarty function. That's all of the code you need, the rest is just pure CSS. In my stylesheet, I have the following code, that looks after all of the Aside related stuff: 
    
{% highlight css linenos %}
    .Asides
    {
        border:#E1D6c6 1px dashed;
        padding:6px;
    }
    .Asides .post-info
    {
        display:none;
    }
    .Asides .post-footer
    {
        background:none;
        padding-top:0px;
    }
    .Asides .post-content
    {
        border-top:none;
        padding:2px;
        background: url(/images/blockquote.gif) no-repeat left top;
    }
{% endhighlight %}

The first stanza sets up the border and layout for the actual post. The second hides all of the post-info, such as Date, Title, etc. I later decided to move the Comments Link, else there is no way to view/add comments. The third removes the fancy symbol that appears between posts, and the last one removes the line at the top, and puts some lovely quotes into the background. I'm still going to tweak this a little: on an individual post page, the next/previous post links overlap with the bottom of the border. 
