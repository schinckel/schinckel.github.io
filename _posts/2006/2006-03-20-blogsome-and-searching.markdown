--- 
wordpress_id: 802
layout: post
title: Blogsome and Searching
time: "23:27:57"
date: 2006-03-20 23:27:57
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2006/03/20/blogsome-and-searching/
---
Blogsome Search has never quite been right, and now I think I know how to fix it. At the moment, my Search code looks like: 
    
{% highlight html linenos %}
    <form id="searchform" method="post" action="/">
        <input type="text" name="s" id="s" size="12" />
        <input type="submit" class="button" name="submit" value="Search" />
    </form>
{% endhighlight %}

This works, to a certain extent. It will only properly display the first page of results. It is possible to use URLs of the form: [http://schinckel.net/category/?s=searchterm][1] which will give results, and if there are more hits than are visible, will display the _Next Page_ link, which is of the form: [http://schinckel.net/category/?s=searchterm/page/2/][2], and works. Knowing this, it's possible to hack up a JavaScript function that will display the search results, but the _Next Page_ link still fails. You can, however, pop an `&paged=n` on the end of the URL, which will work in this case. I think this would be much nicer with a RewriteRule. I'll have to play around a bit and see what makes a working one for `.../search/term1/term2/`, I think. The JavaScript I am using at the moment is (shown in context): 
    
{% highlight html linenos %}
    <form id="searchform" method="post" action="/" onsubmit="location.href='/category&s='+document.getElementById('s').value.replace(/ /g,'+');return false;">
        <input type="text" name="s" id="s" size="12" />
        <input type="submit" class="button" name="submit" value="Search" />
    </form>
{% endhighlight %}
    

   [1]: http://schinckel.net/category/?s=searchterm
   [2]: http://schinckel.net/category/?s=searchterm/page/2/


