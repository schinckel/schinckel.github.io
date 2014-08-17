--- 
wordpress_id: 1021
layout: post
title: Category Dreaming...
time: "12:18:04"
date: 2006-11-04 12:18:04
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/11/04/category-dreaming/
---
...on such a Winter's Day.

California Dreamin' • “Room Service” • [José Feliciano][1] ★★★

Okay, that's just a silly lead-in to what I'm going to post about. For some time, I've been trying to get Category Pages to handle a bit nicer in Blogsome. I needed to be able to get a Category ID from a Category name, and I hadn't figured out how to. I'd basically given up. Then I found my new best friend, `{get_cat_ID cat_name='Cat_Name'}`. He allows me to do this. And much easier than I thought it would be, too. 

{% highlight smarty linenos %}
    {if $smarty.server.REQUEST_URI|truncate:10:'':1 == '/category/'}
        {capture name=cat}
            {single_cat_title}
        {/capture}     
        {capture name=catID}
            {get_cat_ID cat_name=$smarty.capture.cat}
        {/capture}
    {/if}
{% endhighlight %}

Now, how do we use this to get child categories? 

{% highlight smarty linenos %}
    {list_cats optionall='0' list='false' child_of='$smarty.capture.catID'}
{% endhighlight %}

This appears to not work, as it continues to get all of the categories. I think there is an issue with child_of, at least on Blogsome.

{% highlight smarty linenos %}
    {get_category_children id=$smarty.capture.catID}
{% endhighlight %}

Only generates the IDs of the child categories. Useful, but not excellent for my uses. However, there exists also a function called `{wp_list_cats}`, which allows for arguments in the for `&arg=value`. 

{% highlight smarty linenos %}
    {wp_list_cats args=“&child_of=`$smarty.capture.catID`”} 
{% endhighlight %}

Notably, you must use double quotes when trying to embed a variable inside an argument. Final code (not counting CSS, that's up to you - or look in my StyleSheet):

{% highlight html+smarty linenos %}
{if $smarty.server.REQUEST_URI|truncate:10:'':1 == '/category/'} 
    {*Category Index Page*}
    <div class=“catNav”>
        {capture name=cat}{single_cat_title}{/capture}
        {capture name=catID}
            {get_cat_ID cat_name=$smarty.capture.cat}
        {/capture}
        Currently browsing 
        {get_category_parents category="`$smarty.capture.catID`" link="1" separator="&raquo;"}, which has sub-categories 
        <ul class=“inlineCatList”>
            {wp_list_cats args=“&&list=0&children=0&child_of=`$smarty.capture.catID`”}
        </ul>
    </div>
{/if}
{% endhighlight %}
        
        
And, thanks to minimalnet, since because of the post in the forums: [How can i show the Dashboard Blog Stats in my blog?][2], I began scouring the source code again. 

[Summer The First Time][3] • [Bobby Goldsboro][4] • [Room Service][5] ★

   [1]: http://www.google.com/search?q=%22Jos%C3%A9%20Feliciano%22
   [2]: http://blogsome-forum.blogsome.com/viewtopic.php?p=11526#11526
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Summer+The+First+Time&artistTerm=Bobby+Goldsboro
   [4]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Bobby+Goldsboro
   [5]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Room+Service&artistTerm=

