--- 
wordpress_id: 1423
layout: post
title: Getting the largest ID in a database
time: "12:27:19"
date: 2008-05-23 12:27:19
tags: 
- general
wordpress_url: http://schinckel.net/2008/05/23/getting-the-largest-id-in-a-database/
---
I ♥ SQL Alchemy.

I'm currently rewriting a database so that the schema definition is in SQL Alchemy, allowing for us to deploy it across a range of platforms with a bit more ease.

We had been using some sequence types to automatically set the primary key to a new unique integer. Think Autoincrement in Access, if that's where you've done some database stuff, or in MySQL I believe it's AUTO_INCREMENT.

In SQL Alchemy, you get to define Tables in python, like this:

  
log_table = Table('log', metadata,  
Column('IP', String(15), primary_key=True),  
Column('timestamp', DateTime, primary_key=True),  
Column('reqSize', Integer),  
Column('resSize', Integer),  
Column('time', Float),  
Column('reqName', String(256)),  
Column('reqData', String(4096)),  
Column('resData', String(4096)),  
Column('reqObj', String(4096)),  
Column('resObj', String(4096))) 

Now, if you need a sequence type, then you can use a Sequence() object. But what if you have existing data, which may or may not have holes, and you need to ensure you don't have any collisions?

`db.query(Person).order_by('id').all()[-1].id + 1`  


This will query and get the Person object with the highest id, and add one to it.

You can then use this as an argument to the Sequence() object, and it will only generate the sequence from that value onwards.
