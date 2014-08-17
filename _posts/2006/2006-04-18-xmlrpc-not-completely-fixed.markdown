--- 
wordpress_id: 869
layout: post
title: XMLRPC not completely fixed.
time: "11:14:50"
date: 2006-04-18 11:14:50
tags: 
- blogsome
wordpress_url: http://schinckel.net/2006/04/18/xmlrpc-not-completely-fixed/
---
There are still a couple of issues with the XMLRPC interface. 

  * [ecto][1] seems to work nearly fine. It publishes posts without escaping, and allows for the setting of categories. This is with MetaWeblog API as the account type.
  * [Performancing][2] publishes wrong unless using MetaWeblog API, but even when doing this, categories are not set.
  * Flock appears to be the same as Performancing, when set to Wordpress, or MetaWeblog API.
  * [Qumana][3] is the same - it autodetects it's a Wordpress blog.
  * [MarsEdit][4] - works, but presents an error message.

Thanks to kreaper, who's been a big help in the testing. Anyone with any other results can leave a comment. 

   [1]: http://ecto.kung-foo.tv/
   [2]: http://performancing.com
   [3]: http://www.qumana.com/download.htm
   [4]: http://ranchero.com/marsedit/

