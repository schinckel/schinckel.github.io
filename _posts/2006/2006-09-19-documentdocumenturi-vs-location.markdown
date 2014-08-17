--- 
wordpress_id: 977
layout: post
title: document.documentURI vs. location
time: "00:02:33"
date: 2006-09-19 00:02:33
tags: 
- javascript
- rants-and-raves
wordpress_url: http://schinckel.net/2006/09/19/documentdocumenturi-vs-location/
---
Apparently, document.documentURI and document.location are not identical. Basically, document.location is not a string, so to treat it like one, you need to do: `(document.location+"").split("/")` Instead of: `document.documentURI.split("/")` Stupid IE. 
