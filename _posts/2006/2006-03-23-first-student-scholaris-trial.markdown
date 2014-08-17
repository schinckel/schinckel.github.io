--- 
wordpress_id: 810
layout: post
title: First Student Scholaris Trial
time: "16:06:50"
date: 2006-03-23 16:06:50
tags: 
- scholaris
wordpress_url: http://schinckel.net/2006/03/23/first-student-scholaris-trial/
---
I've just finished my first trial of Scholaris with real students. I have a year 9 Electronics class, who attempted to complete a single activity on Diodes I had created for use in Scholaris. The kids really enjoyed it, but there were a few technical issues we came across. The first was the general slowness: I think this was because everything needed to be downloaded for each kid, rather than having some caching in place. Once each kid got onto the right stuff, it seemed to be faster the second time around. This would result in a fairly serious amount of data transfer, as a caching proxy is likely to determine that https: data is different for each user - and it probably actually is, considering that it is encrypted! This resulted in each student using up about 6Mb of their download allowance for one double lesson. And many of them ran out of internet data during that lesson, so only two were able to submit the work for marking.  And that's when the real problem started. Because I hadn't assigned a FrameworkID, since previously there had been no inclusion of Design & Technology SACSA Framework data, the work that was submitted didn't come through properly, and I wasn't able to assess and then return the data to even these two students. I did spend the last 15 minutes having a group debrief, which was really valuable. Basically, the class came up with the following 

> Problems encountered:
> 
>   * Too slow in loading up.
>   * Some issues with not loading for some students
>   * Lots of Internet usage – which students had to pay for.
>   * Work lost when ran out of internet.
>   * Want more fonts to choose from.
>   * Spell check
>   * Feedback as to when page is finished loading
> 
> Advantages of this system:
> 
>   * Don’t lose your homework
>   * Don’t have to carry books everywhere
>   * Typing easier than writing (and neater)
>   * Don’t forget to bring homework to school.
>   * Easier for teachers to check/mark
>   * Helps with knowing when work is due.
> 
> Disadvantages of the system:
> 
>   * Some people might not have internet access at home
>   * Disadvantages people without broadband
>   * Sometimes internet breaks
>   * Power loss is damaging
>   * Internet costs money
> 
> Ideas for improvement:
> 
>   * Reminders of when work is due
>   * Automatic saving of work while working

I'll repeat what I think I said last time I'd spent any time doing Scholaris work: they should be using AJAX, like Gmail does, rather than relying on page refreshes when sending data to the server. Gmail does this, and then it allows for autosaves, which can be life-savers. The same with the content creation process. It's too cumbersome, with different dialog boxes and windows opening up, and then waiting for these to load. I'd almost rather the flexibility of coding in raw HTML, rather than their user-friendly format. At least some sort of an offline content creator. Export from Word? Actually, I'll take that last one back. I just tried Word's _Web Page Preview _option, and the code it generated was cluttered. I didn't have any changes of fonts, or any styling other than just plain bulleted lists, and yet it managed to create style and class tags on each element. At least this is better than the font tags I remember seeing on other web page export/previews. 
