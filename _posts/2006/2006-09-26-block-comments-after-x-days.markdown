--- 
wordpress_id: 985
layout: post
title: Block Comments after X days
time: "21:55:28"
date: 2006-09-26 21:55:28
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/09/26/block-comments-after-x-days/
---
Eugenia (who used to write for BeOS sites, back in the day) wanted to know how to stop comments from being posted on posts that are over 10 days. I'll generalize this to X days, just for completeness.  You need to get the date of the post, and the current date. I'll get the post date, and put it into a variable: `{capture name=pdate}{the_time d=“U”}{/capture} {$smarty.now}` Now, you need to subtract the two of these: `{$smarty.now - $smarty.capture.pdate}` Note that it will be somewhat incorrect, as {$smarty.now} is server time, whilst {the_time} is WordPress time. Now, this gives us a value in seconds, so we want to work out how long X days is in seconds. This, again is simple: `X days = 60*60*24 seconds` `∴`` X days = 86400 seconds` `{capture name=diff}{$smarty.now-$smarty.capture.pdate}{/capture}` Now, the actual code to display the error message is: `{if $smarty.capture.diff/86400 > 10}     I'm sorry, Comments are now closed. {/if}` But, we want this to appear instead of a comment form, so you'll need to find the line that looks a bit like: `{if 'open' == $post->comment_status}` And replace it with: `{if $smarty.capture.diff/86400 > 10}     I'm sorry, Comments are now closed. {elseif 'open' == $post->comment_status}` Naturally, replace 10 with however many days of comments you wish to allow. 

[Electrocution (Hydro Mix)][1] • [Decoder Ring][2] • [Somersault][3] ★★½

   [1]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?songTerm=Electrocution+(Hydro+Mix)&artistTerm=Decoder+Ring
   [2]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?artistTerm=Decoder+Ring
   [3]: http://phobos.apple.com/WebObjects/MZSearch.woa/wa/advancedSearchResults?albumTerm=Somersault&artistTerm=Decoder+Ring

