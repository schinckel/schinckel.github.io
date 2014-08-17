---
date: 2012-01-26 22:37:57
layout: post
publish: true
tags: [knockoutjs, HTML5]
time: '22:37:57'
title: 'Re: HTML is not XAML'

---


This is a response to [MVVM on MVC: HTML is not XAML](http://csharperimage.jeremylikness.com/2012/01/mvvm-on-mvc-html-is-not-xaml.html#comment-form). I attempted to post a comment, first from my iPad, but after a few characters the `textarea` became unresponsive. Then, from my iMac, I was able to enter a comment, but not post it. It seems like something weird is happening when it shows me the CAPTCHA, and it dismisses the dialog before I can do anything. Disabling JavaScript prevents me from commenting. (But to be honest, using DISQUS does the same).

I'll start by saying that I'm not a Silverlight developer, indeed, I do nothing with any part of the Microsoft development stack. I don't think I even have _any_ Microsoft software installed on either my work or home machines. I have been doing a lot of stuff with [KnockoutJS](http://knockoutjs.com/index.html) lately, though.

Jeremy makes some valid points about _designer_ &harr; _developer_ interactions. Maybe I'm (un)lucky, but my interactions with a designer seem to be that (s)he provides me with an image, and I make the HTML match. Either that, or I do the design work myself. In that case, I design _in_ the browser. Safari's inspector allows you to alter CSS rules and view their impact live. This also means that my HTML is always as sparse as I can possibly make it.

Before I get to the main point, regarding using bindings inside the HTML, there is one thing I just need to point out. Jeremy has the code:

{% highlight html %}
<div id="menuContainer">
  <ul id="menu">
    <li data-bind="foreach: menuItem">
      <span data-bind="text: name">Name</span>
    </li>
  </ul>
</div>
{% endhighlight %}

This would only create one `<li>` element, with multiple `<span>` elements. In addition, the `Name` text is superfluous, and would be replaced when the bindings were applied. To match the intent of the previously listed code, I think he meant (and I'm spelling some stuff differently):

{% highlight html %}
<nav class="main-menu">
  <ul data-bind="foreach: menuItems">
    <li>
      <a data-bind="text: name, attr: {href: url}"></a>
    </li>
  </ul>
</nav>
{% endhighlight %}

Jeremy then goes on to discuss a way to have all of these bindings applied using code.

Personally, being able to bind the data declaratively is one thing that really draws me to KnockoutJS. It's easy to see the HTML structure, and what data is bound to them. In fact, in some ways it reminds me lots of Cocoa Bindings.

One of his beefs is that designers may muck with the code. I think this could be easily remedied by a little education: _don't touch anything that has `data-bind="..."`_. This really isn't that different to _don't touch anything's `id`_.

But a deeper problem is that by adding the bindings in code means that you can't see from the HTML what flow control will be used to handle the layout. Assuming you are still able to apply the `foreach` binding to the `ul` in the example above if it had an `id` instead, it's not obvious that there may be multiple items. Maybe that's not the greatest example, as it is a list, so there probably will, but `foreach` can be used anywhere.

And there are more, too: `if` allows you to have bits that are not rendered (significantly different to just making them invisible). Plus, if you use the `with` binding, then you would need to keep in your head the nested structure of what you are accessing inside the `with` block. Do it in HTML, and you can see (assuming you have reasonable indenting).

Jeremy seems to come to the agreement (in one of his comments), that having the application of the bindings in the code makes things even more complicated, but I propose that it even makes them more brittle. No longer are you relying just on the names of the ViewModel's attributes, but you are also relying on the ids of the HTML elements. And this is the kicker: a binding to a name that no longer exists in the ViewModel will fail when you try to view the page, meaning nothing will work (and you'll see a nice red message in your console). What will the following code do if there is no matching HTML element?

{% highlight js %}
$('#spelled-this-id-worng').attr('data-bind', 'value: theValue');
{% endhighlight %}

It does nothing.

But it does it silently.