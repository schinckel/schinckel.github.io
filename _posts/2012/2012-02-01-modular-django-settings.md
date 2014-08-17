---
date: 2012-02-01 21:21:15
layout: post
publish: true
tags: [django, python]
time: '21:21:15'
title: Modular django settings

---


A recurring feature of [#django][#django] is that someone asks about `settings.py`, and using a `local_settings.py` file. The standard advice is to have the following in your `settings.py`:

{% highlight python %}
# More settings are above here.

try:
  from local_settings import *
except ImportError:
  pass
{% endhighlight %}

This is usually the last (or one of the last) things in the file. This can be used to override settings with sane values for the local environment.

However, this means that `local_settings.py` must be not in your source control system, or must not be deployed to other servers.

I like keeping everything in my source control system of choice (mercurial), and currently use an hg-based deployment. In my `fabfile.py`, instead of archiving up the current structure, I use `hg` to push the main repo, and any sub-repos, and update them to the version that is displayed locally.

This means I want to be able to control the content of production's `local_settings.py` equivalent.

The other issue, and this was the one that came up today and gave me the idea of this post, is that someone wanted to add an app to `settings.INSTALLED_APPS` but only locally. I too have done this (still do, with `django-devserver`, amongst others).

I came up with the following solution. Instead of having a `settings.py` and `local_settings.py`, I have a `settings` module:

{% highlight text %}
settings/
    __init__.py
    base.py
    development.py
    production.py
    testing.py
{% endhighlight %}

`base.py` contains what was normally in your main `settings.py` file. That is, settings that are common to all environments.

In `development.py`, `production.py` and `testing.py`, I have the following line at the top:

{% highlight python %}
from base import *
{% endhighlight %}

Then, in each of those files, where I need to override or alter a setting, including appending to a list or tuple, I can just modify away. Some things that I do in `development.py`, for instance:

{% highlight python %}
from base import *

DEBUG = True

DATABASES['default']['HOST'] = '127.0.0.1'

INSTALLED_APPS += (
  'devserver',
  'test_extensions',
  'test_utils' # really only for makfixture.
)

import getpass
EMAIL_BACKEND = 'django.core.mail.backends.filebased.EmailBackend'
EMAIL_FILE_PATH =  PROJECT_ROOT / 'log' / 'email-messages-%s' % getpass.getuser()
{% endhighlight %}

This shows how you can set a value, alter a value of a `dict` given a specific key, and append to a `tuple`. I also have a nice little setup where I use a value set in the `base.py` file (`PROJECT_ROOT`) to determine where I want to log email messages to.

Finally, you need some way to say which of these files should be used. This is all done in `__init__.py`:

{% highlight python %}
servers = {
  'development': [
    'darwin', 'boyd', 'arne'
  ],
  'testing': [
    'testing', 'debian'
  ],
  'production': [
    'staging', 'vps1', 'vps2', 'vps3'
  ]
}

def get_server_type():
  from socket import gethostname
  server_name = gethostname()
  for server_type, names in servers.items():
    if server_name in names:
      return server_type
  
  return 'production' # Or whatever you want the default to be.
                      # I usually have 'testing' here, because I tend to
                      # spin up test servers. If you spun up production
                      # servers lots, you'd use that.

exec("from %s import *" % get_server_type())
{% endhighlight %}

This method does require a little bit of maintainence: when you have a new server name, you need to add an entry to this file. If you are often creating testing servers (like I am) then you might want to use `testing` as the default server type.

Alternatively, you could use some sort of prefix to mean a particular server type.

Anyway, that's how I do it. The only drawback is that it does mean that your `SECRET_KEY`, and any passwords you might have defined in `settings.py` are stored in your repository. We aren't that fussed about that right now: our project is closed source, and only trusted people have access to the repository.

[#django]: irc://irc.freenode.net/django

