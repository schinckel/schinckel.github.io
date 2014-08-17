--- 
wordpress_id: 1148
layout: post
title: AJAX website
time: "21:00:56"
date: 2007-05-29 21:00:56
tags: 
- javascript
- web-design
wordpress_url: http://schinckel.net/2007/05/29/ajax-website/
---
I've just finished developing a fully-AJAX website. It's somewhat static in the sense there is little interaction, but I've used XMLHttpRequest instead of links for the pages. You can see it at [http://jaquiehagan.com][1]. Basically, the home page is the only one that needs to be loaded. If you click on any of the dropdown menus (done with CSS, rather than JS, to make it more compatible; this includes using csshover.htc for IE, since they aren't simple A tags), it loads the side menu from the server. Choosing an item from this side menu loads the final menu, and the image(s) that need to be displayed. This final menu swaps out the different images in the main image pane. Why do this using JS? It might make a difference to the bandwidth used, although I probably overcompensate for this in that I preload images rather than wait on the user to click on them. More importantly, and if you turn off JavaScript and load the page, you will see the effect I had to remove. This site uses hidden-frame forwarding to allow a nice URL to remain in the address bar, even though it is hosted on a different server. By doing this, on a refresh the frame turns grey before loading, which causes a flash of grey, which is unnerving. I guess more than this it was a proof of concept that I could build a site that uses JavaScript for navigation, making it more like a multimedia site than a plain website. It does break one usability guide, which I am still working on. If you click on the back button in your browser, it will take you out of the site. Finally, it degrades nicely if a user doesn't have JavaScript turned on. The required pages are all there (and generated from the list of images and menus), and are used by older browsers. 

[The Awakening \[Mellow Mix\]][2] • [York][3] • [The Chillout Session][4]

   [1]: http://jaquiehagan.com
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=The+Awakening+[Mellow+Mix]&artistTerm=York
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=York
   [4]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=The+Chillout+Session&artistTerm=

