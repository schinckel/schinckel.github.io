---
date: 2011-08-18 20:47:31
layout: post
publish: true
tags: [Dreamweaver, python]
time: '20:47:31'
title: Dreamweaver Password Decoding

---


For future reference:

{% highlight python linenos %}
def decode_dreamweaver_password(encoded):
    output = ""
    for i in range(0, len(encoded), 2):
        val = int(data[i:i+1],16) - i/2
        output += chr(val)
    return output
{% endhighlight %}
