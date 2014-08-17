--- 
wordpress_id: 749
layout: post
title: Displaying HTML as Source in a Web Page
time: "11:18:21"
date: 2006-03-11 11:18:21
tags: 
- blogsome
- javascript
- web-design
wordpress_url: http://schinckel.net/2006/03/11/displaying-html-as-source-in-a-web-page/
---

Now, I'm not talking here about using the "Show Source" feature of a Web Browser.  Anyone worth even a quarter of a pinch of salt knows how to do that.  What I'm trying to do is display the source of a web page as <code>text/plain</code> within another web page.  This is so I can have a current version of my template available on a page of my blog.  I've put a version up that I need to update, and I make so many changes to the template this is unsustainable.

Under Blogsome, the template files can be found in the <code>/templates/</code> directory, and there are four of them: <code>index.html</code>, <code>wp-layout.css</code>, <code>post.html</code> and <code>comments.html</code>.  Of these, only <code>wp-layout.css</code> is a plain text document, the rest are (naturally) <code>text/html</code>.

Now, HTML has a nice little feature called <code>&lt;object&gt;</code>, which should be able to display anything the browser can render.  For example:

<code>&lt;object data="/templates/index.html"&gt; &lt;/object&gt;</code>

Will display a rendering of the Main Page template.  It looks somewhat ugly, since it's not been pre-processed by the Smarty Templating engine, so is somewhat useless - it's neither the source nor the full result:

<object data="/templates/index.html"></object>

This element also has an attribute that should allow you to choose the content type: codetype.


<code>&lt;object data="/templates/index.html" codetype="text/plain"&gt; &lt;/object&gt;</code>

This to me should be now rendering the object as a plain text document.  But no, it still renders the HTML:

{% highlight html linenos %}
<object data="/templates/index.html"codetype="text/plain"></object>
{% endhighlight %}

I fiddled around with this for about an hour or so last night, trying to get it to work.  The DOM tells me it's text/plain, but the browser won't render it as such.

So, after much more rooting around, I finally figured out a way to get the source to display: use XMLHttpRequest() to grab the data, and DOM manipulation to put it into the required location.  This is what my page looks like:

{% highlight html linenos %}
    <h3 class="comments">Main Page (index.html)</h3>
    <textarea id="index.html" wrap="off"  style='width:95%;height:200px;'>
    </textarea>

    <h3 class="comments">Style Sheet (wp-layout.css)</h3>
    <textarea id="wp-layout.css" wrap="off" style='width:95%;height:200px;'>
    </textarea>

    <h3 class="comments">Post (post.html)</h3>
    <textarea id="post.html" wrap="off" style='width:95%;height:200px;'>
    </textarea>

    <h3 class="comments">Comments (comments.html)</h3>
    <textarea id="comments.html" wrap="off" style='width:95%;height:200px;'>
    </textarea>

    <script type="text/javascript">

    var div1 = document.getElementById("index.html");
    var req1 = new XMLHttpRequest();
    req1.open("GET", "/templates/index.html",true);
    req1.send(""); 

    var div2 = document.getElementById("post.html");
    var req2 = new XMLHttpRequest();
    req2.open("GET", "/templates/post.html",true);
    req2.send(""); 

    var div3 = document.getElementById("comments.html");
    var req3 = new XMLHttpRequest();
    req3.open("GET", "/templates/comments.html",true);
    req3.send(""); 

    var div4 = document.getElementById("wp-layout.css");
    var req4 = new XMLHttpRequest();
    req4.open("GET", "/templates/wp-layout.css",true);
    req4.send(""); 

    function Source(){
        if (req1.status+req2.status+req3.status+req4.status == "800"){
            div1.innerHTML = req1.responseText
            div2.innerHTML = req2.responseText
            div3.innerHTML = req3.responseText
            div4.innerHTML = req4.responseText
        } else
            setTimeout("Source();",500);
    }

    Source();
    </script>
{% endhighlight %}

It's not quite perfect: there are still some issues with the timings, but I'll get there.  At least it works, now.  You may need to type javascript:Source() into the address bar to get it to work.

All I need to do now is some syntax styling!
