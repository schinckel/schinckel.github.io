--- 
wordpress_id: 1585
layout: post
title: Installing ClearSilver 10.5 on OS X
time: "20:12:35"
date: 2008-11-12 20:12:35
tags: 
- testing
- programming
wordpress_url: http://schinckel.net/2008/11/12/installing-clearsilver-105-on-os-x/
---
I struggled for couple of hours tonight trying to get [ClearSilver][1] to build under OS X, so I could investigate [Bitten][2], a continuous integration tool for [Trac][3].

Here's how I succeeded.

Download the source to [ClearSilver][4] and unpack it. Then change to that directory. You'll need to enter the following command to configure:

`$ ./configure --disable-apache --disable-java --disable-ruby --with-python=`which python` --disable-perl --disable-csharp --enable-gettext`  


Then do the `make; make install` dance (you may need to sudo the second one).

Finally, and this one took me a second go to remember, change to the python subdirectory, and use:

`$ python setup.py build`

`$ sudo python setup.py install`  


   [1]: http://www.clearsilver.net
   [2]: http://bitten.edgewall.org/
   [3]: http://trac.edgewall.org/
   [4]: http://www.clearsilver.net/downloads/

