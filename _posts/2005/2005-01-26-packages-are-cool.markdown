--- 
wordpress_id: 775
layout: post
title: Packages are Cool!
time: "18:40:17"
date: 2005-01-26 18:40:17
tags: 
- bash
wordpress_url: http://schinckel.net/2005/01/26/packages-are-cool/
---
I really like the way Apple decided to 'package' applications, plugins and the like with MacOS X. It actually makes it easy to see how stuff works. Take basic applications, and most of them are just an executable, but it's easy to add modularity, and replace GUI elements and so forth. I've grown tired of Toast: it seems to fail more than half of the time when burning DVDs, and I know the media is good, because Disk Utility has no problems burning! I intended to make an AppleScript that burned the selected disk image to a DVD/CD, but found that Disk Utility was not scriptable. But there exists a CLI command called hdiutil that can do most of the stuff Disk Utility can (at least with disk images). The command to burn an image to a Recordable Drive is: `hdiutil burn <imagename>` All I need to be able to do is get this to happen as a contextual menu. As far as I can tell, it should be possible to do this from _AppleScript_, or _python_, or _bash_. Even better, I should be able to automatically create the `<Name>.plugin/*` directory structure, and what the contents need to look like, as soon as I can find out exactly what needs to be where! 
