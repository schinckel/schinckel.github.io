---
date: 2011-08-24 13:58:11
layout: post
publish: true
tags: [bbedit, applescript]
time: '13:58:11'
title: BBEdit - Strip Outer HTML tags

---


So, I monitor the BBEdit Google group, now that I'm a paid-up BBEdit user. One question
piqued my interest today, and here is my solution:

{% highlight applescript linenos %}
tell application "BBEdit"
	tell front window
		set cursorPos to characterOffset of selection
		balance tags
		set startPos to characterOffset of selection
		set endPos to startPos + (length of selection)
		select (characters (startPos - 6) thru (endPos + 6))
		set selectedText to selection as text
		if characters 1 thru 6 of selectedText as text is equal to "<span>" then
			set replaceText to characters startPos thru (endPos - 1) as text
			set selection to replaceText
			select insertion point before character (cursorPos - 6)
		else
			select insertion point before character (cursorPos)
		end if
	end tell
end tell
{% endhighlight %}

In summary, it uses the BBEdit builtin command to select the contents of the current tag,
and then extends that selection to grab the span tags that surround it. If indeed it was
as span block, then it removes those tags.

This is just a simple one-off, but it might be useful as a basis for generating a
script that has more features: like arbitrary tag types (rather than just span), or
some other thing I haven't thought of.

Note that it will only strip the outer tags. BBEdit has a Remove Markup feature, but
that does not seem to be accessible using AppleScript.