--- 
wordpress_id: 752
layout: post
title: Fancy Archive Page
time: "20:38:43"
date: 2006-03-11 20:38:43
tags: 
- blogsome
- javascript
- smarty-templates
wordpress_url: http://schinckel.net/2006/03/11/fancy-archive-page/
---
Ages ago, I wrote about how to (a) [pass Pages through the Post template][1], and (b) [use Smarty Tags in special Pages][2]. I had an [Archives][3] page, that had a list of every Post I'd ever made. It's getting kind of long, so I wrote a script that parses this list, and creates a structured list, dividing the posts up according to the month they were published. It then makes this list so that you can hide/show a whole month's worth of posts in one go.  In the Posts Template, I have the following lines: 
    
{% highlight html+smarty linenos %}
    {elseif $smarty.server.REQUEST_URI == '/archives/' || $smarty.server.REQUEST_URI == '/archives'}
        <ul>{get_archives type='postbypost' limit='' format='html'}</ul>{$content}
{% endhighlight %}

Note that this is out of context: see my whole [Posts][4] template file for details. This is in the actual Page: 
    
    
{% highlight html+smarty linenos %}
    <script type="text/javascript">
    var months = new Array("","January","February","March","April","May","June","July","August","September","October","November","December")
    function getYear(li){
        return li.innerHTML.split("/")[3]*1;
    }
    function getMonth(li){
        return li.innerHTML.split("/")[4]*1;
    }
    
    function showKids(id){
        var unit = getById(id);
        for (var i=1;i<unit.childNodes.length;i++){
            unit.childNodes[i].style.display="block";
        }
    }
    function hideKids(id){
        var unit = getById(id);
        for (var i=1;i<unit.childNodes.length;i++){
            unit.childNodes[i].style.display="none";
        }
    }
    function toggleKids(id){
        var unit = getById(id);
        if (unit.childNodes[1].style.display == "none")
            showKids(id)
        else
            hideKids(id)
    }
       
    function Restructure(){
        var pc = getByClass("post-content")[0];
        var items = pc.getElementsByTagName("li");
        var list = items[0].parentNode;
        var month_nodes = document.createElement("ul");
        
        var month_node = document.createElement("li");
        month_node.className = "month";
        month_node.innerHTML = months[getMonth(items[0])] + " " + getYear(items[0]);
        month_node.id = month_node.innerHTML.replace(" ","_");
        month_node.innerHTML = "<h3><a onclick='toggleKids(\""+ month_node.id +"\");'>" + month_node.innerHTML + "</a></h3>";
        month_nodes.appendChild(month_node);
        
        var this_month;
        var next_month;
        
        while (items.length) {
            this_month = items[0];
            next_month = items[1];
            month_node.appendChild(this_month);
            if (next_month && (getMonth(this_month) != getMonth(next_month))){
                month_node = document.createElement("li");
                month_node.className = "month";
                month_node.innerHTML = months[getMonth(next_month)] + " " + getYear(next_month);
                month_node.id = month_node.innerHTML.replace(" ","_");
                month_node.innerHTML = "<h3><a onclick='toggleKids(\""+ month_node.id +"\");'>" + month_node.innerHTML + "</a></h3>";
                month_nodes.appendChild(month_node);
            }
        }
        
        pc.replaceChild(month_nodes,list);
        
        var all = getByClass("month")
        for (var i=0;i<all.length;i++) hideKids(all[i].id);
    }
    
    Restructure();
    </script>
{% endhighlight %}

You'll notice a couple of strange comments, and what looks to be a closing all tag: these are because the Blogsome post editor kindly closes tags for me, even when they aren't tags! 

[Movin' Out (Anthony's Song)][5] • [Billy Joel][6] • [Greatest Hits][7] ★★

I'm off to Karaoke now, I might have to sing that song! 

   [1]: http://schinckel.net/2005/08/31/blogsome-page-templates/
   [2]: http://schinckel.net/2005/09/12/archive-and-links-pages/
   [3]: /archives/
   [4]: /template/
   [5]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Movin'+Out+(Anthony's+Song)&artistTerm=Billy+Joel
   [6]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Billy+Joel
   [7]: itms://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Greatest+Hits&artistTerm=Billy+Joel

