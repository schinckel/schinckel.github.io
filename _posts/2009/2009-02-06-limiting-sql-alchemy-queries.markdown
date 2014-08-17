--- 
wordpress_id: 1639
layout: post
title: Limiting SQL Alchemy queries
time: "09:17:21"
date: 2009-02-06 09:17:21
tags: 
- python
- sqlalchemy
wordpress_url: http://schinckel.net/2009/02/06/limiting-sql-alchemy-queries/
---
Note for future reference: especially since the data migration script I was running today was running out of memory and crashing.

You can use slice notation, which limits the query:

`>>> for p in db.query(Person)[:10]:`  
`...   print p`

  


This rocks.
