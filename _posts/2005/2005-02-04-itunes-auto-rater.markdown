--- 
wordpress_id: 70
layout: post
title: iTunes Auto-Rater
time: "17:22:53"
date: 2005-02-04 17:22:53
tags: 
- itunes
wordpress_url: http://schinckel.net/2005/02/04/itunes-auto-rater/
---
One of the [comments ][1]to my [MacOSXHints.com][2] [hint ][3]about rating iTunes songs with ratings other than the simple 0-5 stars gave me an idea for a program. Basically, it's a daemon/controller for iTunes, that sits there and monitors the currently playing track. The rationale is that if you listen to the whole track, you like the song and want to increase the rating, and if you skip it, you are getting a bit sick of it, so you want to reduce the rating. Since there is no way to determine when a track changes, you have to continually poll iTunes for the track info. What you could do is when a new song is discovered, store the track length in a variable. Then, keep track of the amount of time that that track remains playing, and if it is close to the full track length (say, 95%?) then increase the rating. If you only listened to a small part of it, then reduce the rating. You could even have it so the rating is increased/reduced by 1 for every 5% of the song either side of 50% that you listen to. Or, you could just have it so it either increases (by 10?) or reduces (by 5) at a certain threshold. Writing this program as an AppleScript Studio program should be quite simple. UPDATE: Visit [AutoRater][4] for details on the first working version. 

   [1]: http://www.macosxhints.com/comment.php?mode=display&sid=20050131061622132&title=fine+tuned%2C+dynamic+rating&type=article&order=&pid=51901 (fine+tuned%2C+dynamic+rating&type=article&order=&pid=51901)
   [2]: http://www.macosxhints.com
   [3]: http://www.macosxhints.com/article.php?story=20050131061622132
   [4]: http://schinckel.net/2005/02/06/autorater/

