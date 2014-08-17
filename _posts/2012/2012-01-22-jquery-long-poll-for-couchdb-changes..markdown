---
date: 2012-01-22 22:02:56
layout: post
publish: true
tags: [jquery, couchdb, ajax, long-polling]
time: '22:02:56'
title: jQuery long-poll for CouchDB changes.

---


I spent a bit of time this weekend playing with CouchDB. I think I have almost figured out how to do some stuff that had been bugging me. Coming to a document-based store after so much time and effort on relational DBMS does mean you really need to approach things from a different direction.

Our project is basically a multi-tenanted hosted application. Each customer has their own data, and within a relational model you basically have a field in each table that references the customer the data belongs to. Either that, or you have a seperate database and installation per-customer, but that doesn't scale well on a system like ours that get intermittent use throughout the week.

I'm going to talk more about CouchDB and segmenting the data later, but the best solution is to have a single database per-customer. This makes more sense when you know how CouchDB works: a CouchDB database is a container for documents. Grouping these by customer means you can easily replicate one customer's data, or move it to a different node.

One really nice feature of CouchDB is the changes feed. From this, you can subscribe to _all_ of the changes that occur in a database, and this could be filtered (so a user would only be notified of changes to documents that they have read-access on, for instance).

This could potentially solve lots of problems that we have with different users from the same company working on the same roster at the same time, and those changes automatically appearing in everyone's browser.

There are three types of change feeds that are interesting:

1. The list of changes since I last checked (I send in a sequence number).
2. The same, but handled using long-polling (I keep the request open until a change occurs).
3. A continuous polling approach, where changes are sent to my open connection as they occur.

I really liked the sound of the last one, but `$.stream`, the only library I could find that did that for jQuery had some issues: like the fact is sent the request by POST, and that I couldn't actually get it to see any data that was coming back in.

To solve the problem using #1, you could write some code that keeps track of the sequence number, and runs a request every X seconds. But I liked the idea of long-polling.

The idea I had was to run a request, and in the success handler, recursively call the function. To actually handle the incoming data, I thought that it might be a good solution to use jQuery events. I'm having them triggered on `$(document)`, as I haven't seen a standard way to do this. The other option might be on `$(window)`, or a passed-in object.

<script src="https://gist.github.com/1656641.js?file=jquery.couch.longpoll.js"></script>