--- 
wordpress_id: 669
layout: post
title: Adding a Podcast to a pre-existing Subscription
time: "13:21:36"
date: 2006-02-08 13:21:36
tags: 
- itunes
- radio-and-podcasting
wordpress_url: http://schinckel.net/2006/02/08/adding-a-podcast-to-a-pre-existing-subscription/
---
Under iTunes, Podcast handling is (mostly) an inspired technology. _Podcasts _are handled slightly differently to normal audio, or _Music _files, and differently again to _AudioBooks_, and _Movies_. All of which makes perfect sense, as all of these types of files have different purposes. For most people, a Podcast is something they might listen to once, and then discard. I'm not most people. I'm a hoarder, and thus I like to keep of the Podcasts I've downloaded. And I like them to be well organised. That means all properly tagged, with reasonable titles. I may want to listen to a particular Podcast again, such as the amazing **[000 Emergency][1]** episode of _[Radio Eye ][2]_(from _[Radio National][3]_), or burn it to a CD to play for students in a class. I've also found some MP3 files that are part of a particular Podcast, but have long since been removed from the RSS feed that tell iTunes what files are available. I've downloaded these, but needed to be able to get them into iTunes, and make sure they appear in the relevant Subscription. I've discovered a way to do this, but at this stage it is a manual process, and can become quite time consuming with many files. You will need the following things to be able to perform this trick nicely: 

  * All of the music files you intend to import.
  * A copy of the XML file that is the basis of the subscription.
  * The hostname and path of the subscription.
  * An http server.
  * The ability to change hostnames, so as to cause software to look in a particular place for a server, rather than using DNS.

I've done all of this on a Mac, and the instructions below will reflect this. It is possible to do all of this on other systems, but the steps may vary, especially redirecting the requests to your own server. A note will be made of this.  The first thing to do is to ensure that your computer has a working Web Server. If your web browser will not report anything working when you try: _http://imac/_ (or whatever your computer is called), then you will need to enable the server. Under MacOS X, open System Prefences and choose the Sharing tab. Find Personal Web Sharing in the list, and turn it on. You may need to Authenticate as an administrator in order to do this. Now, you need to grab the XML file. Open iTunes, and select the Subscription you wish to add files to, and Ctrl-Click. Choose Show Description from the popup menu. Record the URL. Download a copy of this URL using, for example `wget` from the terminal. In my case, the command I used was: `$ wget -c http://www.abc.net.au/rn/podcast/feeds/mind.xml` The URL contains a fair chunk of the information we will need later, so I'll explain what everything in the above example means: 

  * `http://` - the protocol used. This will always be hypertext transfer protocol, as this is the only one that iTunes understands.
  * `www.abc.net.au` - the name of the server. We will trick iTunes (and every other application, incidentally) into looking on our computer for this server later.
  * `/rn/podcast/feeds/` - the directory structure on the remote server.
  * `mind.xml` - the name of the XML file that stores the suscription information.

We now need to set up the files in the right place. Find the root directory of your web server. For a Mac, this is likely to be `/Library/Webserver/Documents/`. Create a new directory within that one, in my case it was called `rn`. Then create a new directory inside that one, in this case `podcast`, and so on. Do not create a new directory with the name of the XML file, instead move the XML file into this last directory. Move the audio files into this directory also. Now, open up the XML file in a text editor, and examine it's contents. You will need to change the values of a heap of stuff in the `<item>` section(s), ensuring all of the information is accurate. It's fairly straightforward, but I'll summarise them anyway. 

  * `title` - The _Title _as it will appear in iTunes. You can edit the title of a Podcast after it has been downloaded.
  * `description` - This appears in the _Description _field of iTunes. There seem to be issues with extended characters of some sort. You seem to be able to have a longer description if you have it in the XML file than if you try to add it later using AppleScript.
  * `link` - the URL of the file.
  * `pubDate` - the _Released Date_. Make sure it is a valid date, and the correct one for the Podcast to ensure they appear in the right order within iTunes/iPod.
  * `enclosure` -This one has three parts that must all be checked.
    * `url` - ensure it is the same as the value in link (above).
    * `length` - this must be the exact size of the file in bytes. This can be obtained on a Mac by using the Get Info command.
    * `type` - chances are this will already be correct, but if you aren't using MP3 files, then ensure this reflects that.
  * `guid` - appears to be the title + the pubDate. I assume that this field is used to see if files are the same. I haven't experimented to see. I suspect it can really be any value, as long as it is unique within this subscription.
  * `itunes:author` - The value to go into the iTunes _Author_ field.
  * `itunes:summary` - iTunes _Comment_ value.
  * `itunes:duration` - The duration in seconds. Again, available through the Get Info window.

Of these, really only enclosure, link, guid and duration are important for now: the remainder can be changed using iTunes later. However, if you have a long description, you might not be able to get it all to appear if you use AppleScript to change it later. I learned this the hard way, and now change the description in the XML file. Now we are up to the tricky part. You need to tell your computer not to look online for a particular server anymore, but to look at your own computer. On a Mac, this is done using _NetInfo_. Open the `/` domain, and find machines. Copy the entry `localhost`, and edit the name so that it reflects the domain name of the server the Podcasts normally live on. In my case, this was `www.abc.net.au`. If you are using a different OS, you may need to edit `/etc/hosts`, or the Windows Hosts file. Save your domain. To get the computer to use the new settings reliably, you need to be 'offline' - easy for me since I'm on dialup. You will also need to Restart Netinfo Domains after going offline. It may take some time to do the lookup (which has to fail before it looks in the local domain list - which seems to be contra to how I would expect it to work), but after this it will be speedy. Then, simply start up iTunes, and update the required Subscription. It should (very quickly) download all of the podcasts that are 'new' - although you may need to manually download them depending on your settings. Finally, reload _NetInfo_, and remove (or better, rename) the server name you entered before. Don't use something like `www2.abc.net.au`, as this is still something that may be used by the company. Instead, put a 2 at the end, so it makes the domain name invalid. You may need to restart, I just connected to the internet, and the server in question worked perfectly again. You can now remove all of the files you no longer need - all of the MP3 files will have been copied to your iTunes library. You may wish to hang onto the XML file, incase you need to repeat this for future episodes. 

   [1]: http://www.abc.net.au/rn/arts/radioeye/stories/s1550129.htm
   [2]: http://www.abc.net.au/rn/arts/radioeye/default.htm
   [3]: http://www.abc.net.au/rn


