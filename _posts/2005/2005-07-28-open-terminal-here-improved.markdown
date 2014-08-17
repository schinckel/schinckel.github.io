--- 
wordpress_id: 294
layout: post
title: Open Terminal Here (Improved).
time: "18:20:57"
date: 2005-07-28 18:20:57
tags: 
- applescript
wordpress_url: http://schinckel.net/2005/07/28/open-terminal-here-improved/
---
I have been using a Toolbar Script called "Open Terminal Here" for a while now (thanks [Marc][1]), and the one thing about it that annoyed me was that when Terminal was not running, it would start the application, and then create a second window with my path in it. I've fixed this, by altering the code slightly.  Note that the only changes I have made are to the last function, process_item(). I have just inserted a check for if the program is running, and if it isn't, I call the same do script, but with in window 1. 

-- when the toolbar script icon is clicked on run     tell application "Finder"         activate         try             set this_folder to (the target of the front window) as alias         on error             set this_folder to startup disk as alias         end try         my process_item(this_folder)     end tell end run -- This handler processes folders dropped onto the toolbar script icon on open these_items     repeat with i from 1 to the count of these_items         set this_item to item i of these_items         my process_item(this_item)     end repeat end open -- this subroutine processes does the actual work on process_item(this_item)     tell application "System Events"         try             get process "Terminal"                          tell application "Terminal"                 activate                 do script "cd " & (quoted form of POSIX path of this_item)             end tell         on error -- Terminal Not running, launch and run in first window.             launch application "Terminal"             tell application "Terminal"                 activate                 do script "cd " & (quoted form of POSIX path of this_item) in window 1             end tell         end try     end tell end process_item

   [1]: http://www.entropy.ch

