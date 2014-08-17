---
date: 2014-06-01 21:05:51
layout: post
publish: true
tags: [database, sql, postgres, audit, changelog]
title: In-Database Audit Trail

---

  
I've been thinking about audit trails, object versioning and the like a bit lately. We have situations where it's actually important to be able to know what changes were made, when, and by whom.

The tool we are currently using in [Django](https://www.djangoproject.com) for this is [django-reversion](http://django-reversion.readthedocs.org), but I'm not that happy with it. Part of the problem is that it adds a fair amount of overhead into each request, which we have noticed, and also that querying the data it produces is not simple, unless you are just looking for changes made to a specific object.

For our case, we want to know all the changes made to a set of objects (that may not all be of the same type), made within a given range, where there is (eventually) a foreign key relationship back to our Company model.

Part of the problem is just that: a custom solution could store the Company relationship explicitly, but also, we really care about what the changes were, rather than what the object looks like after the changes. Well, technically, we want both.

However, it has gotten me thinking about other ways to solve this problem.

In most DBMSs, it's possible to get a trigger function to run when an update happens to each row, which makes it possible to get access to this information. Indeed, googling "Postgres audit trigger" pops up some hits that are highly relevant. I looked at [Audit trigger 91plus](https://wiki.postgresql.org/wiki/Audit_trigger_91plus), since it's "improved". It has some really nice features like storing the audit data in an hstore column, which means you can query it.

However, one place where this type of trigger breaks down is that it's not generally possible to get the "application user" associated with a request, only the "database user", which for our system (and most other web applications) is fixed for all access.

One way to get around this might be to, at the start of every database transaction, inject a call that creates a temporary table, with the extra bits of data that you want to log, and then use that in the trigger function.

{% highlight sql %}
CREATE TEMP TABLE IF NOT EXISTS
  "_app_user" (user_id integer, ip_address inet);
{% endhighlight %}

Then we need to add (or update) the one row that will contain our data. We must ensure that we only ever have one row in this table.

{% highlight sql %}
UPDATE _app_user SET user_id=%s, ip_address=%s;
INSERT INTO _app_user (user_id, ip_address)
  SELECT %s, %s WHERE NOT EXISTS (SELECT * FROM _app_user);
{% endhighlight %}

This code will ensure that the first statement (`UPDATE`) will affect all rows in the table (of which there will be at most one), and the second statement (`INSERT ... SELECT ... WHERE NOT EXISTS ...`) will only create a new row if there are no rows currently in the table.

It's up to you to then pass the correct data to this. I'm currently looking at doing this using Django middleware, although I suspect this may fall down using the newer transaction handling, as otherwise we could have just ensured our middleware ran after the `TransactionMiddleware`. It may be possible to do it with a custom database backend, but it needs to somehow get access to the request object (which contains the user, and the ip address). Obviously, you could log other data about the request, too.

The final part of the puzzle is to inject this data into the row that will be used for the audit table entry. I modified the table definition so it included columns for the data I wanted: `app_user_id` and `app_ip_address`.

Then, inside the actual trigger function, after the `audit_row` object has been created, but before it is written to the table, we inject the data we want.

We need to be a little careful, as it's possible the table does not exist:

{% highlight sql %}
BEGIN
  PERFORM 
    n.nspname, c.relname 
  FROM
    pg_catalog.pg_class c 
  LEFT JOIN 
    pg_catalog.pg_namespace n
  ON n.oid = c.relnamespace
  WHERE
    n.nspname like 'pg_temp_%' 
  AND
    c.relname = '_app_user';

  IF FOUND THEN
    FOR r IN SELECT * FROM _app_user LIMIT 1 LOOP
      audit_row.app_user_id = r.user_id;
      audit_row.app_ip_address = r.ip_address;
    END LOOP;
    END IF;
END;
{% endhighlight %}

This checks to see if the `_app_user` table exists in any of the valid temporary table namespaces, and if so, grabs the first (and only, from above) entry, using the values to update the row.

This function then works: if there is a temporary table with this name, it uses these fields when creating the audit, if not, it creates the audit row with empty values. This would mean that some audit statements may not contain proper user data, but in the case of Django, it's possible to make changes outside of the request-response cycle. You could require that a user starting a shell session authenticates with a valid django username+password, but that still leaves management commands. I guess you could have a `system` account, but leaving these entries blank is like an explicit `system` user.

I haven't got any production code using anything like this: I'd still want to test that it works as expected as part of the request, and would want to build up some method of querying it. There's probably no reason you couldn't do the table definition as a Django model (and indeed, have the function definition as a migration).