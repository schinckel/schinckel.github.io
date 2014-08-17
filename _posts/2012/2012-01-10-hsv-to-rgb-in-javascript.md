---
date: 2012-01-10 07:56:02
layout: post
publish: true
tags: [colour, javascript, css, knockoutjs, rgb, hsv]
time: "07:56:02"
title: HSV to RGB in JavaScript

---


I am writing a set of UI widgets for use in web apps, using the excellent KnockoutJS library. One of the more challenging ones has been the colour picker. Rather than do what everyone else has done, I tried to ape the Apple Colour Picker. But this gives us values in HSV, which aren't that useful for web.

So I came across a page that has a JavaScript HSV to RGB converter: [http://jsres.blogspot.com/2008/01/convert-hsv-to-rgb-equivalent.html](http://jsres.blogspot.com/2008/01/convert-hsv-to-rgb-equivalent.html). And there are so many things wrong with that code that it hurts.

* the declared variables r,g,b are not used at all.
* RGB is defined as an Array, but used as an Object.
* var_r and friends are not declared, and pollute the global namespace.

Plus, more I came across as I worked through the code.

So, I thought I'd clean it up, and make it a bit easier to follow.

<script src="https://gist.github.com/1588489.js?file=hsv2rgb.js"></script>

Some of the bits that are 'tricky' are the use of `toString(16)`, which converts a number to a base 16 representation, and the ``("0" + value).slice(-2)``, which zero-pads a string.

The algorithm itself is fairly easy to follow: there are seven possible cases for the data conversion. If the `saturation` is 0, then RGB is ``#000000``.

Otherwise, the value depends on the value of `Math.floor(h/60)`. There is a simple lookup table (`data`), which stores three values based on `hue`, `saturation` and `value`, and then it's just a matter of picking the correct two to use with the `value`, and returning that.