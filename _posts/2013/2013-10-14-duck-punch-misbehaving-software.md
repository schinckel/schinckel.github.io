---
date: 2013-10-14 16:55:58
layout: post
publish: true
tags: [python, duck-punching, monkey-patching, SOAP]
title: Duck-punch misbehaving software

---

  
Recently, I found myself having to interact with an API that uses SOAP. I've been using the SOAPpy package. Which has made it possible, but not exactly easy. But that's not what I am going to write about right now.

In order to make the linking of data between my software and that system easier, I needed to get a dump of the other system's data, in a CSV that I could send to the client.

So, since the SOAPpy module gives you something that looks dict-y, I thought I'd just be able to pass it to ``csv.DictWriter``'s ``writerow()`` method.

Not quite.

See, whilst it supports the python dict-like `[key]` syntax, the ``SOAPpy.Types.structType`` doesn't support the `.get()` method, that ``DictWriter`` uses to extract the data (indeed, it needs to, to be able to trap missing keys).

So, here is a simple duck-punch (does it quack like a duck? No? Punch it harder so, it quacks!) that enables you to pass a ``structType`` object to a ``DictWriter.writerow()`` method call:

{% highlight python %}
from SOAPpy.Types import structType
structType.get = lambda x,y,z=None : x[y]
{% endhighlight %}

In this case, I was able to use this simple case, as I knew the keys it would be asked for would all exist, but you could make a slightly more complex one that checked to see the key exists, and if not, return `z`. You need all three arguments in the lambda though, since DictWriter passes them in.