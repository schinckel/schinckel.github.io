---
date: 2013-04-15 22:04:55
layout: post
publish: true
tags: [python, unittest, capture, io]
title: Capture and test sys.stdout/sys.stderr in unittest.TestCase

---

  
Testing in [Django](http://www.djangoproject.com) is usually done using the [``unittest``](http://docs.python.org/2/library/unittest.html) framework, which comes with Python. You can also test using [``doctest``](http://docs.python.org/2/library/doctest.html), with a little bit of work.

One advantage of doctest is that it's super-easy to test for an exception: you just expect the traceback (which can be trimmed using ``\n   ... \n``).

In a ``unittest.TestCase``, you can do a similar thing, but it's a little more work.

Basically, you want to temporarily replace ``sys.stdout`` (or ``sys.stderr``) with a ``StringIO`` instance, and set it back after the block you care about has finished.

Python has had a nice feature for some time called [Context Managers](http://docs.python.org/2/reference/datamodel.html#context-managers). These enable you to ensure that cleanup code will be run, regardless of what happens in the block.

The syntax for running code within a context manager is:

{% highlight python %}
with context_manager(thing) as other:
  # Code we want to run
  # Can use 'other' in here.
{% endhighlight %}

One place that you can see this syntax, in the context of testing using unittest is to check a specific exception is raised when a function that uses keyword arguments, or a statement that is not a callable is executed:

{% highlight python %}
class FooTest(TestCase):
  def test_one_way(self):
    self.assertRaises(ExceptionType, callable, arg1, arg2)

  def test_another_way(self):
    with self.assertRaises(ExceptionType):
      callable(arg1, arg2)
      # Could also be:
      #     callable(arg1, arg2=arg2)
      # Or even:
      #     foo = bar + baz
      # Which are not possible in the test_one_way call.
{% endhighlight %}

So, we could come up with a similar way of calling our code that we want to capture the ``sys.stdout`` from:

{% highlight python %}
class BarTest(TestCase):
  def test_and_capture(self):
    with capture(callable, *args, **kwargs) as output:
      self.assertEquals("Expected output", output)
{% endhighlight %}

And the context manager:

{% highlight python %}
import sys
from cStringIO import StringIO
from contextlib import contextmanager

@contextmanager
def capture(command, *args, **kwargs):
  out, sys.stdout = sys.stdout, StringIO()
  command(*args, **kwargs)
  sys.stdout.seek(0)
  yield sys.stdout.read()
  sys.stdout = out
{% endhighlight %}

It's simple enough to do the same with ``sys.stderr``.