---
date: 2014-03-18 16:23:46
layout: post
publish: true
tags: [javascript, knockoutjs, mvvm, performance, 2-way binding, django]
title: KnockoutJS HTML binding

---


TL;DR: Don't use KnockoutJS ``html`` binding lots of times in your page.

I'm in the middle of rewriting a large part of our application in HTML: for a lot of the interactivity stuff, anything more than just a simple behaviour, I'm turning to KnockoutJS.

Mostly, it's been awesome. Being able to use two-way binding is the obvious big winner, but dependency tracking is also fantastic.

However, I have had some concerns with performance in the past, and this was always on my mind as I moved into quite a complicated part of the system.

Our approach is that we are not creating a single page application: different parts of the system are at different URLs, and visiting that page loads up the relevant javascript. This is a deliberate tradeoff, mostly because for the forseeable future, our software will not work without a connection to our server: most of the logic related to shift selection is handled by that. We aren't about to change that.

While rewriting the rostering interface, I initially had Django render the HTML, and I added behaviours. This was possible, and quite fast, however as the behaviours became more complex, I was doing things like sending back scripts that caused other parts of the page to refresh themselves. It was all rather fragile.

So, I went back to KnockoutJS. After a while, I noticed significant slowdowns when dealing with pages that really shouldn't have been that slow. I'd optimised the database access for the fetching of shifts (and indeed, it is much faster than before), but it felt like Knockout was very sluggish.

I do have quite a few ``ko.computed()`` objects, perhaps they were slowing it down? Notably, the function that filters which shifts should be shown where on the page.

So I put some ``console.time()/timeEnd()`` calls in place.

Nope: the initial parse of the data runs in less than half a millisecond: instantiating the objects took a while, but the filtering of shifts was taking much less than 100ms.

However, the initial call to ``ko.applyBindings()`` was taking several seconds.

The most annoying thing was that when the developer tools were open, it was taking far, far longer!

Eventually, through using the developer tools profiling, I discovered that the slowdown was because of repeated code like:

{% highlight javascript %}
foo.innerHTML = bar;
{% endhighlight %}

Initially, I had thought this slowdown was in KnockoutJS itself, and played around with other ways of binding (such as using the knockout-repeat plugin). Still slow.

Eventually, however, I worked out that it was the act of interacting with the DOM in this manner that was slow. More specifically, the assignation to ``innerHTML`` was occurring in the ``html:`` binding.

Looking through my source code, I discovered code that looked like:

{% highlight html %}
<span data-bind="html: icon"></span>
{% endhighlight %}

And, ``icon`` contained the HTML I wanted to put in there:

{% highlight html %}
<i class="icon-ok"></i>
{% endhighlight %}

Which was a bad idea to begin with: it conflated UI with data to begin with. So, I replaced the code that looked like:

{% highlight javascript %}
this.icon = '<i class="icon-ok"></i>';
{% endhighlight %}

With:

{% highlight javascript %}
this.icon = {
  'icon-time': true
};
{% endhighlight %}

And then, in the HTML:

{% highlight html %}
<i data-bind="css: icon"></i>
{% endhighlight %}

Bingo. All of a sudden, a page that took several seconds to re-render does so in around a second.

It's important to note that this pattern was repeated several times for each shift: and we have possibly dozens of shifts on a page. When you _really_ need to use the ``html`` binding that's fine, just don't stick it inside a loop (or worse still, inside a nested loop).