---
date: 2014-04-27 12:42:06
layout: post
publish: true
tags: [python, testing, mutants]
title: Thoughts on Mutation Testing in Python (part 1)

---

  
Writing code is fun.

Writing tests is a great way to have code that is likely to work.

Using a coverage tool will show you what percentage of your code is executed when you run your tests. But getting 100% coverage does not mean your code is 100% tested.

Take for example the following:

{% highlight python %}
def product(a, b):
    return a * b
{% endhighlight %}

How might we go about testing this function?

{% highlight python %}
>>> product(2, 2)
4
{% endhighlight %}

Okay, so technically, we now have 100% coverage of our function. Every line is executed when running the tests, but is it really tested?

What happens if we change our original function, and see if the tests pass:

{% highlight python %}
def product(a, b):
    return a + b
{% endhighlight %}

Hmm. When we run that, with those arguments, we still pass our test.

What we have done here is mutate our code, and in this case, the mutant _survived_.

In order to test this code correctly, we want all possible mutations to be killed (or, tests that run should fail with mutants).



This is the first post in a series on mutation testing in python. Up next, we will investigate the types of mutants/mutations, and how they apply to python.