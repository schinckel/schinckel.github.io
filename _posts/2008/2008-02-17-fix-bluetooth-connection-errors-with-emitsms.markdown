--- 
wordpress_id: 1362
layout: post
title: Fix Bluetooth connection errors with emitSMS
time: "19:54:14"
date: 2008-02-17 19:54:14
tags: 
- phone
wordpress_url: http://schinckel.net/2008/02/17/fix-bluetooth-connection-errors-with-emitsms/
---
I use the excellent and free [emitSMS][1] for all of my SMS sending-from-my-Mac needs, and it works a treat. However, for some reason in the last couple of days it has stopped connecting properly to my phone, a Nokia E65.

I've had lots of hassles with this phone, and thought this might be just another one. But I've restarted both the phone and the Mac, and no joy.

If you look at the back of the emitSMS widget, you'll be able to choose the serial port to connect to. If you try changing the port to one of the standard ones, it should give an almost immediate error. If you change it back to your phone's serial port, and it hangs forever, there is a solution.

![Picture 2.png][2]

As can be seen from the image above, I've just created a second Dial-UpNetworking bluetooth port, and used that instead.

  
![BluetoothSystemPrefs.png][3]

Open up System Preferences, and visit the Bluetooth panel. Select your phone, and select Edit Serial Ports… from the utility menu.

![BTSP_menu.png][4]  


Add a new serial port using the plus button, and duplicate all of the settings.

  
![EditSerialPorts.png][5]

Click Apply, and then change the serial port back in emitSMS. It should connect and identify your phone.

   [1]: http://algoritmer.dk/widget/
   [2]: /images/2008/02/picture-2.jpg
   [3]: /images/2008/02/bluetoothsystemprefs.jpg
   [4]: /images/2008/02/btsp-menu.jpg
   [5]: /images/2008/02/editserialports.jpg

