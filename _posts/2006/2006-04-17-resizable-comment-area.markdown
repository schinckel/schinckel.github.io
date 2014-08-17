--- 
wordpress_id: 861
layout: post
title: Resizable Comment Area
time: "16:21:29"
date: 2006-04-17 16:21:29
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2006/04/17/resizable-comment-area/
---
I've already had resizable Textarea implemented in this blog - the two buttons that appear at the bottom of the comment box, next to Preview/Post Reply. However, today over on [MacGeekery][1], I came across something even better. A resize widget, that can be dragged to resize the comment entry box. Getting this to work wasn't quite as simple as just cutting and pasting code, however. Eventually, I rewrote the code from scratch, using some of my toolbox tools also.  The script starts by finding every `<textarea>`, and then, if it has the class _resizable_, it adds an enclosing `<div>` tag, and a _grippie_ `<div>` tag. This then allows for CSS to style the _grippie_ tag. 
    
{% highlight javascript linenos %}
    function ResizableComment(){
        textareas = document.getElementsByTagName('textarea');
        
        var textarea;
        for (var i=0; textarea = textareas[i]; i++){
            if (textarea.className.match(“resizable”)){
                // Insert resizable <div>
                ta = document.createElement('div');
                ta.className = “resizable-textarea”;
                textarea.parentNode.insertBefore(ta, textarea);
                ta.insertBefore(textarea,ta.firstChild);
                // Insert Grippie
                grippie = document.createElement('div');
                grippie.className = 'grippie';
                w = textarea.offsetWidth - 2;
                grippie.style.width = px(w);
                textarea.parentNode.insertBefore(grippie, textarea.nextSibling);
                grippie.onmousedown = beginResize;
                // Remove bottom border
                textarea.style.marginBottom = 0;
                textarea.style.borderBottom = 0;
            }
        }
    }
{% endhighlight %}
    

Notice also that it sets the `onmousedown` action for the grippie to a function called `beginResize`. 
    
{% highlight javascript linenos %}
    function beginResize(e){
        var coords = getMousePos(e);
        window.resizing = eventTarget(e).parentNode.firstChild; // Textarea.
        window.resizing.style.height = px(window.resizing.offsetHeight);
        window.start_resizer = coords[1];
        document.body.onmouseup = endResize;
        document.body.onmousemove = duringResize;
        return false;
    }
    
    function duringResize(e){
        var coords = getMousePos(e);
        window.end_resizer = coords[1];
        if (window.start_resizer == window.end_resizer) return;
        window.height_change = window.end_resizer - window.start_resizer;
        if (window.resizing.offsetHeight + height_change - 1 < 115) return;
        window.resizing.style.height = px(window.resizing.offsetHeight + height_change - 1); // Need the -1 to work!
        window.start_resizer = window.end_resizer;
    }
    
    function endResize(e){
        duringResize(e);
        document.body.onmouseup = null;
        document.body.onmousemove = null;
    }
{% endhighlight %}
    

The `beginResize` function in turn sets up a few things, including which element needs to be resized, and the functions that need to be called as it happens. These functions use another pair of functions: 
    
{% highlight javascript linenos %}
    function getMousePos(e) {
        var posx = 0; var posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY){
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY){
            posx = e.clientX + document.body.scrollLeft;
            posy = e.clientY + document.body.scrollTop;
        }
    
        return new Array(posx, posy);
    }
    
    function px(val){return val + “px”;}
{% endhighlight %}
    

[Don't Believe Anymore][2] • [The Whitlams][3] • [Torch The Moon][4] ★★½

   [1]: http://www.macgeekery.com/contact
   [2]: 'http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Don't+Believe+Anymore&artistTerm=The+Whitlams'
   [3]: 'http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=The+Whitlams'
   [4]: 'http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Torch+The+Moon&artistTerm=The+Whitlams'

