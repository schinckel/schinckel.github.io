--- 
wordpress_id: 273
layout: post
title: Deeper iTunes Data
time: "18:20:59"
date: 2005-07-18 18:20:59
tags: 
- itunes
wordpress_url: http://schinckel.net/2005/07/18/deeper-itunes-data/
---
I came across an interesting question today: Why doesn't iTunes store all of the data about each time a song is played? And also, how much of the song was played? It should be easy to write a daemon that monitors iTunes, and writes this data to a database. This database can then be cross-referenced against the iTunes database for a comprehensive breakdown of when songs are played. You can then find all of the songs that you listen to at a certain time of day, or season, and so on. You can also have a 'how-often-played', but cross referencing the Date Added attribute with the Play Count and so on. I've already started to write this program, but it will likely be MacOS X only. 
