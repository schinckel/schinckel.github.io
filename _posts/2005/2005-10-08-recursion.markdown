--- 
wordpress_id: 480
layout: post
title: Recursion
time: "16:28:47"
date: 2005-10-08 16:28:47
tags: 
- javascript
wordpress_url: http://schinckel.net/2005/10/08/recursion/
---
One problem I have encountered is that sometimes templates differ, and one person may have paragraph tags inside a form, with input elements inside them. Other people may have another setup, such as all input elements inside the one paragraph tag, except the comment box. Sometimes, I needed to be able to find the form element that was the parent of a particular element, and sometimes this was it's immediate parentNode, sometimes it was the grandparent node (`node.parentNode.parentNode`). So I wrote this nice little function that uses recursion to find the parent that is a form. I'm fairly sure it works okay, and there's even a little check that will return and explicit false if there is no parent form. 
    
{% highlight javascript linenos %}
    function getParentForm(node){
        if (node==document) 
            return false;
        if (node.tagName!="FORM") 
            return getParentForm(node.parentNode); 
        else 
            return node;
    }
{% endhighlight %}
