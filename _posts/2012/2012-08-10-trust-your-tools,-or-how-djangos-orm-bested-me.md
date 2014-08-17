---
date: 2012-08-10 09:53:06
layout: post
publish: true
tags: [django, orm, sql]
title: "Trust your tools, or how django's ORM bested me"
---


Within my system, there is a complicated set of rules for determining if a person is "inactive".

They may have been explicitly marked as inactive, or their company may have been marked as inactive. These are simple to discover and filter to only get active people:

{% highlight python %}
Person.objects.filter(active=True, company__active=True)
{% endhighlight %}

The other clause for inactive users is if they only work at locations that have been marked as inactive. This means we can disable a location (within a company that remains active), and not have to manually deactivate the staff who only work at that location; it also means when we reactivate a location, staff will automatically be restored to an active state.

I've written the code several times that determines the activity status, but have never really been that happy with it. It generally degenerates into something that uses N+1 queries to discover the activity status of N people, or requires using django's `queryset.extra()` method to run queries within the database.

Now, I have a cause to fetch all active staff, from the entire system. Which I had written a query to do, but it was mistakenly including staff who are only active at inactive units. I tried playing around with `.extra(select={...})`, but was not able to filter on the pseudo-fields that were generated.

Then, I had the idea to do the following:

{% highlight python %}
active = Location.objects.active()
inactive = Location.objects.inactive()
Person.objects.filter(
  Q(locations__in=active) | ~Q(locations__in=inactive)
)
{% endhighlight %}

As long as the objects `active` and `inactive` are querysets, they will be lazily evaluated, and the SQL that is generated is relatively concise:

{% highlight sql %}
SELECT ... 
FROM "people" 
LEFT OUTER JOIN "people_locations" 
ON ("people"."id" = "people_locations"."person_id") 
WHERE (
  "people_locations"."location_id" IN (
    SELECT U0."id" FROM "location" U0 WHERE U0."status" = 0
  )
  OR NOT ((
    "people"."id" IN (
      SELECT U1."person_id" FROM "people_locations" U1 WHERE (
        U1."location_id" IN (
          SELECT U0."id" FROM "location" U0 WHERE U0."status" = 1
        )
        AND U1."person_id" IS NOT NULL
      )
    ) 
    AND "people"."id" IS NOT NULL)
  )
)
ORDER BY "..." ASC
{% endhighlight %}

This is much better than how I had previously done it, and has the bonus of being db-agnostic: wheras my previous solution used Postgres `ARRAY` types to aggregate the statuses of locations into a list.

The moral of the story: trust your high-level abstraction tools, and use them first. If you still have performance issues, then look at optimising.