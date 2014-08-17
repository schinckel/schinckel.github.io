--- 
wordpress_id: 667
layout: post
title: Importing Older Podcast Episodes
time: "22:56:36"
date: 2006-02-07 22:56:36
tags: 
- itunes
- radio-and-podcasting
wordpress_url: http://schinckel.net/2006/02/07/importing-older-podcast-episodes/
---
I've found that some of the older ABC podcast episodes are still on the server, but don't appear in the XML file. How then do you get them into iTunes? If you download the file, using for example `wget`, the file is a regular MP3 file. You can import this into iTunes, and it will play, and get most of the info about the Podcast from the ID3 tags. However, it will not be a Podcast. It will be a normal audio file, or what iTunes calls _Music_. Basically, iTunes will only flag a file as a Podcast if it is downloaded through iTunes. This is crappy for a couple of reasons, the first is that iTunes tries to download 3 files at a time, and this chokes my connection, causing all of them to drop out. It then tries the next file as each one fails, resulting in only the last one in the download queue to actually finish. The second is the example above: that I have some older episodes I want to import. Red Sweater Blog to the rescue. Daniel has written a program called TypeCast, downloadable from the page [A Home For Wayward Podcasts][1], which can sort-of solve the problem. You can set the relevant data in the Podcast, such as name, and description, but not the release date. Nor will it add the file into the previously listed subscription, instead creating a new subscription each time you import it. Apparently these multiple subscriptions, if the have the same name, will only appear once on the iPod, but surely there's a better way. My plan is as follows: 

  1. Change the URL of the Podcast Subscription you want to insert a file into. Point it toward a server you have access to, like Personal Web Sharing on your machine (recommended).
  2. Move the relevant files to the right location on your computer, so they are available via the web server.
  3. Generate the required XML file, including grabbing data from the MP3 and iTunes, and allowing the user to add other info, such as the Release Date.
  4. Update the desired Podcast Subscription.
  5. Return the URL of the Subscription to it's normal value.
  6. Clean up any extra files.

Now, I'm unfortunately stuck at the first item. There doesn't seem to be an AppleScript method for getting the URL of a Subscription, let alone the ability to set it. You can change the URL of a Podcast Feed if you own the feed, using a special iTunes XML tag. However, as far as I can see, the only way is to edit my `/etc/hosts` file (and/or the OS X equivalent) and put in an entry that will override the value. Not really something I want to have to do. And I'm not sure if I can map just one directory to a location, or if I'll need to create the whole tree under my server's root directory: `http://www.abc.net.au/rn/feeds/mind.xml` At least I'll only need to do that once: all of the Radio National feeds appear to be in the same place, just different XML files. 

**Note:** there is an alternative method of achieving the first item. Rather than change the feed, you can change the setup of your computer, so that the server name referenced in the feed points to your computer's web server instead. Doing this temporarily is easy if you have a batch of files that need to be imported once only, like an archive from before iTunes was your Podcatcher. 

   [1]: http://www.red-sweater.com/blog/62/a-home-for-wayward-podcasts

