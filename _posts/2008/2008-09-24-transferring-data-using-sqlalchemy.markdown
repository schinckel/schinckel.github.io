--- 
wordpress_id: 1563
layout: post
title: Transferring Data using SQLAlchemy
time: "10:24:01"
date: 2008-09-24 10:24:01
tags: 
- python
- sqlalchemy
wordpress_url: http://schinckel.net/2008/09/24/transferring-data-using-sqlalchemy/
---
I've had cause to transfer a whole stack of data from an old sqlite database to a PostgreSQL database, and since on the new database I am using SQL Alchemy, I used SA to do the transfer.

Because of some of the relations, I have had to keep IDs constant across some of the columns. This is fine, but because they have Sequence objects associated with them, these are not kept up to date with the 'custom' created IDs. Thus, when attempting to create a new row in the table, it often fails, since it is trying to add a primary key that already exists.

After a little bit of research, I discovered it is possible to force the sequence object to increment, using the command:

`nextID = engine.execute(Sequence('sequence_name'))`  


Using a little bit of magic, we can find out the largest index currently in use:

`maxID = db.query(Object).order_by('-id').first().id`  


And a simple while loop will keep incrementing until we have reached the correct id.
