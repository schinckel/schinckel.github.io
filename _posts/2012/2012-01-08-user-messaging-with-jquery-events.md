---
date: 2012-01-08 14:16:37
layout: post
publish: true
tags: [jquery, javascript, ui, messaging]
time: '14:16:37'
title: User messaging with jQuery events

---

Something I seem to be re-implementing over and over again is a way of displaying user messages in response to user interactions. For instance, when form data is invalid, or a click on an element could not perform the desired action.

Using KnockoutJS, I had been using a `messages` object within my ViewModel, but that felt dirty: I always had to code in specific message handling. Having things hook into one another's ViewModels became very messy.

The other day at work, I rediscovered django's signals, and went a little nuts replacing other ways of doing things (often using callbacks) with signals. This becomes cleaner once you have multiple things that need to listen.

Signals are a bit like jQuery Events, and it occurred to me that I can do a nice messaging framework using them.

The general concept is this: you have an element in your page that you want to designate as the message display port. (Technically, you could have several: you can even set them up to filter, but that's another story). You just set this up like (we'll talk about the options later):

{% highlight html %}
<div data-bind='messages: {}'></div>
{% endhighlight %}

Then, _anywhere_ within your page, you have an element simply trigger an event. For instance, you might have this as an event handler:

{% highlight js %}
// Foo
var eventHandler = function(evt) {
  var $target = $(evt.target);
  $target.trigger('message', {type: 'error', message: 'Oops!'});
}
{% endhighlight %}

It's currently still under development. You can see where it is at now at [messages.js](https://bitbucket.org/schinckel/koui/src/8fca925bbe25/src/js/messages.js). It is part of [koui](https://bitbucket.org/schinckel/koui/), which is a GUI framework that is built on top of KnockoutJS, but it can stand alone. It does depend on KO, ko.mapping, jQuery and underscore.js.
