--- 
wordpress_id: 1354
layout: post
title: DoubleCommand and multiple keyboards
time: "21:50:35"
date: 2008-02-13 21:50:35
tags: 
- macbook-pro
wordpress_url: http://schinckel.net/2008/02/13/doublecommand-and-multiple-keyboards/
---
I love my MacBook Pro. But not _everything_ about her.

For instance, I _despise_ that there is no forward delete key on the inbuilt keyboard. But using [DoubleCommand][1] you can fix that. You can also make the _fn_ key act like control (I'm always hitting fn-C instead of Ctrl-C to kill a thread, for instance), and a whole lot of other changes.

But if you remap the small enter key to forward delete (which I highly recommend), if you plug in a USB keyboard, then the keypad's enter key will also be mapped to forward delete. Which is not cool.

The latest SVN version of DoubleCommand has the facility to fix this, but it requires a bit of terminal work to set it up.

If you haven't got a newish version (~1.6.6), first, check out the latest code:
    
    
    $ svn co https://doublecommand.svn.sourceforge.net/svnroot/doublecommand doublecommand
    

The code we want is in `trunk/kext`. Open the project inside that folder. Build the project, and then enter the following command from inside of the `build/` subdirectory:
    
    
    $ sudo cp -r Default/DoubleCommand.kext /Library/StartupItems/DoubleCommand/DoubleCommand.kext  
    
    

Enter your password when requested. Then change to the DoubleCommand installation directory:
    
    
    $ cd /Library/StartupItems/DoubleCommand  
    
    

We need to unload and then load the kext. The easiest way is using the following commands (`$` means type it in, `>` is the output):
    
    
    $ sudo ./DoubleCommand stop  
    > Unloading DoubleCommand  
    > kextunload: unload kext ./DoubleCommand.kext succeeded  
    $ sudo ./DoubleCommand  
    > Loading DoubleCommand  
    > kextload: ./DoubleCommand.kext loaded successfully  
    > dc.config: 0 -> 1593344
    

Take a note of that last number, and then perform the two commands:
    
    
    $ sudo sysctl -w dc.keyboard1=37
    $ sudo sysctl -w dc.config1=<the_number_above>
    

Now, load up the DoubleCommand preferences pane, and disable the '_Enter key acts as forward delete_', or whatever you had it acting as. Now, the two keyboards will appear differently in behaviour. And hopefully your life will be fuller.

Many thanks to the developer, Michael Baltaks, for his quick response and assistance in this matter.

   [1]: http://doublecommand.sourceforge.net/

