--- 
wordpress_id: 493
layout: post
title: Interactionless Catchpa
time: "17:21:47"
date: 2005-10-15 17:21:47
tags: 
- blogging
- javascript
wordpress_url: http://schinckel.net/2005/10/15/interactionless-catchpa/
---
Over on [this site][1], I read about a system that seems to be a bit like mine (only perhaps more complicated). It did give me one idea though: I could automatically populate the value into the box. Or even more simply, have the JavaScript simply fix up the `action=""` attribute. Then the user just needs to set the action attribute to a whitespace string, and then the JavaScript will make it possible for the reader to submit comments. I'm not sure if this would really be all is needed to prevent Spam comments. Requiring JavaScript to be on... • And trackbacking it gave me another idea: setting the action on a trackback URI to copy the URI to the clipboard. That would be cool. Or making the 'LinkThis' bookmarklet get the trackback URI from the page. Should be able to look for a link with `rel="trackback"`, and use the `href` from this. Okay, this bit works, but again I've run into the problem that I'm trying access an 'off-site' document. And I cannot do that with JavaScript. 
    
{% highlight javascript linenos %}
    var a = document.getElementsByTagName('a');
    var tb = '';
    for (var i=0;i<a.length;i++){
        if (a[i].rel=="trackback") 
            tb=a[i].href;};
{% endhighlight %}

That code fragment will get the trackback URI. But there's no argument I can pass to the bookmarklet.php file that will insert this automatically. Something to add to the Blogsome wishlist, I guess. 

   [1]: http://neuromancer.dif.um.es/blog/?p=176

