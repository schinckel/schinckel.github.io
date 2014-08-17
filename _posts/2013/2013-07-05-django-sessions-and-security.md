---
date: '2013-07-05 12:16:04'
layout: post
tags: [django, security, sessions]
title: Django sessions and security
publish: true
---

  
We have an interesting set of requirements regarding session timeouts.

Our application is currently split into two parts: the newer stuff runs in a browser, but the older parts consume a JSON api, and are part of a native app. We recently stopped using HTTP Basic authentication, and instead use session-based authentication in both places. This was handy, as it
allows us to:

1. Not store the user's password, even in memory on the local machine.
2. Automatically have the user logged in when the native client links to an HTML page (by passing the session id through).

This is all well and good, but we have discovered a slight possible issue.

1. User logs in to native client.
2. User clicks on a button that loads a page in the browser (logging them in automatically).
3. User closes browser window, but does not quit browser.
4. Native client does not cleanly exit, and logout code is not called.

This means that the browser session is still logged in, even though the user would have no idea of this. This is a very bad thing(tm), as the next person to use the computer could have access to all of the previous user's data.

So, we need the following to happen:

* Logging out of the client logs out all of the linked (same session id) browser instances.
* Closing a given browser window does _not_ log out the session (the client may still be open, or there may be other linked browser windows).
* When no requests are receieved within a given time period, the session expires.

So, we need a short session expiry time, but this should refresh every time a request occurs. The browser pages fetch notifications every 30 seconds, but the native client will also need to ping the server with some frequency for this to work.

This is somewhat different to the way [django-session-security](http://django-session-security.readthedocs.org/en/latest/full.html) works. However, this does add a feature that may also be useful: if no user input is receieved on a given page within a timeout period, the session should expire. However, this may be hard to manage, as no activity may occur on one page, but another page may be getting lots of activity. For now, we might leave this out as a requirement.


It turns out Django can do everything that is required, out of the box. All you need to do is configure it correctly:

{% highlight python %}
# settings.py

SESSION_SAVE_EVERY_REQUEST = True
SESSION_COOKIE_AGE = 60
{% endhighlight %}

The key is to understanding that the session expire time is only refreshed if the session is saved. Most requests will not save this (my fetch of unread notifications doesn't for instance), so after the expiry time, the session would expire, even if requests had been made in the meantime.