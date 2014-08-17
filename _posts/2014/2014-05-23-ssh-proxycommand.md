---
date: 2014-05-23 20:06:32
layout: post
publish: true
tags: [ssh, proxy, tunnel]
title: ssh ProxyCommand

---


If you need to tunnel through a machine to get to another one, using `ssh`, you can easily do this with a `ProxyCommand` entry in your `.ssh/config`:

{% highlight apache %}
Host foo
ProxyCommand ssh <gateway-machine> -W <target-machine>:%p
{% endhighlight %}

If you have `avahi-daemon` installed on your gateway machine, you can get even better:

{% highlight apache %}
Host foo.local
ProxyCommand ssh <gateway-machine> -W %h:%p
{% endhighlight %}

I use this to get access to my office machine(s), without having to worry about firing up a VPN. I can rewrite the hostname so that I don't need to have a different entry for each machine in the office:

{% highlight apache %}
Host *.office
ProxyCommand ssh <gateway-machine> -W $(echo %h | sed s/.office/.local/):%p
{% endhighlight %}

Bingo, now I can get really simple access to any machine in the office (as long as it has avahi installed, or is a Mac).

{% highlight console %}
matt@alpaca:~ $ ssh karma.office
Last login: Fri May 23 19:52:29 2014 from 10.0.0.2
matt@karma:~ $
{% endhighlight %}