---
date: 2013-11-19 18:11:03
layout: post
publish: true
tags: [python, virtualenv, mac, osx]
title: Per-command Virtualenv

---


Recently, I finally got around to re-installing OS X from scratch on my work machine. It was past time it needed to happen, to the extent where I would frequently be unable to wake machine from display sleep, and saving a file in a monitored directory would take the wsgi-monitor package tens of seconds to restart django.

One thing I wanted to do this time was only install stuff as necssary, but also put every `pip install`ed command line tool in it's own virtualenv. However, this has one drawback, in that it is a little repetitive.

For instance, to install Fabric, my deployment tool of choice:

{% highlight bash %}
$ virtualenv ~/.venv/fabric
$ . ~/.venv/fabric/bin/activate
(fabric)$ pip install fabric
(fabric)$ ln -s ~/.venv/bin/fabric /usr/local/bin/
{% endhighlight %}

This is fine if you only have one 'tool' to install, but something like `docutils` actually installs a whole stack of command line tools.

What we want, is something like:

* create the virtualenv
* get a list of items _already_ in the `<virtualenv>/bin`
* install the required tool (and any extra modules)
* link all of the newly added commands in `<virtualenv>/bin` to `/usr/local/bin`

We could just add each `<virtualenv>/bin` to our path, but that would mean that the first virtualenv created would be used for `pip`, which I don't want installed at all.

Additionally, it would be nice to be able to specify a required version of the package to install, and other (non-dependency) packages that should be installed. For instance, I want `mercurial_keyring` to be installed in the `mercurial` virtualenv.

This last one is probably less important, as you can just use that virtualenv's pip to install them after. But the version number stuff might be nice.

`virtualenv` has the nice ability to be able to create bootstrap scripts, which will do other stuff (like install specific packages). We can co-opt this to build a tool for doing the automatic installation and linking:

{% highlight python %}
import virtualenv, subprocess

data = """
import os, subprocess

def extend_parser(optparse_parser):
    optparse_parser.add_option(
        "--upgrade",
        action="store_true",
        dest="upgrade",
        default=False,
        help="Upgrade package",
    )
    optparse_parser.add_option(
        "--path",
        dest="path",
        default='~/.venv/',
        help="Parent path of virtualenvs"
    )
    optparse_parser.add_option(
        '--package',
        dest="packages",
        action="append",
        help="Other packages to install"
    )
    
def adjust_options(options, args):
    global package
    if not args: 
        return
    package = args[0]
    if '==' in args[0]:
        args[0], version = args[0].split('==', 1)
    args[0] = os.path.join(os.path.expanduser(options.path), args[0])

def after_install(options, home_dir):
    global package
    venv = os.path.join(os.path.expanduser(options.path), home_dir)
    before = os.listdir(os.path.join(venv, 'bin'))
    command = [os.path.join(venv, 'bin', 'pip'), 'install', package]
    if options.upgrade:
        command += ['--upgrade']
    if options.packages:
        command += options.packages
    subprocess.call(command)
    after = os.listdir(os.path.join(venv, 'bin'))
    
    for command in set(after).difference(before):
        subprocess.call([
            'ln', '-s', 
            os.path.join(venv, 'bin', command),
            '/usr/local/bin'
        ])
"""

output = virtualenv.create_bootstrap_script(data)
open('/usr/local/bin/pip-install', 'w').write(output)
subprocess.call(['chmod', '+x', '/usr/local/bin/pip-install'])
{% endhighlight %}

There is one caveat: if an existing file is found in `/usr/local/bin` that matches one that should be linked, it will be ignored. That is, it does not overwrite existing commands. I think this is preferable, as it is marginally safer.

Linking commands like this is better than copying them, as it means you can just do a `pip install --upgrade <package>` in the relevant virtualenv, and it will upgrade commands. You can also use `pip-install <package>==<new-version>`, and that should work too. However, if you unlink a command (or remove one that would have linked but failed), and do a `pip-install`, it will not link the commands that were already installed in _that_ virtualenv.
  
Anyway, your mileage may vary. I'm using it now, and it seems good.