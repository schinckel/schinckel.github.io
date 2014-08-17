---
date: 2012-01-10 13:52:05
layout: post
publish: true
tags: [knockoutjs]
time: '13:52:05'
title: Binding to head elements in KnockoutJS
---

By default, KnockoutJS binds to `<body>`, by the look of things. If you have something like:

{% highlight html %}
<html>
	<head>
		<title data-bind="text: title"></title>
	</head>
	<body>
		...
		<script>
			var vm = {
				title: ko.observable("This is the page title")
			};
			ko.applyBindings(vm);
		</script>
	</body>
</html>
{% endhighlight %}

The title will not be bound. Instead, you'll need to use (and I'm using jQuery):

{% highlight html %}
<html>
	<head>
		<title data-bind="text: title"></title>
	</head>
	<body>
		...
		<script>
			var vm = {
				title: ko.observable("This is the page title")
			};
			ko.applyBindings(vm, $('html')[0]);
		</script>
	</body>
</html>
{% endhighlight %}

You could also apply the binding twice, once to the head, and once to the body.
