---
date: 2014-07-28 21:51:44
layout: post
publish: true
tags: [python, testing, coverage, tox]
title: tox and coverage.py

---


[Tox](http://tox.readthedocs.org) makes it really easy to run multiple tests on your project: against different versions of python or different versions of a related library.

It's still lacking proper matrix testing: you need to manually define each environment, but apparently, that is going to change:

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/schinckel">@schinckel</a> <a href="https://twitter.com/audreyr">@audreyr</a> <a href="https://twitter.com/r1chardj0n3s">@r1chardj0n3s</a> matrix/combinatorial testing with tox is coming, stay tuned :-)</p>&mdash; holger krekel (@hpk42) <a href="https://twitter.com/hpk42/statuses/492941581041668096">July 26, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

However, that's not what I'm writing about today.

Today is about coverage testing, using [coverage.py](http://nedbatchelder.com/code/coverage/).

It's possible, using tox, to get `coverage.py` to run:

{% highlight ini %}
[testenv]
commands=
  coverage run setup.py test
  coverage report
deps=
  coverage
{% endhighlight %}

However, this will generate a coverage report for just that environment. It would be better if you generated a coverage report for the whole project (although you _may_ want per-environment coverage testing too).

So, we can abuse the fact that the tox `envlist` will be created and processed in the order they appear:

{% highlight ini %}
[tox]
envlist = clean,py27,py34,stats

[testenv]
commands=
  coverage run -a setup.py test
deps=
  coverage

[testenv:clean]
commands=
  coverage erase

[testenv:stats]
commands=
  coverage report
  covarage html
{% endhighlight %}

You'll then get a nice html report in `htmlcov/`, and a printed coverage report in your console.