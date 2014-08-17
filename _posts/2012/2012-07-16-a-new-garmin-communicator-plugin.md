---
date: 2012-07-16 00:17:57
layout: post
publish: true
tags: [javascript, garmin, jquery]
title: A new Garmin Communicator plugin

---


As part of my plan to create a workout editor, I had to look into the method of communicating between the Garmin plugin and the browser.

It feels like a Java application. It's documented like it, too. But, it's written in Prototype, and includes a whole stack of other tools, like XML handling, Ajax communication, and messaging. Things that should belong in seperate parts, IMHO.

So, after a fair bit of plugging around, I was able to make enough sense of it to figure out exactly how it works:

1. You unlock the plugin with a key-pair
2. You get a list of devices
3. If this is a send, then you set the value of a certain property.
3. You start an Async communication.
4. You poll the 'finish' version of that communication.
5. When the communication is finished, if this was a receive, you load the data from a property.

I understand why they have made the plugin handle it's communication in an async manner, but seriously: *why not allow for a callback function when the communication is finished?* To me, that feels like it would make so much more sense.

Anyway, my other main criticism is that it is inherently unsafe for multiple operations. Instead of, as would be possible with a callback that gets executed when the communication is finished, returning the data, it puts it into a property within the plugin. Which does mean that any bit of code can read it, but also means it's possible to accidentally overwrite it, as the same property is used for writes.

So, the API for replacing it looks more like:

{% highlight js %}
var plugin = new Garmin.Communicator();
plugin.selectDevice(0);
plugin.readActivities(function(data) {
  // data contains the XML activity data.
});
{% endhighlight %}

It's actually a little more complicated than this: we can pass in delegates, that will have callback methods called when certain events occur. These events are also pushed (using jQuery) onto the HTML element that is the plugin object. But, due to a jQuery bug, you need to listen further up the chain: so you can listen for these events on `body`.

This script will also add the plugin to the page if it cannot find it, and will run as a singleton: calling the constructor a second time will return the original object, but also add a new delegate to the list of delegates.

I'm tempted to remove the delegate handling, and simply have it as callback-based, but this is sort-of a transition from the way the Garmin team have done it. I'm concerned there may be issues with non-UI initiated read/write events (ie, those that happen on page load) 'beating' the plugin being ready, but that is a job for another day.

I've also written some Knockout bindings for this: but those are not quite ready for public consumption. I may actually write parsing code for the Training Center Database XML file, and the types it contains, and include that with this project. But, then I may be approaching the bloat seen in the actual Garmin plugin. At this stage, if you have a server that accepts TCX files, then this should be enough.

The project is on BitBucket, as usual: [garmin-plugin](https://bitbucket.org/schinckel/garmin-plugin).