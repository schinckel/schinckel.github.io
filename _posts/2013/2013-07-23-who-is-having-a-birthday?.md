---
date: 2013-07-23 13:45:35
layout: post
publish: true
tags: [django, postgres, sql]
title: Who is having a birthday?

---


The latest thing I have been working on is notifications for our project. One of the required notification types is upcoming (and today's) birthdays (and expiring work visas, but that's a much easier problem).

This actually turns out to be quite a hard problem. There are some simple solutions, but they all do not meet our requirements:

1. Store only the month and day of a person's birthday. This is unsatisfactory as we use their age to calculate their wage, if applicable.
2. Create a pseudo-column that contains their upcoming birthday. This gets hard when you take leap-day birthdays into account.

We need to fetch all people who have a birthday coming up in the next _X_ days. This is a requirement because if we just matched people who had a birthday in _X_ days, (a) leap days are easy to miss, and (b) changes to either the query period or a person's birthday could mean some events were missed.

Instead, we will query for birthdays in a range, and see if we have already sent a notification for this instance of their birthday. If not, we will send a notification.

One solution is to look at all of the dates in the given range, in the format ``-%m-%d``, and query using contains against this list:

    dates = [start+datetime.timedelta(i) for i in range((finish-start).days)]
    filters = [Q(dob__contains=x.strftime('-%m-%d')) for x in dates]
    Person.objects.filter(reduce(operator.or_, filters))

But, this too fails when a birthday on a leap day exists, and this year is not a leap year.

(We use the `-%m-%d` format instead of `%m-%d` so we don't get false matches from the year part of the date).

Then I came across a post by [Zoltán Böszörményi](http://www.postgresql.org/message-id/481E08F1.3000604@cybertec.at), that contains the following useful function:

    CREATE OR REPLACE FUNCTION indexable_month_day(date) RETURNS TEXT as $BODY$
      SELECT to_char($1, 'MM-DD');
    $BODY$ language 'sql' IMMUTABLE STRICT;
    

There are a couple of things to notice: it does ``MM-DD``, not the other way around. This allows us to sort lexically. Also, declaring it as ``IMMUTABLE`` means we will be able to create an index using it. And since we are querying against it, having an index may be useful:

    CREATE INDEX person_birthday_idx ON people (indexable_month_day(dob));

Now, we can also query against this. I like to use django queryset methods (see [building a higher-level query API](http://dabapps.com/blog/higher-level-query-api-django-orm/)), so my stuff looks like:

    class BirthdayQuerySetMixin(object):
        def birthday_between(self, start, finish):
            assert start <= finish, "Start must be less than or equal to finish"
            start = start - datetime.timedelta(1)
            finish = finish + datetime.timedelta(1)
            return self.extra(where=[
                """
                indexable_month_day(dob) < '%(finish)s' 
                %(andor)s 
                indexable_month_day(dob) > '%(start)s'
                """ % {
                    'start': start.strftime('%m-%d'),
                    'finish': finish.strftime('%m-%d'),
                    'andor': 'and' if start.year == finish.year else 'or'
                }
            ])
          
        def birthday_on(self, date):
            return self.birthday_between(date, date)


This has a caveat: it returns two matches for leap-day birthdays during non-leap-years. This is intentional, as other logic will prevent duplicate notifications, and we don't know which offsetting method people will prefer.

The logic behind it is that it offsets the start and the finish by one day each, and then filters using `less_than` and `greater_than`. This is what allows us to find leap-day birthdays. The other tricky part is using `AND` when the years of the start and finish are the same, and `OR` if the finish is in the next year. This allows it to match over year boundaries.

Oh, there should also be a check to ensure that we have less than a full year between start and finish: if it's a year or more, we can just return everyone!

Otherwise, it's all good, and we can use it to filter a queryset. I've put those methods in my ``PersonManager`` and ``PersonQuerySet`` (via [PassThroughManager](https://pypi.python.org/pypi/django-model-utils)), so I can do things like:

    >>> today = datetime.date.today()
    >>> Person.objects.birthday_between(today, today + datetime.timedelta(7))
    
… which provides me with a list of people who have a birthday within the next seven days.