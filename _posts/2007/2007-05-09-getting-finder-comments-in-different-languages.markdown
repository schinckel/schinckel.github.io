--- 
wordpress_id: 1143
layout: post
title: Getting Finder Comments in different languages
time: "10:17:39"
date: 2007-05-09 10:17:39
tags: 
- python
- applescript
- bash
wordpress_url: http://schinckel.net/2007/05/09/getting-finder-comments-in-different-languages/
---
bash: `mdls filename | grep FinderComment` AppleScript: `tell application "Finder"     comment of file end tell` python: `#!/usr/bin/pythonw from appscript import * path = '/Users/NAME/your/path/here' comment = app('Finder').items[path.replace('/', ':')].comment.get()`
