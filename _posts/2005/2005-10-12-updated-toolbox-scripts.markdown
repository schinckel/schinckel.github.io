--- 
wordpress_id: 486
layout: post
title: Updated Toolbox Script(s)
time: "01:17:39"
date: 2005-10-12 01:17:39
tags: 
- blogsome
- javascript
wordpress_url: http://schinckel.net/2005/10/12/updated-toolbox-scripts/
---
I've done a bit more work on the script for all of the extras I like to use on my site. Or rather, scripts, as I've split it into several smaller scripts, to make it easier for me to debug. I haven't decided whether it's faster in little scripts or one big one, just yet. Anyway, to include the mutli-script version, include the following in your head of your HTML document: 
    
{% highlight javascript linenos %}
    <script type="text/javascript" src="http://schinckel.net/images/toolbox.js"></script>
{% endhighlight %}

Anyway, the preferred usage has changed, to allow support for Safari (and possibly other KHTML browsers). 

### Functions:

  * **Gravatars:** usage hasn't changed. Insert the following into your comments.html file: `{capture name=reader}{comment_author_email}{/capture}` `<div class="gravatar">{$smarty.capture.reader|encode:"hex"}</div>`
  * **Quicktags:** those handy little editing buttons to allow easier entry of HTML codes. Since this isn't supported in Safari, you can use the old method of `<!--quicktags-->`. I still use this, as it prevents them appearing in Safari.
  * **Catchpa:** not quite ready for prime-time, as it will be coupled with an edit to the form (removing the action attribute, or setting it to " "), and since these scripts don't yet support IE, there's little use using it. If you want to see what it looks like, and how it will stop JavaScript enabled Spammers, use `<br id="catchpa" />`. The old version, using the comment tag, is still supported, but not in Safari/KHTML.
  * **Resizeable Comment Area:** puts buttons up for the reader to extend or reduce the length of the Text Area they can comment into. Not really that useful, since they get a scrollbar anyway. But nice. Use `<br id="resize" />` where you want the buttons to appear.
  * **Comment Preview:** my favourite feature. Can be inserted with `<br id="commentpreview" />` where you want the comment preview to appear. Optionally, you can put tags in for where the Preview button(`<br id="preview" />`), and the Live Preview (`<br id="livepreview" />`) checkbox are to appear.
  * **Seperate Trackbacks:** if you have the code `<br id="trackbacklist" />` (or any tag with this id) then any comments that are actually trackbacks will be moved to here. Each Comment class needs to have the following smarty tag inserted in it: `{comment_type}`. For example: 
    
{% highlight html linenos %}
    <li class="{comment_type}" id="comment-{comment_ID}">
{% endhighlight %}

If you already have a class, just put a space between the value you already have and the smarty tag. 
  * **Human readable post times:** if you place your Post times in a structure like the following, then the times will be changed to a phrase that describes the time of day: `Posted <span class="post_time"> at: 12:34pm</span>`. Note where the Posted is... all of the content inside the span tags gets eaten up.
  * **Time Since:** you can have your comment times as a certain time "after the fact", by inserting the following code at the bottom of the comment: 
    
{% highlight html linenos %}
    <a href="#comment-{comment_ID}"><span class="timesince" id="{the_time d='U'}-{comment_date d='U'}">on {comment_date} at {comment_time}.</span></a>
{% endhighlight %}

The text will all be replaced, but it's nice to have it there incase someone has JavaScript turned off. 

Righto, I think that's it about it. Still some parts seem to fail on Internet Explorer, but I'll work on that. Please report any bugs/issues to me, either via email or comments here, so I can try to fix them. That includes anything you notice untoward on this site too, I guess. ;) 
