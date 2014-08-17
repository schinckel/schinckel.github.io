--- 
wordpress_id: 1616
layout: post
title: Sometimes, the bugs aren't mine...
time: "14:08:27"
date: 2008-12-10 14:08:27
tags: 
- general
- subethaedit
- sqlalchemy
wordpress_url: http://schinckel.net/2008/12/10/sometimes-the-bugs-arent-mine/
---
I've just spent about five hours working out some kinks with data migration between an SQLite database, and a PostgreSQL database. I'm using SQLAlchemy as the transfer tool, since the newer PGSQL database is created and only ever used through this interface.

The big issue I've hit is with some Numeric types. One table has Numeric values, which are NULLABLE, but for some reason when I try to load objects from this table, decimal.Decimal throws an exception.

But here is the weird bit. If I rerun the query, and try to load the same object a second time, it succeeds.

Since I needed to access all of the rows from this table, I had to keep trying to load them until I'm no longer throwing exceptions, and then finish. I had a nice code sample from SubEthaEdit, but that seems to have a bit of a bug with the Copy As XHTML feature in the newest build (submitting a bug report now).
