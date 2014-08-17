--- 
wordpress_id: 713
layout: post
title: Extending Crocodile Technology
time: "10:40:11"
date: 2006-03-02 10:40:11
tags: 
- languages
wordpress_url: http://schinckel.net/2006/03/02/extending-crocodile-technology/
---
I use, and really like, Crocodile Technology, an electronics and motion modelling system, which interfaces well with a really nice PCB layout program. However, it isn't especially extensible, or so they would have you think. But, the component information is all stored in XML files, so in theory, it should be possible to create new parts, either in a new XML file or by editing one of the old ones, that can extend the functionality of the program. For instance, I want to be able to create a part that is the UM66T, a great little 3-pin (TO-92 package) melody generator. We buy it in four varieties, each of which is a different single-voice tune, such as _Small World_, _Fur Elise_ and so on. At the moment, I need to model the circuit with the kids, and then add the pin layout of a TO92 component in RealPCB, which is somewhat error prone. It would be much nicer to be able to model it all in Crocodile Technology, including having the music play. This is what the XML code for a part, in this case a Red LED, looks like: 
    
{% highlight xml linenos %}
    <part class="electronics/red-led" proto="electronics/discrete-led">
      <p key="vf">1.567</p> 
      <!--  1.9V @ 10mA  --> 
      <p key="img" type="resource" flags="user-hidden">electronics/ledred</p> 
      <p key="meta-parttree-order" type="int" flags="user-hidden">30</p> 
      <p key="meta-label" type="string" flags="user-hidden">Red LED</p> 
      <p key="meta-icon" type="resource" flags="user-hidden">electronics/icons/red_led</p> 
    </part>
{% endhighlight %}
