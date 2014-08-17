--- 
wordpress_id: 976
layout: post
title: Inline Search
time: "20:25:40"
date: 2006-09-18 20:25:40
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2006/09/18/inline-search/
---
I've implemented a new feature on my blog, which I think is pretty cool. Over the the right is a new box labelled: Beta: Inline Search. Try typing something into it, and pressing return, or clicking the button. Wait a few seconds (depending on connection speed) and search results for this blog should appear underneath. It's still fairly rudimentary - I plan to make a “working” indicator, plus the ability to search for more results. But I guess you want to see the code... 
    
{% highlight javascript linenos %}
    function SearchBlog(){
        window.searchreq = new XMLHttpRequest();
        var s=document.getElementById("s").value.replace(/ /g,"+");
        searchreq.open("POST","/category/&s="+s);
        searchreq.onload = UpdateSearchResults
        searchreq.send("")
    }
    
    function UpdateSearchResults(){
        if (searchreq){
            if (searchreq.status==200) {
                data = searchreq.responseText.split("<body>")[1].split("</body>")[0];
                temp = document.createElement("div");
                temp.innerHTML = data;
                if (temp.getByClass) {
                    results = temp.getByClass("post-title");
                }
                var resList = "Results:<ul>";
                for (var i=0;i < results.length; i++){
                    resList = resList + "<li>"+results[i].innerHTML+"</li>";
                }
                resList = resList + "</ul>";
                document.getElementById("searchresults").innerHTML = resList;
                data = "";
                temp = "";
                resList = "";
            }
        }
    }
{% endhighlight %}
    

You will need to have a `getByClass()` function installed - if you don't, it's: 
    
{% highlight javascript linenos %}
    /* 
        Thanks to Dustin Diaz for this one:
        http://www.dustindiaz.com/getelementsbyclass/
        */
    document.getByClass = function(searchClass,tag){
            var classElements = new Array();
            if (tag==undefined){tag="*";}
            var els = this.getElementsByTagName(tag); // use "*" for all elements
            var elsLen = els.length;
            var pattern = new RegExp("(^|\s)"+searchClass+"(\s|$)");
            for (i = 0,j = 0; i < elsLen; i++) {
                if ( pattern.test(els[i].className) ) {
                    classElements[j] = els[i];
                    j++;
                }
            }
            return classElements;
        }
{% endhighlight %}
    

[Barbarella][1] • [Ferrante & Teicher][2] • [Ultra-Lounge, Vol. 16: Mondo Hollywood][3] ★½

   [1]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Barbarella&artistTerm=Ferrante+&+Teicher
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Ferrante+&+Teicher
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Ultra-Lounge,+Vol.+16:+Mondo+Hollywood&artistTerm=

