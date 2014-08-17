---
date: 2013-04-15 22:03:19
layout: post
publish: true
tags: [python, pypi, cache, pip]
title: My own private PyPI

---


[PyPI](https://pypi.python.org), formerly _the CheeseShop_ is awesome. It's a central repository of python packages. Knowing you can just do a ``pip install foo``, and it looks on pypi for a package named foo is superb. Using [pip](http://www.pip-installer.org/en/latest/usage.html) requirements files, or [setuptools](https://pypi.python.org/pypi/setuptools) ``install_requires`` means you can install all the packages you need, really simply.

And, the nice thing about pip is that it won't bother downloading a package you already have installed, subject to version requirements, unless you specifically force it to. This is better than installing using ``pip install -e <scm>+https://...`` from a [mercurial](http://mercurial.selenic.com) or [git](http://git-scm.com) repository. This is a good reason to have published version numbers.

However, when installing into a new [virtualenv](https://pypi.python.org/pypi/virtualenv), it still may take some time to download all of the packages, and not everything I do can be put onto pypi: quite a lot of my work is confidential and copyrighted by my employer. So, there is quite a lot of value to me to be able to have a local cache of packages. 

You could use a shared (between all virtualenvs) ``--build`` directory, but the point of virtualenv is that every environment is isolated. So, a better option is a local cache server. And for publishing private packages, a server is required for this too. Being able to use the same workflow for publishing a private package as an open source package is essential.

Because we deploy using packages, our private package server is located outside of our office network. We need to be able to install packages from it on our production servers. However, this negates the other advantage of a pypi cache. It does mean we control _all_ of the required infrastructure required to install: no more "We can't deploy because github is down."

So, the ideal situation is to actually have two levels of server: our private package server, and then a local cache server on each developer's machine. You could also have a single cache server in the local network, or perhaps three levels. I'm not sure how much of a performance hit not having the cache on the local machine is.

To do this, you need two things. Your local cache needs to be able to use an upstream cache (no dicking around with ``/etc/hosts`` please), and your private server needs to be able to provide data to this.

The two tools I have been using handle neither of these. [pypicache](http://pypicache.readthedocs.org/en/latest/) does not handle upstream caching, however this was easy to patch. [My fork](https://bitbucket.org/schinckel/pypicache) handles upstream caching, plus uses ``setuptools``, enabling it to install it's own dependencies.

[localshop](https://pypi.python.org/pypi/localshop), however, will not work as an upstream cache, at least with ``pypicache``, which uses some other APIs than those used by pip. However, it does have nice security features, and to move away from it would require me to extract the package data out. ``pypicache`` works to a certain extent with itself as an upstream cache, until you try to use it's 'requirements.txt caching' feature. Which I tried to tonight.

Oh well.