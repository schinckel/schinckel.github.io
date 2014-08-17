---
date: 2011-10-15 21:19:58
layout: post
publish: true
tags: [django, postgres]
time: '21:19:58'
title: Postgres and Django

---


Frank Wiles gave a great talk [Secrets of PostgreSQL Performance][SoPP]

## Don't do dumb things

* Dedicate a single server to your database
* Only fetch what you need

## Do smart things

* cache everything
* limit number of queries

## Tuning

* shared\_buffers : 25% of available RAM
* effective\_cache\_size : OS disk cache size
* work_mem : in-memory sort size

### Less important

* wal\_buffers : set to 16MB
* checkpoint\_segments : at least 10
* maintenance\_work\_mem : 50MB for every GB of RAM

Can also transactionally turn on grouping of transactions.

## Hardware

* As much RAM as you can afford - fit whole db if you can.
* Faster disks.
  - Disk speed is important
  - RAID5 is bad
  - RAID-1+0 is good
  - WAL on own disk &rarr; 4x write performance
* CPU speed - unlikely to be the limiting factor.

## Other

* use pg_bouncer to pool connections
* use tablespaces to move tables/indexes onto other disks
  + ie, indexes on fastest disk
  + stuff that might run in background and hit only specific tables that are
    not used by other bits


[SoPP]:  http://blip.tv/djangocon/secrets-of-postgresql-performance-5572403?utm\_medium=twitter&utm\_source=twitterfeed
