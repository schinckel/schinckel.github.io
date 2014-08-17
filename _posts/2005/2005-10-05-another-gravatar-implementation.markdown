--- 
wordpress_id: 470
layout: post
title: Another Gravatar Implementation
time: "17:18:42"
date: 2005-10-05 17:18:42
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2005/10/05/another-gravatar-implementation/
---
I recalled at some stage there was a Smarty Modifier called `escape`. I think it was when I was looking for one called `rot13`. Anyways, you can use this and the JavaScript function `unescape()` to obfuscate the email address. You'll need this code early in your template: I stick it at the start just after `<html>`
    
{% highlight html linenos %}
    <script type="text/javascript" 
        src="http://schinckel.net/images/md5.jpg">
    </script>
{% endhighlight %}

This fragment will insert the Gravatar Image: 
    
{% highlight html+smarty linenos %}
    {capture name=reader}{comment_author_email}{/capture}
    <script type="text/javascript">
    document.write('<div class="right">');
    document.write('<img src="http://www.gravatar.com/avatar.php?gravatar_id='); 
    document.write(hex_md5(unescape("{$smarty.capture.reader|escape:"hex"}"))); 
    document.write('&size=40" alt="" />');
    document.write('</div>');
    </script>
{% endhighlight %}

This seems to more reliably display the Gravatars, so I'd suggest you use it instead. Either that, or Gravatar just fixed up their servers... 
