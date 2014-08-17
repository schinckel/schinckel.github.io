--- 
wordpress_id: 1402
layout: post
title: Using Dynamic DNS as (partial) authentication.
time: "10:47:45"
date: 2008-04-14 10:47:45
tags: 
- internet
wordpress_url: http://schinckel.net/2008/04/14/using-dynamic-dns-as-partial-authentication/
---
One thing that you can do with Apache is limit access to particular domains. For instance, you can have a process running on a Server that handles internal requests as well as external requests, and have the internal site never exposed to the outside internet. This can be done using the apache Allow and Deny directives.

But, sometimes I need to work remotely, and still have access to the intranet data, such as the company wiki and bugzilla database. But I don't know which IP addresses I will be using, and whilst I can open it up to allow a range of IP addresses in, this means that someone else could see the data.

So, set up a dynamic DNS for your laptop, and put in an Allow for this DNS entry. Then, you just have to update the address whenever you want to access it - or even better, update it whenever your IP address changes. That means, even if someone comes on to the same IP address after you, as long as you have a new IP address, they won't be able to get in.

This does point out the flaw in the system: if you log off, and don't log back on (or don't renew your IP address), then that person can access your intranet data. So, you should not use this as a sole means of authentication. Instead, use http authentication, or preferably, some other method of protecting access. But as a lightweight (ie, no VPN) system, this looks pretty good. It should even work if you are behind a firewall that prevents VPN access. And adding a new user requires a bit of work - creating a new Dynamic Hostname and adding this to the httpd.conf file - or wherever your server config data is stored.

It strikes me you could use sub-domains to do this, too, and have userxx.company.dyndns.org, or whatever. Then an allow of company.dyndns.org should allow anyone using a subdomain. I don't know how you can do subdomains with DynDNS, but it may be possible with some other system. (Or, if you run your own DNS, you could come up with a method of doing it there, which gives you more flexibility. However, if you have a DNS, you can probably stretch to a VPN too).
