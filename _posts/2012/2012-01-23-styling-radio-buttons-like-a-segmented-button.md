---
date: 2012-01-23 21:39:03
layout: post
publish: true
tags: [css, html, tab-bar, button, knockoutjs]
time: '21:39:03'
title: Styling radio buttons like a <del>boss</del> segmented button

---


I quite like the concept of segmented buttons, where you have a list of related buttons, and can select one or more of them. In MacOS X, and iOS, the ones that are selected have a nice indented look.

I'm currently working on a GUI framework for KnockoutJS, and today I had reason to use this type of control. Initially, I had the following markup that I intended to style:

{% highlight html %}
<nav>
  <ul class="segmented">
    <li><a>Organisation</a></li>
    <li><a>Users</a></li>
    <li><a>Units</a></li>
    <li><a>Tags</a></li>
  </ul>
</nav>
{% endhighlight %}

But, then it occurred to me that HTML radio buttons are a good fit for this use case. They can be set so that only one of them will be selected, which means you can actually get them to work without using any JavaScript to keep selected status in sync. And the bonus is that the labels will be clickable, so we don't need JavaScript for associating them with the radio buttons.

{% highlight html %}
<nav class="segmented">
  <input type="radio" name="seg-1" value="Organisation" id="seg-Organisation">
  <label for="seg-Organisation">Organisation</label>
  <input type="radio" name="seg-1" value="Users" id="seg-Users">
  <label for="seg-Users">Users</label>
  <input type="radio" name="seg-1" value="Units" id="seg-Units">
  <label for="seg-Units">Units</label>
  <input type="radio" name="seg-1" value="Tags" id="seg-Tags">
  <label for="seg-Tags">Tags</label>
</nav>
{% endhighlight %}

Now, there's slightly more markup, but that's okay. So, what does that look like?

<nav class="segmented">
  <input type="radio" name="seg-1" value="Organisation" id="seg-Organisation">
  <label for="seg-Organisation">Organisation</label>
  <input type="radio" name="seg-1" value="Users" id="seg-Users">
  <label for="seg-Users">Users</label>
  <input type="radio" name="seg-1" value="Units" id="seg-Units">
  <label for="seg-Units">Units</label>
  <input type="radio" name="seg-1" value="Tags" id="seg-Tags">
  <label for="seg-Tags">Tags</label>
</nav>

Hmm, not quite what we want. We'll actually want to hide the radio button widgets, and style the labels. Rather than try to have this in the page, here's one I prepared earlier:

<iframe style="width: 100%; height: 125px" src="http://jsfiddle.net/schinckel/BLkmc/embedded/result,html,css/"></iframe>

As you can see, this is with no JavaScript.

Obviously, this is fairly crappy styling: it just looks like some Windows buttons. Let's tart it up a bit. This is the default styling for koui:

<iframe style="width: 100%; height: 125px" src="http://jsfiddle.net/schinckel/BLkmc/3/embedded/result,html,css/"></iframe>

As a bonus, I've disabled one of the elements.

From the perspective of KnockoutJS, we can use the `checked` binding applied to the radio buttons to see which one is selected. If you were submitting this inside a form, you may want to not use `display: none;` on them, as they may not submit under certain browsers. For ko, however, it's fine.

I'm going to be using this technique within koui: for segmented buttons, which I haven't worked out a nice way to define bindings for, and for the `tab_view` binding, which associates these buttons with a view below, containing a choice of data based on the selection.

Update: There is one drawback with the technique I used here. It is detailed at [How to fix the broken iPad form label issue](http://v4.thewatchmakerproject.com/blog/how-to-fix-the-broken-ipad-form-label-click-issue/).

It's actually a rather simple solution: All you need to do is stop the propagation of the event. I had played around with re-firing the event onto the input element, but that might fire twice in some browsers, which might be bad (especially if you were using checkboxes, rather than radio buttons!)

<iframe style="width: 100%; height: 125px" src="http://jsfiddle.net/schinckel/BLkmc/7/embedded/js,result,html,css/"></iframe>