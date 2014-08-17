---
date: 2013-04-05 23:20:42
layout: post
publish: true
tags: [django, postgres, schema, multi-tenancy]
title: Multi-tenanted Django

---


TL;DR : I made a thing: [django-multi-schema][django-multi-schema]. As pointed out in the comments, it's now known as [django-boardinghouse][django-boardinghouse].

## Software, as a Service (SaaS)

This is a term that has been around for a while. Basically, providing software that runs on a server, and selling access to that system. Instead of charging people for the software, you charge them a recurring fee for access to the hosted service.

If you have more than one customer, then you need to ensure that each customer can only access data that is 'theirs', rather than seeing everything. You need some way to *partition* the data, and there are two main ways to do this.

1. Every customer has their own server/database.
2. All the data is stored in one server/database.

## To each their own.

One way of partitioning data is to provision an application server, and a database for each customer. 

These web servers, and indeed the databases may not even be on different virtual machines, let alone physical machines. I manage a legacy PHP/MySQL application that runs each 'server' as an Apache VirtualHost, shares the codebase, and uses some configuration to route the database connections.

The advantages of this type of system is that it is *very* easy to move a single instance of the application onto a seperate server, if limits of server performance are reached. Depending upon the configuration, you still only need to upgrade one codebase, although typically there would be a seperate code installation per customer. The advantages of that is that you can upgrade customers individually, perhaps moving specific customers to a beta version.

The disadvantages of this type of setup are similar to what you would have if you had a big enough customer base anyway: multiple servers need to be upgraded, although getting them all done at exactly the same time is not as important if all requests to a given domain always go to a given server (and then to a given database).

However, if you are sharing code between installations, and each has a seperate database, then you _do_ need to migrate all of the databases at the same time, and at the same time as the codebase is updated.

The real disadvantages are about adding a new customer. You need to provision a new server, or at the least, setup a new VirtualHost, and create a new database. You also need to run any database migrations on several databases, but that should be part of the deployment process to each installation anyway.

Another issue that my arise is that each installation requires a seperate set of connections to its own database. If the databases are on the same database server, then this may be a limit that you reach sooner than you would like: but at that time you can just split off some databases to a seperate database server.

## There may be only one.

The alternative method of segmenting data is to use Foreign Keys. There is one database table, corresponding to a customer (which may not be a single user). Then, relevant other tables contain a foreign key back to that table, or to a table that links back to that table, or so on.

This is the way my main system I work on works. We have one django installation (or, possibly, several installations that share one database, but are effectively identical clones, just used for load handling). We have a ``Company`` table, and everything that should be limited to a given company links back to that, either directly or through a parent. For instance, a ``RosteredShift`` does not have a link to a company, but it does link to a ``RosterUnit``, which is linked to a company.

The advantages of this are that you have a single server that needs to be upgraded, or multiple identical servers (that you can just upgrade in parallel). You have a single database, that, again, only needs to be upgraded once. You only have to manage a single database backup, and, importantly, your database connections are equally shared across all of your customers. Indeed, your load is evenly shared, too.

Scaling up is still possible: we can easily stick an extra N app servers into our app server pool, and the load balancer will just farm requests off to that. Sharding databases becomes a bit harder, as you cannot just shift a single customer's data off onto a seperate database (or indeed push a highly used customer's app server onto a seperate machine).

The big danger is that a customer may get access to data that belongs to a different customer. In some ways this is the same issue as to within a customer's users some users seeing data they shouldn't, but is a bit scarier.

With a single server, and a single domain name, usernames must be unique across all of your customers' users. This sounds easy: just use email addresses. They are unique. That works well, until an employee of one customer moves to a different employer, that also happens to be your customer, and *BANG*, email conflict. You don't want to just move the user, as that would break history for the previous employer. Indeed, they may even be employed by both of your customers at the same time. Possibly without those employers knowing about one another. Privacy, man.

Another useful thing is being able to shift data to a different customer. This is a bit of a double-edged sword - in reality we stopped doing this, and now create a copy of the relevant data for the new customer (for instance, when a Subway store changes hands). That means the previous owner can retain access to their historical data.

Finally, support staff only need to look in one place to see all customer data. They don't need to extract from a frazzled user who they work for in order to check why their login is not working correctly, for instance.

## A middle ground

One of the advantages of a single server is that you share database connections. No more running out of connections because each customer requires X connections. But, [Postgres](http://www.postgresql.org/) has a feature called [schemas][postgres-schemas], that sits between database and table:

{% highlight text %}
<database>.<schema>.<table>.<column>
{% endhighlight %}

  
Any query can use a fully qualified, or partially qualified name to refer to a database, schema, table or column.

Postgres uses the term schema differently to the idea of an SQL schema. Instead of meaning the table definitions, a schema is a named sub-database. Every postgres database has at least one schema, usually called `public`.

Postgres determines which schema should be searched for a matching table using a `search_path`. This can be a list of schemata: the first one in the list with a matching table will be used for queries against that table name. The default search path is `"$user","public"`, which looks in the schema matching the connected user, then the public schema. A schema that does not exist is just ignored in the search path.

So, we can split our data into one schema per customer. That has the nice side effect of preventing data leakage due to programmer error, as a connection to the database (which has a specific search path at that time), cannot possibly return data to which it should not have access.

## Starting to narrow

I work in [Django](http://www.djangoproject.com), so from here on in, it's starts to get rather specific to that framework.

## Which schema, when?

One solution to this problem is to take the approach mirroring the 'one server per customer' approach. That is, each customer gets a seperate domain. Requests coming in are matched against the domain name that was used in the request, and then set the search path. This is quite simple, and is how [django-schemata][django-schemata] works. Some middleware matches up the incoming domain to the relevant schema settings, and sets the search path. Indeed, this is the simplest possible approach, as was intended. The schemata are set in the django settings file, which means _you cannot create a new schema on the fly_. [django-appschema][django-appschema] does allow this, by using a model in the public schema that contains the list of schema.

This is not the approach I want, as I want everything to come in on the same domain.

So, I came up with a different concept. Base the schema selection upon the logged in user.

When a request comes in, use a lookup table of some sort to determine which schema should be used. Now, since this needs to happen after authentication, we will still need to store `auth_user` and friends in the `public` schema. But that's alright. We can have a related object that determines which schema should be used for looking up the rest of the data, and ensure that those requests which should be schema-aware use that schema.

Indeed, it may be possible for a user to be able to choose between schemata, so we also need a way to pass this information. I settled on storing the desired schema in ``request.session``, and the middleware checks that the authenticated user is allowed to access that schema.

## That was the easy part

Working out what the search path should be is indeed the easy part. Set it at the start of the request (our middleware should be early in the chain), and away you go.

The hard problems are avoided by django-schemata because each 'site' has it's own schema, and all of it's tables are stored in there. Thus, you can simply run ``./manage.py syncdb`` or ``./manage.py migrate`` for each schema, and away you go. They provide a ``manage_schemata`` tool, which does just this. They also avoid shared apps, to simplify things.

I needed to be able to share models: indeed, by default, a model _is_ shared. They live in the ``public`` schema, and queries will be on this schema. The approach I used was that, instead of using the ``SHARED_APPS``, you need to explicitly mark a Model as "schema aware".

The only time this really matters is at DDL time. When you query a table, Postgres looks in the search path. As long as you have ``schema_name,public``, you will be fine for all reads and writes. However, to create the tables, you need to use some smarts.

### syncdb

Whenever a ``syncdb`` happens, we need to do a few things:

* Make sure we have our ``clone_schema`` SQL function loaded. This will be used to clone the schema structure from `__template__` to new schemata.
* Make sure we have a schema with the name `__template__`.
* Set the search path: in this case it will be ``public,__template__``. Usually, it will be the other way around, but for this case, we want tables to be created in public, unless we explicitly mark them to be created in `__template__`.
* Run the ``syncdb`` command.
* Create schemata for any Schema objects we have in the database.

The syncdb command just runs the normal old syncdb (or south's, if that is installed). However, we do have a couple of bits of evil, evil magic.

Firstly, we don't use the standard postgres database backend. Instead, we have one that subtly changes the ``DatabaseCreation.sql_create_model`` process. If a model is schema aware, we inject into the ``CREATE TABLE`` commands the schema. Thus:

{% highlight sql %}
CREATE TABLE "foo" ...;
{% endhighlight %}

Becomes:
    
{% highlight sql %}
CREATE TABLE "__template__"."foo" ...;
{% endhighlight %}

In fact, it's a little more than that. We can pass in the name of the schema we are writing to, so, in our second trick, we add a ``post_syncdb`` listener, which iterates through all of the schemata, re-running just this command, with the schema passed in.

### loaddata

An override of the ``loaddata`` command adds the ability to declare the schema: the search path is then set before running the command. Simple.

### dumpdata

The override for this command also allows passing in the schema name. Data in schema aware models will only be fetched from here (or the template schema, if nothing is passed in, which should be empty).


## Migrations

Unless you are crazy, you probably already use [South][south] for migrations. So, the second really hard problem is how to apply the migrations to each schema.

Basically, we want to run each operation, if the model is schema aware, on the template schema, and then on each real schema. But, we can't just run the migrations multiple times with the search path altered, because (a) South stores it's migration record in a table in public, so the subsequent runs of the migration would not do anything, and (b) even if we could run them, any operations on the public schema would fail, as they have already been performed.

This looks like a really hard problem, and initially seemed insurmountable. However, there is one thing which makes it really quite simple. South looks in your settings file for ``SOUTH_DATABASE_ADAPTERS``. I'm not sure this normally gets used, but it is required if you are not using a django database backend that South recognises. Like ours.

So, the database adapter is just a thin wrapper over South's builtin postgres backend. It expects to find a class called ``DatabaseOperations``, and wraps all of the methods that create/rename/delete or whatever tables and columns.

And the wrapper is quite simple. It finds the django model that matches the database table name, and then, if that model is schema aware, repeats the operation on each schema, and then the template schema. If the model is not schema aware, then we set the search path just to the public schema, so create operations will affect that.

## More hackery

Admin users are permitted to see data from all schemata, so it's possible they'll see a link to an object that is not in their schema. Primary keys are unique across all schemata (but this is simply because the index is shared between them in this implementation), so they'll get a 404 if they try to follow it. If PKs were not unique across schemata, then they might see the wrong object. Anyway, we can leverage the schema-switching middleware by passing in the correct schema in the URL. But to do this, we need to know at ``LogEntry`` creation time which schema is active, if the object is schema aware. So, I monkey-patch LogEntry to store this information, and generate URLs that include it.

I've also done a bit of work on adding the schema in when you serialise data. This is mainly for dumpdata, as I don't think you should be passing around objects for deserialisation to untrusted sources: it really should be going through form validation or similar. But for loaddata/dumpdata, it might be useful. At this stage the schema value is not used, but eventually the deserialiser should look at that, and somehow ensure the object is created in the correct schema. For now, just use ``loaddata --schema ...``. That's better anyway.

## ImproperlyConfigured

One really nice thing about django is that it has an ``ImproperlyConfigured`` exception, which I have leveraged. If the database engine(s), south database adapter(s) or middleware are missing or incorrect, it refuses to load. This is conservative: you may have a database of a different engine type, or have no schema aware models, but for now it's not a bad idea.

Also, if South is not installed _before_ us, we need to bail out.

Well, that's most of it. There's some more gravy (signals before and after activation of schema, as well as when a new schema is created), but while it has been tested, there is no automated test suite as yet. Nor is there a public example project. But they are coming.

Oh, and it's up on BitBucket: [django-multi-schema][django-multi-schema]. Although, I'm not that happy with the name.

[django-appschema]: https://bitbucket.org/cedarlab/django-appschema/
[django-multi-schema]: https://bitbucket.org/schinckel/django-multi-schema/
[django-boardinghouse]: https://django-boardinghouse.readthedocs.org/
[django-schemata]: https://github.com/tuttle/django-schemata
[south]: http://south.aeracode.org
[postgres-schemas]: http://www.postgresql.org/docs/9.2/static/ddl-schemas.html