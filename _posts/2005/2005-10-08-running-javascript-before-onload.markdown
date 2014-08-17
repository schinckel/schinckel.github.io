--- 
wordpress_id: 479
layout: post
title: Running JavaScript Before onload.
time: "15:14:45"
date: 2005-10-08 15:14:45
tags: 
- blogging
- javascript
wordpress_url: http://schinckel.net/2005/10/08/running-javascript-before-onload/
---
JavaScript has a pretty neat feature. Lets say I have some functions that need to be run when the page has finished loading. Say, like replacing some encrypted email addresses with the gravatar they are associated with. Since you want all of your JavaScript to remain in the external.js file, and not have to add anything other than the one call to the file in the header of the page, you need a method of knowing when the page has finished loading. By setting up as follows, you can do this: 
    
{% highlight javascript linenos %}
    window.onload = function () {
        // Put code or calls to functions in here
        SetupStuff();
    }
{% endhighlight %}

This has a couple of disadvantages: 

  1. If another script called after yours also has an assignment to window.onload, only their code will run.
  2. Alternately, if you are running after another script, you will replace any assignments they have made to window.onload.
  3. This will only be called when the whole page has run, including any images that need to be downloaded.

Various solutions for the second problem have surfaced, including testing window.onload, and appending to it instead of replacing it, but this does not fix either of the other two problems. Another solution is to have a function call at the end of the HTML code, but this could also fail, since the DOM is not yet complete. I have found a better solution, located at [brothercake][1]. It's not really clear how to use it on that page, but the source is straightforward. What I did was include the text of the domFunction.js file, and right at the bottom of the script, included this line: 
    
{% highlight javascript linenos %}
    var myStartup = new domFunction(Startup);
{% endhighlight %}

Right at the top of my code, I have a function called Startup, which contains all of the function calls I want to happen, in the order they need to. Much better than waiting for all of the images to load, even if most of them are cached. 

   [1]: http://www.brothercake.com/site/resources/scripts/domready/

