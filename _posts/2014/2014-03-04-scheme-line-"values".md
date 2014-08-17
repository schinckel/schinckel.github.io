---
date: 2014-03-04 23:32:21
layout: post
publish: true
tags: [scheme, ruby, textmate, bash]
title: Scheme line "values"

---

  
Years ago, when I first saw TextMate demonstrated, one of the ways it was used as a teaching tool, when teaching Ruby, was to have the current line executed, and the value it returned appended to the current line:

{% highlight ruby %}
(2 + 3) * 4 / 5 # => 4
{% endhighlight %}

That is, pressing `Cmd-Shift-Ctrl-E` would execute the line, and update the marker.

Today, while playing around with Scheme, I came up with a neat way to do the same type of thing.

Initially, I made it so that it executed the current line, and added/updated the marker. Then, I realised I could load the file, and then execute the current line.

You can create a new bundle command, and bind it to whatever key you want, with a scope selector of `source.scheme`, Input of Line, Output of Replace Input.

{% highlight bash %}
#!/usr/bin/env bash

[[ -f "${TM_SUPPORT_PATH}/lib/bash_init.sh" ]] && . "${TM_SUPPORT_PATH}/lib/bash_init.sh"

# Evaluate the current line in our Scheme interpreter
#
# The interpreter you use should be set in the environment
# variable TM_SCHEME

# The whole file will be loaded, and the current line's value executed,
# and added to the line as a comment.

INTERPRET=${TM_SCHEME}
CMD=$(basename "$INTERPRET")

LINE=`cat /dev/stdin | sed 's/; =>.*//'`
VALUE=`echo $LINE | $INTERPRET --load $TM_FILEPATH | grep ';Value: ' | sed 's/;Value: //'`

echo -n $LINE "; =>" $VALUE

{% endhighlight %}

Unfortunately, trailing comments are handled as a seperate line, so getting the ruby-like behaviour of updating all of the `; => ` comments will have to wait for another day.