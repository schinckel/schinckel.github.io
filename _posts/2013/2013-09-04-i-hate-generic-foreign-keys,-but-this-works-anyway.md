---
date: 2013-09-04 14:38:40
layout: post
publish: true
tags: [django, gfk, postgres]
title: I Hate Generic Foreign Keys, but this works anyway

---

  
I'm really not a fan of the concept of Generic Foreign Keys. They do have their place, and the app I've just started is a reasonable example.

It's django-activity-streams, and I'm using it essentially as an audit stream.
It stores the user who performed the change, the object that was changed, when it was changed, and a serialised version of the fields that have changed, in the format of:

{% highlight js %}
[
  {
    "field": "date_of_birth",
    "old": "1955-01-10",
    "new": "1955-10-01"
  }
]
{% endhighlight %}

Now, the complication comes when trying to generate reports based on this stuff, and that is all down to the use of GFKs.

Essentially, what I want to be able to do is:

{% highlight python %}
Action.objects.between(start, finish).verb('updated').filter(
  target__in=queryset
)
{% endhighlight %}

But this will not work, as there is no real `target` field: it's a GFK field. But we can query on the two fields that make it up: `target_content_type` and `target_object_id`.

So, you might think we can do something like:

{% highlight python %}
ctype = ContentType.objects.get_for_model(queryset.model)
Action.objects.filter(
  target_content_type=ctype,
  target_object_id__in=queryset
)
{% endhighlight %}

Alas, this will not work either, as `target_object_id` is a "character varying", and a queryset kind-of looks like a set of integers (or whatever the primary key for that table is).

So, we need a list of characters, instead of integers.

{% highlight python %}
pks = map(str, queryset.values_list('id', flat=True))
Action.objects.filter(
  target_content_type=ctype,
  target_object_id__in=pks
)
{% endhighlight %}

Indeed, that works, but (a) it requires two queries (one to get the PKs, and the other to get the actions), and (b) the second query will get very long if there are lots of objects in the queryset.

So, we want a query that we can use as a subquery. Enter postgres:

{% highlight python %}
pks = queryset.extra(select={'_id': 'SELECT CAST("id" AS text)'values('_id')
Action.objects.filter(
  target_content_type=ctype,
  target_object_id__in=pks
)
{% endhighlight %}

Bingo:

{% highlight sql %}
SELECT
    "actstream_action"."id",
    "actstream_action"."actor_content_type_id",
    "actstream_action"."actor_object_id",
    "actstream_action"."verb",
    "actstream_action"."description",
    "actstream_action"."target_content_type_id",
    "actstream_action"."target_object_id",
    "actstream_action"."action_object_content_type_id",
    "actstream_action"."action_object_object_id",
    "actstream_action"."timestamp",
    "actstream_action"."public",
    "actstream_action"."data"
FROM
    "actstream_action"
WHERE (
    "actstream_action"."verb" = created
    AND "actstream_action"."timestamp" <= 2013-09-11 00:00:00
    AND "actstream_action"."timestamp" >= 2001-01-01 00:00:00
    AND "actstream_action"."target_object_id" IN (
        SELECT
          (SELECT CAST("id" AS text)) AS "_id"
        FROM 
            "people" U0 
        WHERE 
            U0."comp_id" = 1 
    ) 
    AND "actstream_action"."target_content_type_id" = 17
)
ORDER BY
    "actstream_action"."timestamp" DESC;
{% endhighlight %}

You can see the subquery `SELECT (SELECT CAST(...))` after the `IN`, which in the previous version was a list of string versions of the ids.