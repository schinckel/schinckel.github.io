---
date: 2013-11-29 08:39:23
layout: post
publish: true
tags: [html, custom-element, forms]
title: Custom Element Form Submission

---


Custom elements are starting to get some traction in Web Development. There have been some really nice recent posts, the one which got me back on track was [Web Components: Why You're Already an Expert](http://markdalgleish.com/2013/11/web-components-why-youre-already-an-expert/), but also [Custom Elements: defining new elements in HTML](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/) and [Performance and Custom Elements](http://www.stevesouders.com/blog/2013/11/26/performance-and-custom-elements/). Also, [Polymer](http://www.polymer-project.org) makes heavy use of Custom Elements, and I've had a bit of a look there too.

I really like [KnockoutJS](http://knockoutjs.com), so started playing around with that. I have a nicely defined DatePicker element, that would work well being turned into a Custom Element, and allow me to use the Shadow DOM to hide the internals of the code.

However, I soon hit a problem. Browsers, and jQuery, will only add data to a form when the element type is `<input>`, `<select>`, `<textarea>` and `<keygen>`. In jQuery, for instance, this is hard-coded in as `rsubmittable`, [see source](https://github.com/jquery/jquery/blob/master/src/serialize.js#L13).
  
This means that you cannot just use a `<x-date-picker>` element, and have it submit. You still need to use some type of a hidden `<input>` element, and link that to the value. "Subclassing" `<input>` is not sufficient.

This seems to be a fairly large oversight, and I have not been able to find anything else on the internet that discusses this.

I haven't tried "subclassing" `<button>` yet, to see if it is possible to create custom elements that can be used to submit forms, rather than provide data for them.