--- 
wordpress_id: 1612
layout: post
title: NSSegmentedControl selecting NSTabView
time: "15:30:13"
date: 2008-11-28 15:30:13
tags: 
- macos-x
- programming
- cocoa
wordpress_url: http://schinckel.net/2008/11/28/nssegmentedcontrol-selecting-nstabview/
---
I discovered, quite by accident the other day, that it is possible to use an NSSegmentedControl to control which Tab of an NSTabView is displayed. Here is how to do it.

First of all, it is much easier to change the selected tab if you leave the tabs on to begin with. So, I would suggest building all of the NSTabView's tabs first. I've done five, each with a different control.

![View1.png][1] ![View2.png][2]

Now, you can alter the NSTabView so it doesn't show the Tabs:

![View1Tabless.png][3] ![TabViewInspector.png][4]

You can now add the NSSegmentedControl, and style it as you wish. I really like the Small Square styling.

![SmallSquareNSTabView.png][5]

Now to hook up the connection. There is an outlet on NSTabView called takeSelectedTabViewFromSender:, which can be hooked up to an NSSegmentedControl.

![Connection.png][6]

You will need to ensure that your initially selected cell and view are the same index, which prohibits having it save the value between runs (or you might be able to, if you know more than me).

   [1]: /images/2008/11/view1.png
   [2]: /images/2008/11/view2.png
   [3]: /images/2008/11/view1tabless.png
   [4]: /images/2008/11/tabviewinspector.png
   [5]: /images/2008/11/smallsquarenstabview.png
   [6]: /images/2008/11/connection.png

