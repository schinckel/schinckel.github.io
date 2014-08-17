---
date: 2012-01-20 22:07:31
layout: post
publish: true
tags: [AppleScript, jQuery, JavaScript, iTunes]
time: '22:07:31'
title: Fetching iTunes Store Data

---


Or, quite possible the best AppleScript I have ever written.

So, I have a new iMac, and I was moving over a heap of 'legacy' media from another machine, and some of it was DVD rips of *Scrubs*, *Mad Men* and *Big Love*. Now, these were mostly well tagged, but often I didn't have all of the nice descriptions that were in iTunes.

Typing in all of this data is fairly annoying.

AppleScript, jQuery to the rescue:

{% highlight applescript %}
tell application "iTunes"
	repeat with theTrack in selection
		tell theTrack
			set trackNo to episode number
		end tell
		tell application "Safari"
			set theDesc to do JavaScript "$('span.index span').filter(function() { return parseInt($(this).text(),10) == " & trackNo & "; }).closest('tr').find('.description .text').text();" in document 1
			set theName to do JavaScript "$('span.index span').filter(function() { return parseInt($(this).text(),10) == " & trackNo & "; }).closest('tr').find('.name .text').text();" in document 1
		end tell
		tell theTrack
			set description to theDesc
			set name to theName
			set episode ID to (my replace(show, " ", ".")) & ".S" & my zero_pad(season number, 2) & "E" & my zero_pad(episode number, 2)
		end tell
	end repeat
end tell

on zero_pad(value, string_length)
	set tmp_string to "000000000" & (value as string)
	set padded_value to characters ((length of tmp_string) - string_length + 1) thru -1 of tmp_string as string
	return padded_value
end zero_pad

on replace(content, sub, repl)
	set delims to AppleScript's text item delimiters
	set AppleScript's text item delimiters to sub
	set content to every word of content
	set AppleScript's text item delimiters to repl
	set content to content as text
	set AppleScript's text item delimiters to delims
	return content
end replace
{% endhighlight %}

You just need to have the relevant TV Series Season page in the frontmost window in Safari, and select all of the episodes for that season in iTunes. Then, run the script, and watch the magic.