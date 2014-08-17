---
wordpress_id: 1691
layout: post
title: django-socialregistration and 'closed' sites.
time: "23:21:51"
date: 2011-01-17 23:21:51
tags: 
- general
- django
- twitter
wordpress_url: http://schinckel.net/2011/01/17/django-socialregistration-and-closed-sites/
---

I develop a 'closed' system. It isn't that not just anyone can use it - hell, we'd love to have more customers, but the users of the front-facing site (myROSS) are not the same as our customers, who use the backend indirectly through our client application.

The outcome of this is that we do not allow for registration on myROSS. The only way you can become a user of myROSS is if your company uses The ROSS System, and you have been added by your manager, franchisee or whatever.

However, I have been looking at django-socialregistration a bit lately: it is a very clean way to allow users to register and then login using Facebook, Twitter OAuth, and OpenID. Since one of the reasons that many of our 'users' do not use myROSS as much as we would like is because it is another password to remember, and also because most of our users are younger employees of Quick Service Restaurants, we are hoping that allowing them to use their Facebook or Twitter credentials will mean the barrier to use of myROSS is reduced.

So, I would like to be able to use socialregistration to allow currently registered users to connect their myROSS accounts to one or more of their other accounts (Twitter, Facebook, OpenID), and then allow them to use that as a means of authentication. But at the same time, I want to prevent non-current users from registering (or more to the point, prevent a current user from accidentally creating a duplicate account).

The first part is already handled by socialregistration: when a logged in user clicks on a link that connects to Twitter, for instance, and then approves the connection on the Twitter website, their account is then associated. Data is stored in the myROSS database noting which twitter account id matches which myROSS account. They can then log in using Twitter. I assume the same happens with Facebook (which I don't use), and OpenID (which I haven't tried yet - although I do use it for other sites).

What I need to do is prevent non-logged in users from registering.

The way socialregistration's workflow works is that when a non-logged in user authenticates with the outside authentication system, they are redirected to a setup page, which allows them to either create a username, or generates a username for them. We need to just hook in at this time, and instead of asking for a new username/email address, ask them to enter their current myROSS credentials. At that point, we can store the information as is done if they were already authenticated.

Rather than hack the socialregistration source, we can use the hooks that the authors there have kindly left us. Specifically, we only need to override one class, the UserForm. We can do this in the view, by changing the arguments passed in to the 'setup' view.

If you copied-and-pasted the contents of the socialregistration urls.py file, then you can just modify the declaration of the 'socialregistration_setup' url route, and add in the new form class. Otherwise, you can just override that url route. I included the whole socialregistration.urls, so now the relevant section of my project urls.py looks like:
    
{% highlight python linenos %}
# routes for socialregistration: note the override of the first one.
(r'^auth/setup/$', 'socialregistration.views.setup', {'form_class':auth_additions.forms.ExistingUserForm}),
(r'^auth/', include('socialregistration.urls')),
{% endhighlight %}

There is also an import of my auth_additions.forms module.

Now, the exciting bit: what goes in the ExistingUserForm class?
    
    
{% highlight python linenos %}
from django.contrib.auth.forms import authenticate
from django.utils.translation import gettext as _
from django import forms

class ExistingUserForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(label=_("Password"), widget=forms.PasswordInput)
    
    def __init__(self, user, profile, *args, **kwargs):
        super(ExistingUserForm, self).__init__(*args, **kwargs)
        self.user = user
        self.profile = profile
    
    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username and password:
            self.user = authenticate(username=username, password=password)
            if self.user is None:
                raise forms.ValidationError(_("Please enter a correct username and password. Note that both fields are case-sensitive."))
            elif not self.user.is_active:
                raise forms.ValidationError(_("This account is inactive."))

        return self.cleaned_data
        
    def save(self, request=None):
        self.profile.user = self.user
        self.profile.save()
        return self.user
{% endhighlight %}