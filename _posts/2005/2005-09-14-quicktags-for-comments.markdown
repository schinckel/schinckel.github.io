--- 
wordpress_id: 426
layout: post
title: Quicktags for Comments
time: "18:45:52"
date: 2005-09-14 18:45:52
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2005/09/14/quicktags-for-comments/
---
**Note:** The seperate Quicktags toolbar is not supported. Please use the full toolbox script, or hack it any way you like. The remainder of this post remains for posterity only. 

• 

This was easier than I thought.  Alex King has done most of the work by having the Quicktags info already in a JavaScript file.  I just grabbed my copy of the file (from `/wp-admin/quicktags.js`) and tweaked it.  To upload to the Blogsome server I had to call it `quicktags.jpg`, but that is allowed, since you tell the browser explicitly that it is a `text/javascript` file. So, you can get my quicktags.js file (Right-click and download it!), and upload it to your server, and use the following code in your `comments.html`. Where you want the toolbar to appear, insert this: 

{% highlight javascript linenos %}
    <script src="/images/quicktags.jpg" type="text/javascript"></script> 
    <script type="text/javascript">edToolbar();</script> 
{% endhighlight %}
    
After the `<textarea>`, insert the following code: 

{% highlight javascript linenos %}
    <script type="text/javascript"> 
        <!-- edCanvas = document.getElementById('comment'); //--> 
    </script>
{% endhighlight %}

Note: you may need to chage the argument of `getElementById` to whatever your `textarea id` is. I've also tweaked the JavaScript file so it includes `abbr`, `acronym `and `strike `tags, and doesn't include the tags that aren't valid for comments.  And I've added a button for inserting `<` and `>`, but I'm not totally happy with this.  If anyone wants to edit it so it works better (try it out to see what I mean), then feel free. 

I've also created another version that uses links instead of buttons (since Camino doesn't render buttons with style, only as Mac-buttons), but it's not quite as nice: the labels don't update. Still, if anyone wants to play around with it, you can get it here. Remember to right-click and download it, it's not really an image! 

Next task: Live Preview. 
