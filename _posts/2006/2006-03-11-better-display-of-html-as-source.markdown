--- 
wordpress_id: 751
layout: post
title: Better Display of HTML as Source
time: "19:28:35"
date: 2006-03-11 19:28:35
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2006/03/11/better-display-of-html-as-source/
---
I spent hours last night working on this, and a fair bit of time today. I think I've got it pretty good, now. See my [Templates][1] page for an example. Now, instead of trying to get the data to appear immediately, which I could not do, I have four buttons that the user can select between the various template files, and it shows them in the `<textarea>` underneath. 
    
{% highlight html linenos %}
    <script type="text/javascript">
        var req1 = new XMLHttpRequest(); 
        req1.open("GET", "/templates/index.html",true); 
        req1.send(""); 
        var req2 = new XMLHttpRequest(); 
        req2.open("GET", "/templates/post.html",true); 
        req2.send(""); 
        var req3 = new XMLHttpRequest(); 
        req3.open("GET", "/templates/comments.html",true); 
        req3.send(""); 
        var req4 = new XMLHttpRequest(); 
        req4.open("GET", "/templates/wp-layout.css",true); 
        req4.send(""); 
    
    function Display(text){
        document.getElementById('template').innerHTML = text;
    }
    </script>
    
    <p>This is the current, up to date version of my conversion of Patricia Müller's Connections Template for Blogsome.</p>
    
    <p>There are four files that Blogsome uses, you need to ensure that the correct data goes into each.  Each one also has, by default some features enabled.  There is commenting throughout that will enable you to disable that which you do not want.</p>
    
    <p><a class="button" onclick="Display(req1.responseText);">Main Page</a> 
    <a class="button" onclick="Display(req2.responseText);">Post</a> 
    <a class="button" onclick="Display(req3.responseText);">Comments</a> 
    <a class="button" onclick="Display(req4.responseText);">Style Sheet</a></p>
    
    <p><textarea id="template" wrap="off"  style='width:95%;height:500px;'>Click on a button above to display the template contents.</textarea></p>
{% endhighlight %}

I probably could have saved the data to variables, and reused the `XMLHttpRequest` item, but then I would have had to find some way to wait for the response code, and that kept failing for me. 

[Kissing You][2] • [Des'ree][3] • [][4] ★★★½

   [1]: /template/
   [2]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Kissing+You&artistTerm=Des'ree
   [3]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Des'ree
   [4]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=&artistTerm=Des'ree

