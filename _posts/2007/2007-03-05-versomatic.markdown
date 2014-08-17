--- 
wordpress_id: 1111
layout: post
title: Versomatic
time: "17:36:13"
date: 2007-03-05 17:36:13
tags: 
- general
wordpress_url: http://schinckel.net/2007/03/05/versomatic/
---
I haven't tried this software yet, but it looks great: [Versomatic][1] is automatic version control for all of your files. What it does, is set a service running that monitors changes in the filesystem. When changes are scheduled to be made, the service automatically backs up the previous version of the file. Of course, there's some flexibility bound to be built in. After all, you won't want to be backing up cache files, and so on. I suspect you'll be able to choose particular file types, particular locations, or even just particular files to control the revisions of. Of course, the less work the user has to do, other than install it, the better. Getting back a previous version appears fairly simple, too. You can either right-click on a file and choose a previous version to edit, or use the Version Manager to see all managed files. You can, apparently, set the amount of disk space that will be used (I assume that after this older files will be discarded, or some method of choosing which ones to keep). Apparently there's little extra resource usage, since it just copies the files to the revision archive, however this would also make disk usage more of an issue. Having a difference between files stored instead would save space, but use a lot more CPU time. Oh, and it's OS X and Windows. 

   [1]: http://www.acertant.com/web/versomatic/default.htm

