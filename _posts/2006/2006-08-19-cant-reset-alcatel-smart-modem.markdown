--- 
wordpress_id: 920
layout: post
title: Can't Reset Alcatel Smart Modem
time: "10:01:37"
date: 2006-08-19 10:01:37
tags: 
- speedtouch
wordpress_url: http://schinckel.net/2006/08/19/cant-reset-alcatel-smart-modem/
---
I'm about to connect to ADSL, and bought a Smart Modem Home second hand, and rather cheap. I upgraded it to a Pro, which was amazingly simple, and then upgraded the firmware. Since my LAN uses 192.168.x.x addresses, rather than 10.0.0.x addresses, I also configured it to use one of these (actually, it gets one from my DHCP server running on the NSLU2). At some stage, it dropped off the network. I could no longer ping it on any address - basically it seemed to have chosen a random new IP address, and I couldn't find this out. So, I tried a hard reset. This is where you hold down the reset button using a pen or paperclip, and then power cycle the modem. No change. Finally, I found these instructions, on [Ozcableguy][1]: 

> Open a Command Prompt Window (Start > Run > Command) Type the following (It is case sensitive):- `ARP -s 10.0.0.138 01-90-D0-80-01-FF` Switch the Pro off and back on. In the Command Window, type the following:- `ping 10.0.0.138 -t` If all went well, you should start to see replies after 30 secs to 1 min. If not, try it again. Finally, it is imperative to clear the entry we added in the Command Window, so type the following `ARP -d 10.0.0.138`

There was also one that didn't work, with the last hex value being `01` instead of `FF`. I never saw any response to the pings, but the modem kept resetting itself when I was doing this. Eventually, after about two minutes, I tired of waiting, and switched the modem off, stopped the ping and removed the arp entry. After restarting the modem, I was able to connect to it again, and now it's back to being a nice member of my network. Or was - I may have just screwed it up again, and will need to repeat the process... These are the steps I went through the second time, and the results I got: `$ arp -s 192.168.1.138 01-90-D0-80-01-FF` This sets the IP address of the device to 192.168.1.138. From the arp help, it seems that the second value is the ethernet MAC address, but this seems to be a 'master' address, and must be typed as above. Then power cycle the modem. When it boots up, type the following into the shell: `$ ping 192.168.1.138 -t` I left it for a couple of resets, then Ctrl-C'd the ping, and cycled the power on the modem. When it came back up, it had reset to it's factory settings. Since, for a Pro modem (which mine thinks it is now) it looks for any available DHCP server, and I had the DHCP server set to allocate the address 192.168.1.138 for this MAC address, it got reallocated the correct address. All the settings are defaults again, but that's cool, as I haven't set anything up yet anyway. 

   [1]: http://www.ozcableguy.com/alcatel.html

