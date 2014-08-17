--- 
wordpress_id: 1259
layout: post
title: Problems with the MBP
time: "10:51:55"
date: 2007-09-20 10:51:55
tags: 
- macbook-pro
wordpress_url: http://schinckel.net/2007/09/20/problems-with-the-mbp/
---
Since Apple fixed the Kernel Panic bug when using encrypted WiFi on battery, I've been fairly happy with my MacBook Pro. There are just a couple of issues that have been slightly irking me.

Firstly seems to be to do with predominantly the trackpad and the close/minimize/zoom buttons on the titlebar. If you move the cursor over the close button, and in the process of clicking the button, just miss, and then move the cursor back onto the close button and click, it picks up that the click missed again, and minimises the window.

This seems to be related to another issue related to clicking. Namely, if you click on a window, sometimes it doesn't register the click (or, more precisely, doesn't bring the window to the front, or select the element, or provide any other feedback that the click has been registered). If you then click again, it passes a double-click event.

This is not that surprising, since the first click is being registered, just no feedback given. The second aspect of this is what really annoys me. Even if you move the cursor before you click again, as long as it is inside the same UI element, it sends a double-click event.

This means I spend a significant amount of time each day accidentally opening files from the Finder, and then having to wait for the application to open before closing it. Similarly, I have to navigate down to the Dock and un-minimise windows in order to close them.

The other issue is directly related to airport networking still, that the machine still refuses to automatically connect to any network that isn't the first network in the list. This is regardless of if I have Automatic or Preferred Networks in the By default, join: dropdown in the Network/Airport preference pane.

To clarify - I have three networks I regularly join. I can only have automatic joining of the first network in the list. If I reorder the list, then the network that is now at the top automatically joins. Annoying the pants off me.

Finally, if I am connected to a server, and I sleep my machine, when I wake up I have to wait an insane amount of time for the server to want to disconnect properly. This really sucks, as I have network shares at both home and work that I connect to on a daily basis. I wonder if I can just reduce the timeout that Finder waits before reporting a disconnect.
