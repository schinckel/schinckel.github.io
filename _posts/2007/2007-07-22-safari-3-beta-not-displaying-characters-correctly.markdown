--- 
wordpress_id: 1217
layout: post
title: Safari 3 beta not displaying characters correctly
time: "14:01:16"
date: 2007-07-22 14:01:16
tags: 
- general
wordpress_url: http://schinckel.net/2007/07/22/safari-3-beta-not-displaying-characters-correctly/
---
I've changed my default browser to Safari 3 beta, and I'm liking it a lot. It's nice to use a Keychain aware application again (it makes it easier to find out what password I used for a site), but there is one issue with this browser on my site. I use a special character in CSS to get the stars in the top menu. The best way to do this is to use something like: 
    
    
{% highlight css linenos %}
    #topnav li:before { content: "\2729  "; }
    #topnav li:first-child:before { content: ""; }
{% endhighlight %}
    

Which works great in most browsers. Sometimes I come across a browser on a machine that doesn't seem to have the right font installed, and I see a box there instead. And then, last night I noticed the same behaviour in Safari 3: ![Safari3Characters][1] Now, this does not appear like this in either Firefox, or WebKit on the same machine: ![firefoxcharacters][2] ![imageswebkitcharacters][3] So, the big question is, why is Safari 3 beta not able to display the font correctly? 

   [1]: /images/2007/07/safari3characters.png (Safari3Characters.png)
   [2]: /images/2007/07/firefoxcharacters.png (firefoxcharacters.png)
   [3]: /images/2007/07/imageswebkitcharacters.png (imageswebkitcharacters.png)

