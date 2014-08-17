--- 
wordpress_id: 32
layout: post
title: Grr! Bloody Apple (or, why iCal won't play nice with PHPCalendar)
time: "23:39:46"
date: 2004-06-06 23:39:46
tags: 
- general
wordpress_url: http://schinckel.net/2004/06/07/grr-bloody-apple-or-why-ical-wont-play-nice-with-phpcalendar/
---
I've been playing around with iCal recently - I't a great program. I've used it to organise everything, including replacing a custom Access Database I'd setup to create a training diary for one of the Touch teams I coach. Now, since my iMac isn't always connected to the Internet, I created an account with icalx.com so I can access my calendars from home. This site uses the fine program PHPCalendar to parse and represent html versions of your iCal .ics files. And the best thing for me was that I can use iCal's publish feature to set it up. It was also possible to use PHP calendar to publish on my iMac's intranet site, but I couldn't publish to both. So, being a little BeOS refugee, I set up some links to the files, rather than the scheduled script to copy the files across. Sym-links wouldn't work (webserver cannot access files that live outside the Sites directory), so I used hard-links. All well and good. Except iCal doesn't save files, it saves files to a new filename, and then deletes the original file and renames the new copy. So hard-links don't work. This seems to be the reason why you can 'share' an iTunes library between users on the same machine using sym-links (or even aliases) but not with hard-links. I guess it's back to scheduled copies - or maybe I can get Folder Action scripts to work... 
