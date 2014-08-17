---
date: 2012-01-14 20:14:51
layout: post
publish: true
tags: [knockoutjs, javascript, dirtyFlag]
time: '20:14:51'
title: KnockoutJS dirty extender.

---


Ryan Niemeyer is the man with respect to most things KnockoutJS, and I had been using a version of his [smart dirty flag](sdf) in some projects. I recall making it so it didn't have to bind to a secondary property, but I may be mistaken.

Anyway, with Knockout 2.0, we get extenders. Now, it's possible to do things like:

{% highlight js %}
var thing = ko.observable(null).extend({dirty: true});
{% endhighlight %}

It will then look for `ko.extenders.dirty`, and call that function with two arguments: the observable, and the argument (in this case, `true`).

Thus, it is possible to re-implement his dirty flag as an extender:

{% highlight js %}
ko.extenders.dirty = function(target, startDirty) {
  var cleanValue = ko.observable(ko.mapping.toJSON(target));
  var dirtyOverride = ko.observable(ko.utils.unwrapObservable(startDirty));
  
  target.isDirty = ko.computed(function(){
    return dirtyOverride() || ko.mapping.toJSON(target) !== cleanValue();
  });
  
  target.markClean = function(){
    cleanValue(ko.mapping.toJSON(target));
    dirtyOverride(false);
  };
  target.markDirty = function(){
    dirtyOverride(true);
  };
  
  return target;
};
{% endhighlight %}

The advantage I think mine has over Ryan's is that you can mark an observable as dirty (`thing.markDirty()`), and it will stay dirty until you explicitly mark it as clean (`thing.markClean()`).

Otherwise, it's just: `thing.isDirty()` and you are all good.

Alternatively, you could remove the two helper functions, and implement `.isDirty()` as a writeable observable, that tests the incoming value and sets the internal `cleanValue` if it needs to.