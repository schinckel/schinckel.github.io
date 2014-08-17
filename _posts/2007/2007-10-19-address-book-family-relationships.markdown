--- 
wordpress_id: 1269
layout: post
title: "Address Book: Family Relationships"
time: "08:11:54"
date: 2007-10-19 08:11:54
tags: 
- applescript
wordpress_url: http://schinckel.net/2007/10/19/address-book-family-relationships/
---
I have a fairly large address book.488 contacts, who are shared between my various hobbies and pastimes. Including a large number of people who are related to one another. In some of these cases, I have populated the Related Names field, often where I just need to know a child's parents names, but also in other cases where the related person is also in my address book.

I have several groups of people who are siblings, and I could go through each sibling and add in 'father, mother, sister, brother' items for each sibling, but it would be great if this could be done automatically.

The father/mother bit should be relatively straightforward, since the fields are the same:

Bob and Alice have two children, Carol and David. If I have put father:Bob and mother:Alice in for Carol, and I put brother:David in, then the system should be able to easily put father:Bob and mother:Alice in for David.

The tricky bit is with gender related to siblings. There is no default field for gender in Address Book, so how does the system know if David should have sister:Carol or brother:Carol? Especially since I don't want to have to hand-code a list of names and which gender they are. I have many people with unusual names, and some with non-gender-specific names.

A short-term solution might be to (a) see if there are other sibling relationships (ie, if there is also brother:Eric, and Eric has sister:Carol, then clearly Carol is a female, and David should also have sister:Carol); or (b) have a temporary sibling:Carol field, which can be changed by the user.

You could then have a Smart Address Book Group which has all people with a sibling: field, which would make finding those people easier.

Conceivably, this should be possible with AppleScript. I have, however, butted heads with Address Book's scripting in the past. It doesn't always seem to be that easy to get data from this application.

Perhaps this type of feature, as well as my other hope for Address Book (notice if two contacts have the same number, including just the last X digits (for +614 vs 04 numbers in Australia, which are the same), and allow manipulation of this data, might appear in Leopard.
