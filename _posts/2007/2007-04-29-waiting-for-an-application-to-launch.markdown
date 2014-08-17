--- 
wordpress_id: 1138
layout: post
title: Waiting for an Application to launch
time: "13:46:04"
date: 2007-04-29 13:46:04
tags: 
- applescript
wordpress_url: http://schinckel.net/2007/04/29/waiting-for-an-application-to-launch/
---
I use an AppleScript to implement "Open Terminal Here" functionality on my Macs, and just now I noticed on the Intel machine it had stopped working properly if Terminal wasn't already running. For some reason, on PPC it still sends the message through, but on x86 it doesn't. So, I had to use the following code to get it to work if Terminal wasn't already running, which can be generalised to any application: `repeat while "Terminal" is not in name of processes     delay 0.5 end repeat` The whole script, which can be saved as an application bundle, set to not show in dock, and then placed in the Toolbar: 
    
    
    
{% highlight applescript linenos %}
    -- when the toolbar script icon is clicked
    --
    on run
    	tell application "Finder"
    		activate
    		try
    			set this_folder to (the target of the front window) as alias
    			--display dialog POSIX path of this_folder
    		on error
    			set this_folder to startup disk as alias
    		end try
    		my process_item(this_folder)
    	end tell
    end run
    
    
    
    -- This handler processes folders dropped onto the toolbar script icon
    --
    on open these_items
    	repeat with i from 1 to the count of these_items
    		set this_item to item i of these_items
    		my process_item(this_item)
    	end repeat
    end open
    
    
    -- this subroutine processes does the actual work
    --
    on process_item(this_item)
    	tell application "System Events"
    		try
    			get process "Terminal"
    			
    			tell application "Terminal"
    				activate
    				do script "cd " & (quoted form of POSIX path of this_item)
    			end tell
    		on error -- Terminal Not running, launch and run in first window.
    			launch application "Terminal"
    			-- May need to wait until Terminal finishes launching
    			repeat while "Terminal" is not in name of processes
    				delay 0.5
    			end repeat
    			tell application "Terminal"
    				activate
    				-- So we don't create a new window: in window 1
    				do script "cd " & (quoted form of POSIX path of this_item) in window 1
    			end tell
    		end try
    	end tell
    end process_item
    
{% endhighlight %}
    
