--- 
wordpress_id: 766
layout: post
title: Blog with ecto.scpt
time: "17:01:55"
date: 2004-10-01 17:01:55
tags: 
- blogging
- applescript
- ecto
wordpress_url: http://schinckel.net/2004/10/01/blog-with-ectoscpt/
---
Yesterday I [talked about blogging][1] from my Palm Zire 21.

Here is the complete AppleScript for Blog with ecto.scpt. Copy this, paste it into **Script Editor**, and save it to _~/Library/Scripts/Folder Action Scripts/Blog with ecto.scpt_

Then right-click on the folder you want monitored - I use ~/Documents/Palm/Matthew Schinckel/NoteTaker/Blog and away you go. For best results, use with [MacNoteTaker][2]. Obviously, [ecto][3] is required.

All code is ©2004 Matthew Schinckel, but may be freely used with attribution.

Note: the formatting is removed, because ecto wasn't quite doing it right, but Script Editor will figure it out.  

{% highlight applescript linenos %}
on adding folder items to this_folder after receiving added_items
– Set this to true to automatically post the item(s)
– Leave as false so you can check the data.
set autopost to false
repeat with each_file in added_items
tell application “Finder”
set filename to (name of each_file) as text
open for access each_file
set entry_body to (read each_file)
close access each_file
end tell
try
set entry_title to filename
set date_stamp to word 3 of filename & “/” & word 2 of filename Â¬
& “/” & word 1 of filename & ” ” & word 4 of filename
set entry_date to false
set entry_date to date date_stamp
set entry_title to first paragraph of entry_body
set entry_body to text ((count characters of entry_title) + 2) Â¬
thru end of entry_body
end try
–—— You WILL need to change the next line!
set my_blog to “Life According to Matt”
tell application “ecto”
set my_doc to make new document at front with properties Â¬
{entry title:entry_title, current blog:my_blog, Â¬
body text:entry_body}
if false is not entry_date then
set entry date of my_doc to entry_date
end if
if true is autopost then
do post my_doc
end if
end tell
end repeat
end adding folder items to
{% endhighlight %}

   [1]: http://schinckel.blogspot.com/2004/10/palm-blogging-via-ecto.html
   [2]: http://mac-huwis.lut.ac.uk/~wis/programs/NoteTaker/NoteTaker.html
   [3]: http://ecto.kung-foo.tv/

