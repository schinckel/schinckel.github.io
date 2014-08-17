---
date: 2013-04-08 23:16:59
layout: post
publish: true
tags: [python, deployment, fabric, pip, django]
title: Python deployment using fabric and pip

---

  
I've spent a not insignificant amount of time working on a deployment function for within my ``fabfile.py`` (the configuration file used by [Fabric](http://fabfile.org)). It's well worth the investment, as being able to deploy with a single command (potentially to many servers) is not only faster, but much less prone to human error.

Currently, I'm using [Mercurial](http://mercurial.selenic.com) as my source control. I'm also using it for deployment, but I'd like to get away from that.

My deployment process looks something like this:

1. Ensure the local repository has no uncommitted changes.
2. Ensure the ``requirements.txt`` file is exactly the same as the output from ``pip freeze``.
3. Copy our public key to the remote server, for the user ``www-data``, if it is not already installed there.
4. Create a [``virtualenv``](https://pypi.python.org/pypi/virtualenv) in the desired location on the server, if there is not one already there.
5. Ensure ``mercurial`` is installed on the server.
6. Push the local repository to the remote server. This will include any subrepositories. I do a little bit of fancy magic to ensure the remote subrepositories exist.
7. Update the remote server's repository to the same revision as we are at locally. This means we don't necessarily need to always deploy to ``tip``.
8. Install the dependencies on the remote server.
9. Run some [django](https://www.djangoproject.com/) management commands to ensure everything is setup correctly.
    * collect static files
    * sync the database
    * run migrations
    * ensure permissions are correct
    * compress static files
10. Restart the various services that need to be restarted.

This process is based around requirements files for a very good reason. [pip](pip) is very good at recognising which packages are already installed, and not reinstalling them if the version requirements are met. I use ``pip freeze > requirements.txt`` to ensure that what will be deployed matches exactly with what I have been developing (and testing) against.

[pip]: http://www.pip-installer.org

However, this process has some issues.

* Files must be committed to SCM before they can be deployed. This is fine for deployment to production, but is annoying for deploying to test servers. I have plenty of commits that turn on some extra debugging, and then a commit or two later, I turn it off.
* I have some packages that I have installed locally using ``pip install -e /path/to/package``. To deploy these, I need to:
    1. Uninstall the editable installation.
    2. Package up a new version of the app.
    3. Push the package to my package repository (I use [localshop](https://github.com/mvantellingen/localshop)).
    4. Install the package from the package repository.
    5. Run ``pip freeze > requirements.txt``.
    6. Commit the changes.
    7. Deploy to the test server.
* Then, I usually need to develop further, so I reinstall using ``pip install -e ...``.

Today, I finally got around to spending some time looking at how [pip][pip] can help improve this workflow.

With [``pip==1.3.1``](http://www.pip-installer.org/en/1.3.1/), we have a command that was not in ``pip==1.1``, which was what I had been using until now.  ``pip bundle``.

My 'deploy-to-development/test' process now looks something like:

1. Get a list of packages installed as editable: ``pip list -e``
1. Create a bundle, without dependencies, of these packages.
1. Get a list of all packages, other than those installed as editable: ``pip freeze | grep -v "^-e"``.
1. Ensure the server is set up (virtualenv, etc)
1. Push the local repository to the remote server.
1. Upload the bundle and requirements files.
1. Install from the requirements file on the server.
1. Force install from the bundle file on the server, without dependencies.
1. Repeat the post-installation stuff from above.

Some of this I'm never going to be able to avoid: ensuring we have the virtualenv, and the post-installation stuff. Migrations gotta migrate. However, I would like to move away from the pushing of the local repository.

My plan: turn my project into a package (complete with ``setup.py``), so that it becomes just another entry in the requirements file. It will be editable, which means it will be bundled up for deployment.

However, it will mean I can get away from having the nested repositories that I currently have. Ultimately, I plan to be able to:

1. Build a bundle of editable packages.
1. Create a requirements file of non-editable packages.
1. Upload both of these files to the server.
1. Install the requirements.
1. Install the bundle.
1. Run the post installation tasks.

That would be bliss.