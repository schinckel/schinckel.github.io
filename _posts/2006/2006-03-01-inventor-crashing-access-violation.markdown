--- 
wordpress_id: 709
layout: post
title: "Inventor Crashing: Access Violation"
time: "14:51:34"
date: 2006-03-01 14:51:34
tags: 
- inventor
- rants-and-raves
wordpress_url: http://schinckel.net/2006/03/01/inventor-crashing-access-violation/
---
In one of the PC pools at work, I am getting some pretty serious Autodesk Inventor crashes. Basically, the error is occurring randomly, every couple of minutes or so. The temporary file that the crash reporting program wants to send to AutoDesk indicates that it is a read error in the same memory location each time: 
    
{% highlight xml linenos %}
    <Exceptions>
        <Exception code="C0000005" text="ACCESS_VIOLATION" address="0x77E7CA0B">
            <AccessViolation type="Read" address="0DB33888"/>
        </Exception>
    </Exceptions>
{% endhighlight %}

It's annoying the hell out of me - as it's only happening in one pool, not the other. I don't think it's a licensing issue, as it seemed to happen a few times when I was the only user on the system, not just when there were twenty other users upstairs in another pool. Things I'm going to try: 

  * Getting the software reinstalled. Each machine was ghosted from an image, so I'll try a fresh installation.
  * Running without others using the other pool.

Dunno what else to do at this stage. **Update:** an even more impressive crash, this time with an extra dialog box: ![][1]

   [1]: /images/InventorCrash.png

