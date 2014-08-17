--- 
wordpress_id: 1663
layout: post
title: Setup Django with Passenger Prefpane
time: "13:56:59"
date: 2009-07-25 13:56:59
tags: 
- general
- django
- apache
wordpress_url: http://schinckel.net/2009/07/25/setup-django-with-passenger-prefpane/
---
I am loving [Django][1] for web development. I didn't have it set up to serve my (development) projects automatically until just now.

I had installed the [Passenger][2] [Prefpane][3], which greatly simplifies the management of VirtualHost-based serving of sites, at least for Rails and other ruby-based frameworks. With a little work, you can use the same setup to serve Django projects.

Rather than re-detail the setup, I'll just point you to the [mod_passenger setup][2], and the [Passenger Prefpane setup][4] pages.

Now, to set up a Django project: obviously you need a django project. Create one, and note where it is located. I stick all of mine in ~/Sites.

Add a file to the root of this project, called passenger_wsgi.py. It needs to contain the following data:
    
    
{% highlight python linenos %}
import os, sys
sys.path.append('/Users/matt/Sites') # Replace with your directory
os.environ['DJANGO_SETTINGS_MODULE'] = 'testing.settings' # replace with your projectname.
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
{% endhighlight %}
    

Now, add the site to the Passenger prefpane. My site is the testing.local site:

![][5]

Now visit the address and ensure that it works. You should get the basic _you need to set up django_ message.

To get the admin media served by the standard apache setup, I created a link inside the `/Library/WebServer/Documents` directory to `/Library/Python/2.5/site-packages/django/contrib/admin/media`. This can be done inside the Terminal:
    
    sudo ln -s /Library/Python/2.5/site-packages/django/contrib/admin/media /Library/WebServer/Documents/admin-media/

Then, change the `ADMIN_MEDIA` setting in your django projects to `http://localhost/admin-media/`. This is probably the weakest point in the setup, as it will only work for pages served to your machine, not others on your network.  

{% highlight python linenos %}
# URL prefix for admin media -- CSS, JavaScript and images. Make sure to use a
# trailing slash.
# Examples: "http://foo.com/media/", "/media/".
ADMIN_MEDIA_PREFIX = 'http://localhost/admin-media/'
{% endhighlight %}
    

I had some issues with mod_passenger serving the data for localhost (and arne, my actual machine's name) from the first installed VirtualHost. To overcome this, I put in a new file into /etc/apache2/other/localhost.conf, which looks like:
    
    
{% highlight apache linenos %}
<VirtualHost *:80>
  DocumentRoot "/Library/WebServer/Documents"
  <directory "/Library/WebServer/Documents">
    Order allow,deny
    Allow from all
  </directory>
</VirtualHost>
{% endhighlight %}
    

This forces unnamed, or other sites to work as intended. Including the `/User/*/Sites` directories.

   [1]: http://djangoproject.com
   [2]: http://www.modrails.com/
   [3]: http://github.com/alloy/passengerpane/tree/master
   [4]: http://www.fngtps.com/passenger-preference-pane
   [5]: http://s3.amazonaws.com/ember/0QX55qzZXvQYU50eIrNf2Mfo03fvMzTO_m.png

