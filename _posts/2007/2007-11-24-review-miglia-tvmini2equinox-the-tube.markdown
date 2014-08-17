--- 
wordpress_id: 1301
layout: post
title: "Review: miglia TVmini<sup>2</sup>/equinox The Tube"
time: "10:41:02"
date: 2007-11-24 10:41:02
tags: 
- tv
- hardware
wordpress_url: http://schinckel.net/2007/11/24/review-miglia-tvmini2equinox-the-tube/
---
I lashed out yesterday, and bought something that I've been wanting for a while.

A USB TV Tuner stick.

I went for the miglia TVmini2, as it was (I thought) fairly inexpensive. I'm not sure I made the right decision right now.

For starters, it doesn't actually come with the software. Sure, it's got a CD with some demo software of other stuff, but the actual software (which is actually written by another company, called equinox), The Tube, needs to be downloaded from the internet before installation.

Which wouldn't be too bad, but it's a 104Mb download. Which meant I couldn't (a) start playing with it as soon as I bought it, since I was in town, and not near a free wireless point, and (b) start playing with it as soon as I got home, since it took about 30 minutes to grab.

It gets worse, though. Even though the software really requires a dongle (the USB tuner is really just a dongle, after all), the manufacturers insist that you register the software, using the included key string. And it only works on one machine without de-registration, apparently. Which kind of sucks, because I'd like to have it moved between more than one machine.

The hardware itself seems okay. I haven't been able to make it work with any other software yet. I've tried a couple of downloads, but they wouldn't recognise it.

System Profiler reports the device as looking like:

**TVMini2:**

  


Version: 1.00

Bus Power (mA): 500

Speed: Up to 480 Mb/sec

Manufacturer: Miglia

Product ID: 0x0069

Serial Number: 0000000001

Vendor ID: 0x18f3

The software, on the other hand, seems to have some good features, but quite a few flaws.

The manufacturers have decided to make the application scriptable. This is a very good thing, as it will allow me to, for instance, set up Salling Clicker to be able to control it. Which will be very good. I'd also be able to make a rudimentary controller for network or local remote control. Which I may do: more on that later.

Another good feature is the simplicity of the software. The basic window is shown below.

![][1]

You basically have a video section, with a controller on the right. This appears to be fixed. Although you can hide the main video area, they resize together. Which is a bad thing, if you like to resize the video to a small size while you write a review of something, for instance. Like I'd like to do now. It means that the controller becomes fairly unusable fairly quickly:

![][2]

This is as small as the remote area gets. Any further resizing just shrinks the video display in that window. You can hide the Details area (this is shown above), but you can't hide the record area.

You can hide the remote, too. This makes shrinking the video a bit more usable:

![][3]  


I anticipate being able to build another controller that floats, and can be used in conjunction with the view shown above. More below on some issues that might appear with this, when I discuss the AppleScript interface in a bit of detail.

The controller itself is mostly okay. The main/default view has a list of channels. This is customisable. You can scan for channels, and then delete the ones you don't watch, and rename the ones you do. Scanning takes a long time, and is probably worth re-doing every now and then, just in case a new station has been added.

![][4]

The bottom area of the controller is the recording pane. You can pause live TV, record the current stream, and if you have been watching a channel for a little while, skip back through the already viewed stuff. I did a quick test where I watched for a while, then went back to try to record a section from the past. The program developed a spinning beach ball, and I had to Force Quit. I'll continue to test it again later, as this is a nice feature.

There's also a button link to their other software, MediaCentral, which totes itself as a total replacement for FrontRow. And, I've had a bit of a look at it. It looks pretty good, actually. May be worth investing in, and using this on the Mac Mini when I finally get it, and set it up as my Media Centre. (Typing Central reminds me to just let all of the yanks out there know the correct way to spell centre. Yank is a slang term Australians use to refer to Americans).

If you record live TV, it stores it in the recordings pane.

![][5]  


You can then export from here, in order to be able to view on another device, or in another program. It exports raw DV fairly quickly (almost real time, I think, perhaps even faster), but as expected exporting to m4v takes a bit longer. It appears that these are the only formats it will export: iPod, iPhone and AppleTV are all m4v, and iMovie is DV. I'm still going to record some stuff and see what the quality is like. Gotta wait for some decent content first.

Which brings me nicely to the next topic. Electronic Program Guide and Scheduled Recording. The interface is, again, fairly simple. All programs appear in the one list, there doesn't appear to be a method of filtering so sort by channels. You can search or filter by title and description. To schedule a recording, simply click the black dot next to the program time.

![][6]

Clicking on a title will show the details about that program. This is obtained from the digital TV data stream, although it is possible to add in an external TV guide, using the open XMLTV standard. Unfortunately, there doesn't seem to be a way to subscribe to an XML feed. EPG via RSS, that would be awesome.

If you click on the "Show Recordings" button, it will filter to only display the programs you have scheduled to record. You can then de-select them by re-clicking the red dot. Fairly easy to understand. It also seems to have some smarts about overlapping programs, and will display a different coloured dot when they clash.

![][7]

Okay, feature list is pretty much done. What doesn't it do, or what does it do badly?

AppleScript support.

You can do quite a few things with AppleScript, such as pause, play, start recording and so on. It appears that you cannot get decent data from the EPG, for instance. So I can't build a fully replacement EPG in another application, unless I access the data directly from the file. This file is stored as an SQLite database. So I should be able to grep data out of this using the relevant tools. This seems to be an oversight, since you can schedule recordings, and access the EPG data, but I can't figure out how to get meaningful data from the EPG. This would be a necessity for a proper Salling Clicker interface, that allowed me to just run the program in full-screen mode and only use the phone for the remote, doing all of the programming with that instead.

You can also export from AppleScript. Not sure if you can choose to export DV, which I would probably want to do. So I can post-process the data and remove advertisements, for instance. But I cannot find a way to choose a channel by channel name. Which would be useful for a remote program, either on phone or computer.

Possibly the biggest annoyance: in every instance I have seen, this application is called The Tube. But to access it in AppleScript, you need to use TheTube. Why do this? You can have spaces in application names in AppleScript and it works fine.

Data file formats.

The channel data is stored as an XML/plist file. Which is a good thing. You can hand-tweak this file, which is much faster than, and less error-prone than deleting them inside the software. Especially since right-clicking to delete doesn't actually select the channel, so the previously selected channel gets deleted instead.

Scheduled programs are also plist files. You could create these files with another piece of software, and just rely on The Tube to record them. I haven't tried creating a file and seeing if it automatically records, or whether you need to start/re-start The Tube to get it to notice. Still on the TODO list.

The video data is stored in a package. There are a couple of TIFFs, for preview purposes, but these aren't always the correct aspect ration. In fact, since most of my Digital TV seems to be broadcast in 16:9, with black bars on the sides, this is always the wrong aspect ratio as these TIFFs are all 4:3.

![][8]

Bonus points if you can name the song and artist this preview is from!

Inside the package is a plist file with data about the recording. But the actual data is stored in two files, Media.tvi and Media.tvm. I'm still trying to find out what file format these are - VLC doesn't seem to recognise them, although I suspect they are a standard file format, just hidden. I'd like to be able to get this data without necessarily having to use The Tube. According to one website, this data is just the raw MPEG stream. Changing the file extension to .mpg or .mpeg doesn't allow for playback Might need more research.

   [1]: /images/2007/11/200711241026.jpg
   [2]: /images/2007/11/200711241031.jpg
   [3]: /images/2007/11/200711241033.jpg
   [4]: /images/2007/11/200711241027.jpg
   [5]: /images/2007/11/200711241029.jpg
   [6]: /images/2007/11/200711241028.jpg
   [7]: /images/2007/11/2007112410281.jpg
   [8]: /images/2007/11/thumbnailpreview.jpg

