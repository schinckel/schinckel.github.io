--- 
wordpress_id: 1671
layout: post
title: Combining recurring events
time: "15:50:16"
date: 2010-02-09 15:50:16
tags: 
- programming
wordpress_url: http://schinckel.net/2010/02/09/combining-recurring-events/
---
On a project I am working on for work at the moment, we have a need to handle recurring events. These events need to be merged if they are the same and can be simplified in any way. As it turns out, this is quite a tricky problem.

There are really only two ways that events can be merged. If two events have the same frequency, and occur on the same day, or on consecutive days according to the period, and they have the same start and finish times, then they can be merged into one.

Similarly, if two events have the same period, occur on all of the same days, and overlap or touch in times, they can be merged into a single event.

From there, it starts to get complicated. Two events that partially overlap may be able to merge parts of themselves, possibly resulting in an extra event being created.

For instance, an event every Tuesday at 9am-12noon, that lasts for 10 weeks, and another event every Tuesday 11am-2pm that starts 5 weeks later, and also runs for 10 weeks, will result in 3 events: one that lasts 5 weeks 9-12, one that lasts 5 more weeks 9-2, and one that lasts a further 5 weeks 11-2.

This on its own is easy to deal with, but as soon as you consider events that have no end date, things get tricky quickly.
