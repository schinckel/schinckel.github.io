--- 
wordpress_id: 811
layout: post
title: Changing Languages
time: "15:50:01"
date: 2006-03-23 15:50:01
tags: 
- blogsome
- smarty-templates
wordpress_url: http://schinckel.net/2006/03/23/changing-languages/
---
There isn't a way to tell Blogsome you are writing in a different language, but with things like dates, that are generated using Smarty tags, there is a way to replace the English words with those of your chosen language. Where you'd normally use a tag like: `{the_time d='l, j F Y'}`, which would generate something like: _Thursday, 23rd March 2006_, you can set up your template with: 
    
{% highlight smarty linenos %}
    {capture name=the_date}{the_time d='l, j F Y'}{/capture}
{% endhighlight %}

Then, assign this captured text to a new variable, after translating each word you know might appear in the text using `|replace:"old":"new"`, which you can repeat for each word. For example, to replace all of the day names with their Spanish equivalent, and assign the result to `$la_fecha`, I used: 
    
{% highlight smarty linenos %}
    {assign var=la_fecha value=$smarty.capture.the_date|replace:"Monday":"Lunes"|replace:"Tuesday":"Martes"|replace:"Wednesday":"Miércoles"|replace:"Thursday":"Jueves"|replace:"Friday":"Viernes"|replace:"Saturday":"Sábado"|replace:"Sunday":"Domingo"}
{% endhighlight %}

Then, wherever you want to use `{the_date}` in the Spanish format: `{$la_fecha}`. Obviously, you'll need to repeat this for month names as well, which I will leave as an exercise to the reader. 
