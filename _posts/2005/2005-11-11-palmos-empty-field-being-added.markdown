--- 
wordpress_id: 560
layout: post
title: "PalmOS: Empty field being added"
time: "18:40:46"
date: 2005-11-11 18:40:46
tags: 
- palmos
wordpress_url: http://schinckel.net/2005/11/11/palmos-empty-field-being-added/
---
I came across an interesting bug in _iCal_/_Missing Sync_/_PalmOS_ the other day. It seems that PalmOS does not like the first character of a field to be the null character (`\0`). Having such a character in a field is okay if you are just viewing a record, but if you edit such a record you will get a nasty crash. It actually took me quite some time to figure out what was going on, but more importantly, how to fix it. I was lucky in a sense, as the records I was having issues with were all Contacts (Address Book entries). To begin with I thought it was a problem with Agendus, and I tried reinstalling all of my data and applications. No good. Eventually I figured out what was actually going on. As far as I can tell, it all came from the import of data I did a week or so ago. Except that at least one record other than these was also affected. To solve it was simple. Drag the affected records out of Address Book and then drag the generated file back in. Apparently Address Book's _Export As vCard_ has better data checking than the import. Come to think of it, it may have been the _ABImporter_ I used. 
