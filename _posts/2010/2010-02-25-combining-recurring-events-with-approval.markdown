--- 
wordpress_id: 1672
layout: post
title: Combining recurring events with approval
time: "18:39:33"
date: 2010-02-25 18:39:33
tags: 
- programming
wordpress_url: http://schinckel.net/2010/02/25/combining-recurring-events-with-approval/
---
A while ago, I talked about the issues with taking a set of potentially recurring events and merging them into the least number of events that fully describe all of the occurrences. This was a bit of a challenge, but with a TDD process, I was able to get something that, as far as my testing tells me works. Thus, deleting one middle occurrence of a recurring event results in two events being left, and re-creating that occurrence results in the one event being created.

This goes even further, with occurrences that touch or overlap being merged into potentially a new event. This is a requirement of our problem domain, since these events are used to see if a person is available to perform a task, and two adjacent occurrences would otherwise make it hard to determine if the person is indeed available.

So, it turns out that this is only part of the problem. In addition, changes to availability may require approval by a manager. So, in addition to being able to merge objects, we also need to be able to merge pending objects with one another, and mark pending objects as superseding other objects. And, even more fun, if a pending object is created that matches a pending-deletion object, for instance, then that object is restored: the two pending events cancel one another out. Finally, a pending object can also be 'psuedo-merged' with an availability, where it then is the union of the two events, and supersedes the approved event!

This problem is even stickier than the previous part. Having said that, I have it working, although at this stage it is not possible to have recurring pending events. Things were made even more difficult by the way that I handle superseding events. This cannot be just references in the database, as events and occurrences may be deleted and created by saving another event, so a different method of keeping track of which events are superseded is required.  


The good news is, this is coming along well. It did occur to me on the way home today that without 'never ending' events, this would possibly collapse the problem space down. Occurrences would no longer need to be recreated quite as often, and indeed they may be the sole storage representation: abstract events could then be created on the fly, purely for descriptive purposes. All I need is some way to represent events that don't have an end date…

…or I could make it that never-ending events must end in 2050. Then, any event that ends that year will be represented to the user as never-ending. This seems like a slippery Y2K-style slope, but if I keep moving the goal-posts, then it might work. And simplify my code immensely. It turns out there are only ~2100 weeks until then, and my events at this stage only occur weekly (it makes the simplification simpler to only have to look for weekly patterns, and that is how people usually determine their schedule).

I'm glad we had this little chat.
