---
date: 2013-04-15 21:13:03
layout: post
publish: true
tags: [django, requirejs, staticmedia, deployment, cache-busting]
title: Django and RequireJS

---

  
Until very recently, I was very happy with [django-compressor](http://django-compressor.readthedocs.org/en/latest/). It does a great job of combining and minifying static media files, specifically JavaScript and CSS files. It will manage compilation, allowing you to use, for example, SASS and CoffeeScript. Not that I do.

But, for me, the best part was the cache invalidation. By combining JavaScript (or CSS) into files that get named according to a hash of their contents, it's trivial for clients to not have an old cached JS or CSS file.

However, recently I have begun using [RequireJS](http://requirejs.org). This enables me to declare dependencies, and greatly simplify the various pages within my site that use specific JavaScript modules. But this does not play so well with django-compressor. The problem lies with the fact that there is no real way to tell RequireJS that "instead of ``js/file.js``, it should use ``js/file.123ABC.js``", where ``123ABC`` is determined by the static files caching storage. RequireJS will do optimisation, and this includes combining files, but that's not exactly what I want. I could create a built script for each page that has a ``require()`` call in it, but that would mean ``jQuery`` etc get downloaded seperately for each different script.

I have tried using [django-require](https://github.com/etianen/django-require), but using the ``{% raw %}{% require_module %}{% endraw %}`` tag fails spectacularly (with a ``SuspicousOperation`` exception). And even then, the files that get ``require``d by a dependency hierarchy _do not have the relevant version string_.

That is, it seems that the only way to get the version numbering is to use django's templating system over each of the javascript files.

There appear to be two options.

** List every static file in ``require.config({paths: ...})``. **

This could be manually done, but may be possible to rewrite a ``config.js`` file, as we do have access to all of the processed files as part of the ``collectstatic`` process.

Basically, you need to use ``{% raw %}{% static 'js/file.js' %}{% endraw %}``, but strip off the trailing ``.js``.
  
**  Rewrite the static files. **

Since we are uglifying the files anyway, we could look at each ``require([...], function(){ ... })`` call, and replace the required modules. I think this would actually be more work, as you would need to reprocess every file.

So, the former looks like the solution. ``django-require`` goes close, but, as mentioned, doesn't quite get there.