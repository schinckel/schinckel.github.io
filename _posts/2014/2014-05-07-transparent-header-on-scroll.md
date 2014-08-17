---
date: 2014-05-07 13:02:53
layout: post
publish: true
tags: [html, css, js, tips-and-tricks]
title: Transparent header on scroll

---

  
I saw a nice effect the other day, on [SourceJS](http://sourcejs.com). Basically, when you scroll the page at all, the header becomes transparent, but when you hover over it, it becomes opaque again.

Pretty, yet surprisingly easy to do.

Assume your HTML looks something like:

{% highlight html %}
<body>
  <div id="main-menu">
    <!-- this contains the header -->
  </div>
</body>
{% endhighlight %}

The trick to getting stuff really smooth, with limited scripting required, is to use CSS transitions. So, instead of manually changing the opacity of the element, we just set/unset a class on the body, and have some CSS rules to set the opacity.

{% highlight js %}
window.addEventListener('scroll', function () {
  document.body.classList[
    window.scrollY > 20 ? 'add': 'remove'
  ]('scrolled');
});
{% endhighlight %}

This fires every time there is a scroll event. In my browser, add/removing this class to the classList takes ~0.01ms.

Finally, there is the required CSS.

{% highlight css %}
body.scrolled #main-menu {
  opacity: 0.2;
  transition: opacity .2s;
}
body.scrolled #main-menu:hover {
  opacity: 1.0;
  transition: opacity .2s;
}
{% endhighlight %}

That's all there is to it!

Here's one I prepared earlier.

<iframe width="100%" height="300" src="http://jsfiddle.net/r5wHT/embedded/result,html,css,js/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>