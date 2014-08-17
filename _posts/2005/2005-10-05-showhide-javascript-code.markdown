--- 
wordpress_id: 469
layout: post
title: Show/Hide JavaScript Code
time: "15:26:26"
date: 2005-10-05 15:26:26
tags: 
- blogging
- languages
wordpress_url: http://schinckel.net/2005/10/05/showhide-javascript-code/
---
There's a little one-liner I've just learned for showing or hiding the contents of a particular `<div>` tag. (May also work for other types of tag). The stuff you want to show or hide needs to have an id attribute. I use it to hide some stuff if there are no Comments or Trackbacks, since I've seperated them, and this was the best way to hide the title. 
    
{% highlight html linenos %}
    <div id="the_id">
        Text/Data To Hide Goes Gere
    </div>
{% endhighlight %}
    

Then, you can use this code to hide it (in an `{if}` block, for instance): 
    
{% highlight html linenos %}
    <script type="text/javascript">
        document.getElementById("the_id").style.display = "none";
    </script>
{% endhighlight %}

And this to show it: 
    
{% highlight html linenos %}
    <script type="text/Javascript">
        document.getElementById("the_id").style.display = "block";
    </script>
{% endhighlight %}

I haven't tried, but it's also probably possible to have show/hide links: 
    
{% highlight html linenos %}
    <div id="the_id">
        Text/Data to Hide Goes Here.
    </div>
    <a onclick="javascript:document.getElementById('the_id').style.display = 'none'">
        Hide Text
    </a>
    <a onclick="javascript:document.getElementById('the_id').style.display = 'block'">
        Show Text
    </a>
{% endhighlight %}
    
Of course, if you want to hide text in-place (without rearranging the flow of the remainder of the text), you'll need: 
    
{% highlight html linenos %}
    <div id="the_id">
        Text/Data to Hide Goes Here.
    </div>
    <a onclick="javascript:document.getElementById('the_id').style.visibility = 'hidden'">
        Hide Text
    </a>
    <a onclick="javascript:document.getElementById('the_id').style.visibility = 'visible'">
        Show Text
    </a>
{% endhighlight %}

