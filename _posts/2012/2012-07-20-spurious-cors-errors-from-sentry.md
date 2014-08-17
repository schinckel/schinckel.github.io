---
date: 2012-07-20 22:03:54
layout: post
publish: true
tags: [heroku, sentry, django, gmail, cors, raven.js]
title: Spurious CORS Errors from Sentry

---


I realised the other day that [Sentry][sentry], the awesome system we have been using for a while to track our error logs from our [Django][django] project, can also be used to track exceptions from other systems. Like Javascript. In fact, there is a client available: [raven.js][ravenjs].

So, we have a server set up for work, but I have a side-project I have been working on, Workout Builder. So, I thought I'd set up a server in [Heroku][heroku] to act as my sentry server. And I found a nice simple way to get up and running: Daniel Watkins has a nice post over at [Odd_Blog][odd-blog], [Deploying Sentry on Heroku][odd-blog-sentry].

It's pretty straightforward, and extremely simple. I got it up and running in no time, and then attempted to set up an email service. Rather than use my actual account for sending, I thought I'd set up a sending-only account at my domain, hosted as a Gmail Apps domain. So, I set it up, and set about testing.

All of a sudden, I'm getting errors, that didn't appear for 30 seconds, that my test domain is not permitted to send a request due to CORS. But, I had been sending them previously.

After lots of dicking around, I discovered it was because I did not have the gmail settings quite right. Instead of telling me what the problem was, something was masking the issue (that the server was timing out because the server/port combination was not correct), and jQuery thought it was a CORS issue.

So, fixing up the email sending settings, and it's all gravy:

{% highlight python %}
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_PASSWORD = '<oh no you don\'t>'
EMAIL_HOST_USER = 'noreply@schinckel.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
{% endhighlight %}

Initially, I had used `mail.google.com`, port `25`, and `EMAIL_USE_TLS = False`. Eventually, I got it all right.

[sentry]: http://sentry.readthedocs.org/en/latest/index.html
[django]: https://www.djangoproject.com
[ravenjs]: https://github.com/lincolnloop/raven-js
[odd-blog]: http://blog.daniel-watkins.co.uk/
[odd-blog-sentry]: http://blog.daniel-watkins.co.uk/2012/07/deploying-sentry-on-heroku.html
[heroku]: http://www.heroku.com