---
date: 2012-08-10 16:14:55
layout: post
publish: true
tags: [django, urlconf, regex]
title: Django urlpattern nested regex groups

---


Had one of those annoying things that I could not figure out why it was not working; learned something about how django's url routing works along the way.

I created a new view for within the admin, that provides a summary of the permissions associated with a group, or set of groups. For our purposes, a company can have a number of groups associated with it, so I wanted to be able to optionally provide a company id: if it was provided, it would only show the groups+permissions for that company; if not provided it should show all of the groups and their permissions.

So, I had the urlpattern like:

{% highlight python %}
# Included under '/company/...'
url(r'^((?P<company>\d+)?/)?groups/$', 'group_perms', name='company_group_permissions'),
{% endhighlight %}

This resolves fine. All of these variations work as expected:

    http://example.com/company/10/groups/
    http://example.com/company/groups/
    http://example.com/company//groups/

However, I wanted to put a link in the admin change page for the company class, but was getting resolution errors, so I tried reverse directly:

{% highlight python %}
reverse('group_perms', kwargs={'company': 10})
# -> NoReverseMatch: Reverse for 'group_perms' with 
#    arguments '()' and keyword arguments '{}' not found.
{% endhighlight %}

That's odd. Maybe I was getting the name or something wrong:

{% highlight python %}
resolve('/company/10/groups/')
# Result:
ResolverMatch(
  func=<function group_permissions at 0x104b96de8>, 
  args=(), kwargs={'company': '10'}, 
  url_name='company_group_permissions', 
  app_name='None', 
  namespace=''
)
{% endhighlight %}

Then, I removed the extra grouping in the regex:

{% highlight python %}
url(r'^(?P<company>\d+)?/groups/$', 'group_perms', name='company_group_permissions'),
{% endhighlight %}

And it all works as expected. However, this slightly limits the available urls:

    http://example.com/company/10/groups/
    http://example.com/company//groups/

This one no longer works:

    http://example.com/company/groups/

I can live with that.

I can't find anything in the django docs that details this, although I kind-of remember reading that there are limits as to the ability of `reverse()` to generate urls.