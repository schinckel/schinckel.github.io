--- 
wordpress_id: 872
layout: post
title: Highlight Search Terms
time: "23:25:38"
date: 2006-04-18 23:25:38
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/04/18/highlight-search-terms/
---
I'm trying to get Search terms from within the Blog's search engine to be highlighted. I've got the following code: 
    
{% highlight html+smarty linenos %}
    {if $smarty.request.s == ""}
        {$content}
    {else}
        {assign var=hilite value="<span class='hilite'>"|cat:$smarty.request.s|cat:"</span>"}
        {$content|replace:$smarty.request.s:$hilite}
    {/if}
{% endhighlight %}

This works fine, as long as the search term isn't in a URL, or something like that. In that case, it breaks the URL. To get around this, I need to only replace if it's not inside an HTML tag. `regex_replace` to the rescue. This took me about 30 minutes to eventually figure out, a tipoff to _[wfinn at yakasha dot net][1]_, and the comment he made on the PHP documentation pages: 
    
{% highlight html+smarty linenos %}
    {if $smarty.request.s == ""}
        {$content}
    {else}
        {assign var=hilite value="<span class='hilite'>"|cat:$smarty.request.s|cat:"</span>"}
        {assign var=regex value="/(?![^< ]*?>)"|cat:$smarty.request.s|cat:"/"}
        {$content|regex_replace:$regex:$hilite}
    {/if}
{% endhighlight %}

Obviously, you'll need to have some sort of CSS styling for the search term. 
    
{% highlight css linenos %}
    .hilite {color:red; border:1px dashed; padding:0 3px; 0 3px;}
{% endhighlight %}


   [1]: http://au.php.net/manual/en/reference.pcre.pattern.syntax.php#54816

