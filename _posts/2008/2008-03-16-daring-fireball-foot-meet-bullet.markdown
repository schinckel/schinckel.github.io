--- 
wordpress_id: 1377
layout: post
title: "Daring Fireball: Foot, Meet Bullet"
time: "08:03:51"
date: 2008-03-16 08:03:51
tags: 
- nokia-e65
wordpress_url: http://schinckel.net/2008/03/16/daring-fireball-foot-meet-bullet/
---
I've not commented on iPhone related stuff before: mainly because I don't have an iPhone, and won't be getting one any time soon. It's not that I don't want one, but they aren't coming out in Australia, and my new phone has still got a long way to go before it is out of contract.

The latest post, however, piqued my interest. Because it doesn't just apply to iPhone, or any handheld device, but any computing device in general:

> How are they even going to know which apps do continue to run in the background? They won’t. A likely reaction would simply be to regret ever having junked up their iPhone with any third-party apps at all.
> 
> From [Daring Fireball: Foot, Meet Bullet][1]

I have a Nokia E65, and one of the "great" features is true multi-tasking. I say "great", because this feature burned me not too long ago.

I use Salling Clicker - mainly as an automated syncing system, but also for interaction between the phone and Mac in other ways - from a Growl message when I receive a phone call, and my iTunes pausing, to sending SMS via bluetooth. Typing is much faster on a normal keyboard! (Granted, this is using emitSMS, not Salling Clicker, but, meh).

Recently, I installed a bit of software that allowed me to download call and SMS lists, so I could access them and interpret my data usage patterns. It installed a background helper agent, which I didn't even realise. Some time later I noticed I wasn't receiving as many phone calls as before. It wasn't a big difference since I mainly use the phone for calling, rather than receiving calls, but nonetheless it was a difference. When out at dinner with family, it came to a head. It turned out that every time someone tried to call me, the call was rejected, but not to voicemail. A second call immediately worked.

When a call came in, the phone displayed a (very short) out of memory error, and then this immediately disappeared. The light came on, which made me realise just how often it had occurred. I had seen the phone light turn on sometimes while my phone was next to me, but because the message was so short-lived, it had vanished by the time I looked at the screen. I'm talking less than a second here.

It turned out the faceless background app was using up all of the phone's memory. Receiving a call initially failed, but if another call came immediately after, then it would work. I guess some memory was being freed, but being used again a short time later.

Long story short - I didn't use the software I had installed, so junking it (and removing the installed helper, which wasn't real easy) fixed the problem. But because the problem was intermittent, it was pretty hard to nail down.

I don't even remember what the software was called. But I'm much more cautious about what I install onto my phone now.

   [1]: http://daringfireball.net/2008/03/foot_meet_bullet

