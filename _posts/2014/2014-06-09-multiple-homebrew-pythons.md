---
date: 2014-06-09 10:37:07
layout: post
publish: true
tags: [osx, python, homebrew, virtualenv]
title: Multiple Homebrew Pythons

---

  
The Homebrew project brings a really nice package installer to OS X, allowing you to install command line programs in a really simple way. For instance, to install the latest version of Python 3, you would do:

{% highlight sh %}
$ brew install python3
{% endhighlight %}

Because not all projects are as aware of old versions as python, when brew upgrades a package, it removes the old versions linked binaries and support files. This is actually not a good thing for python: it means you can no longer access the older interpreter.

Python keeps version-named interpreters, and then just symlinks the most recently installed to the `python` executable. Thus, it's not uncommon to see, for python2:

{% highlight sh %}
$ ls -1 /usr/bin/python*
/usr/bin/python
/usr/bin/python-config
/usr/bin/python2.5
/usr/bin/python2.5-config
/usr/bin/python2.6
/usr/bin/python2.6-config
/usr/bin/python2.7
/usr/bin/python2.7-config
/usr/bin/pythonw
/usr/bin/pythonw2.5
/usr/bin/pythonw2.6
/usr/bin/pythonw2.7
{% endhighlight %}

This means, if you want to run an older version (for instance, say you use `tox` and want to do some testing against a range of versions), you can just use:

{% highlight sh %}
$ python2.5
Python 2.5.6 (r256:Unversioned directory, Mar  9 2014, 22:15:03) 
[GCC 4.2.1 Compatible Apple LLVM 5.0 (clang-500.0.68)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> 
{% endhighlight %}

But Homebrew breaks this.

However, if you have the old versions already installed, you can easily recreate the symlinks. Indeed, here is a script that will visit all homebrew installed python3 versions, creating 

{% highlight sh %}
cd /usr/local/Cellar/python3/

for VERSION in `ls`
do
  cd $VERSION
  
  find bin -name \*3\* -exec ln -s -f `pwd`/{} /usr/local/{} \;
  find lib -name \*python\* -maxdepth 1 -exec ln -s -F `pwd`/{} /usr/local/{} \;
  find share -name python\* -exec ln -s -f `pwd`/{} /usr/local/{} \;
  find Frameworks -name 3.\* -exec ln -s -f `pwd`/{} /usr/local/{} \;
  
  cd ..
done
{% endhighlight %}

It worked for me for python3 with the following versions installed:

* 3.2.3
* 3.3.3
* 3.4.1

Now I just need to figure out how to get Homebrew to download and build specific versions of packages.