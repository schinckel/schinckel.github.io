--- 
wordpress_id: 541
layout: post
title: Custom Address Book Fields
time: "00:53:54"
date: 2005-11-03 00:53:54
tags: 
- general
wordpress_url: http://schinckel.net/2005/11/02/custom-address-book-fields/
---
Creating custom Address Book fields wasn't quite as painless as I'd hoped. At least, not in a form that doesn't look like being broken in future updates. The simplest method is to choose a field you aren't already using. I chose _Related Names_, since I didn't know until that point that this field existed! The other fields that were available weren't really appropriate: _Maiden Name_ does not allow for duplicates, and _Dates_ is designed, for, well, dates. The next step is to set up the template. Go to **Preferences**, and choose the **Template** tab. Choose Related Names from the Add Field popup menu, and alter the label to whatever you want it to be. Now, you can go and add data of the type you require. Some caveats: the items in the Template will only appear if the record (person) you are editing does not have any items in the 'Related Names' field(s). If they do, you can add extras, but the ones you added to the Template do not appear in the list. Might file this as a bug. 
