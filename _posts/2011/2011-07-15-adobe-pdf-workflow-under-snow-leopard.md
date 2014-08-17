---
date: 2011-07-15 22:41:31
time: "22:41:31"
layout: post
publish: true
tags: [adobe, freehand, pdf, snow-leopard]
title: Adobe PDF Workflow under Snow Leopard

---


My partner is a mad keen Macromedia Freehand user. This is one of the reasons she
has been able (and prepared) to stick with her trusty old G4 iMac until now.
It is also the reason our brand new iMac won't be running Lion anytime soon.

So, when we got the new iMac, I had to setup Freehand so it worked. The next thing
was to bring across all of her thousands of fonts. Tip: if fonts look jaggy, force
the font cache to rebuild and restart.

Finally, we got to the stage where she was trying to create some PDFs. And since
Adobe is not always the best OS citizen, we found the old way she used to create
them no longer worked under Snow Leopard. Using the system PDF generator resulted
in far inferior PDF quality: jaggy fonts, lines within curves.

Now, I get the feeling that the system isn't at fault here, as it is very capable
of creating PDF files of correct quality. Indeed, I was able to get high quality
PDFs generated from other programs (and as we'll see in a minute, even from files
generated from Freehand). So, it seems that Freehand 'knows' this is a 'preview'
version, and cuts the quality of data it sends.

Eventually, after much work, I found that creating a PostScript file worked okay,
but the page size was incorrect. At this stage I had installed the printer
driver for our old Epson Stylus PHOTO EX, which resulted in the print dialog box
no longer showing all of the Freehand MX settings.

The final solution was to create an IPP printer, to localhost, that is called Adobe
PDF. This is set to use the generic PostScript driver. All of a sudden, we are able
to access the Freehand MX advanced settings in the print dialog, and create
PostScript files that are the right size, and of suitable quality. She then either
uses Preview or Acrobat Distiller to turn these into PDFs.

