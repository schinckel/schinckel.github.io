--- 
wordpress_id: 557
layout: post
title: Rewrite Rules
time: "19:29:33"
date: 2005-11-09 19:29:33
tags: 
- blogsome
wordpress_url: http://schinckel.net/2005/11/09/rewrite-rules/
---
When editing `RewriteRule`s, it's important to remember this: rules which appear first tend to take priority. For instance, I discovered that the rules for `http://schinckel.net/200_n_/page/_n_/` style URIs were missing. What was happening was the .htaccess file was finding the closest rule it could. The trick for finding what it's actually doing under Blogsome is to have this code in your template: 
    
{% highlight smarty linenos %}
    {foreach from=$smarty.server.argv item=var}
    {$var}
    {/foreach}
{% endhighlight %}

This code will print out what the server is receiving. In the case of the URI: [http://schinckel.net/2005/page/2/][1] it's being sent: 
    
    wpblog=schinckel&year=2005&monthnum=&day=&name=page&page=2

The important part here is that the name of the post is being set to 'page'. Clearly, this is not desired behaviour.  The RewriteRule that should apply to this instance looks something like: 
    
{% highlight apache linenos %}
    RewriteRule ^blogs/([_0-9a-z-]+)/([0-9]{4})/page/([0-9]+)/(.*)/    /wp-inst/index.php?wpblog=$1&year=$2&paged=$3 [L]
{% endhighlight %}

I don't know exactly what the _\[L\]_ stands for, but it needs to be there to stop Bad Server Errors™. The key thing to know here is that this must be before the greedy rule that was already grabbing the URL, and Rewriting it of its own accord. In my case, that was the line that looked like: 
    
{% highlight apache linenos %}
    RewriteRule ^blogs/([_0-9a-z-]+)/([0-9]{4})/?([0-9]{1,2})?/?([0-9]{1,2})?/?([_0-9a-z-]+)?/?([0-9]+)?/?$          /wp-inst/index.php?wpblog=$1&year=$2&monthnum=$3&day=$4&name=$5&page=$6 [L]
{% endhighlight %}
    

I made sure my new rule was before this. A good place is where the other rules for subsequent pages of posts are. Of course, this rule only works for yearly archives, you'll want one for monthly and daily archives (if you are a nutter who posts more times per day than fits onto your front page...): 
    
{% highlight apache linenos %}
    RewriteRule ^blogs/([_0-9a-z-]+)/([0-9]{4})/([0-9]{1,2})/page/(.*)/    /wp-inst/index.php?wpblog=$1&year=$2&month=$3&paged=$4 [L] 
    RewriteRule ^blogs/([_0-9a-z-]+)/([0-9]{4})/([0-9]{1,2})/([0-9]{1,2})/page/(.*)/    /wp-inst/index.php?wpblog=$1&year=$2&month=$3&day=$4&paged=$5 [L]
{% endhighlight %}

Of course, on Blogsome, you cannot alter this file yourself, but I'm sure these changes will be implemented soon. If the link earlier in the post still gives you "No Posts Made", then you know it hasn't... 

   [1]: http://schinckel.net/2005/page/2/

