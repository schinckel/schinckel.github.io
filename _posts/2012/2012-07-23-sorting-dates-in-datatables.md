---
date: 2012-07-23 12:19:59
layout: post
publish: true
tags: [js, datatables, jquery, iso8601, django]
title: Sorting dates in DataTables

---


If you have tabular data, then semantically, you'll want to put it into an HTML table. It makes sense, and is certainly easier than trying to post-style nested divs as a table.

The other really nice thing is that it's fairly easy to use [DataTables](http://datatables.net/index) to then make that table dynamic. Especially useful if your table is large: I use it on a report of all customers in my work, and have just started using it in some user-facing pages. In essence, it is as simple as doing:

{% highlight js %}
$('#table-id').dataTable();
{% endhighlight %}

With this, you get sortable columns, pagination, and searching.

But sorting of dates sucks, unless they are in ISO8601 format. ISO8601 is fantastic, by the way. Not only do you get dates/datetimes that are inherently no longer ambiguous, but they sort alphabetically, as you would expect. Because every field is larger than all of the fields following it, and all fields are zero-padded, eveny date or datetime will be correctly sorted.

However, the general public does not understand these two reasons for a 'one true date format', so we are generally forced to display it in a more readable format. Which doesn't sort alphabetically.

There is a trick you can use to get sorting, and nice dates using DataTables, though. For example, the following (rendered) html will sort correctly, both ascending and desencding, but also only display a nice format:

{% highlight html %}
<td>
  <span style="display: none;">2012-06-07</span>
  Thursday, June 7th, 2012
</td>
{% endhighlight %}

In django, you can use the following snippet:

{% highlight html %}
<td>{% raw %}
  <span style="display: none;">{{ value|date:"Y-m-d" }}</span>
  {{ value|date:"l, F jS, Y" }}
</td>{% endraw %}
{% endhighlight %}

Recently, DataTables also had a [blog post](http://datatables.net/blog/Twitter_Bootstrap_2) about how to use it with [Twitter Bootstrap 2](http://twitter.github.com/bootstrap/index.html). I think it looks rather nice. And with this tip, it is so much more useful.

You can also use this way of thinking on other things that should be sorted differently to how they are printed.