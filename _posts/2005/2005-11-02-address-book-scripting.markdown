--- 
wordpress_id: 538
layout: post
title: Address Book Scripting
time: "20:27:16"
date: 2005-11-02 20:27:16
tags: 
- applescript
wordpress_url: http://schinckel.net/2005/11/02/address-book-scripting/
---
I'm trying to save time by creating some simple scripts to add values to Address Book entries. For instance, I have a whole lot of people in a group who are living in the same state, and I want to add this to all addresses. However, it doesn't seem to be possible to get or set the state of an address: 
    
    
{% highlight applescript linenos %}
    tell application "Address Book"
    	tell my card
    		set the_state to state of address 1
    	end tell
    end tell
{% endhighlight %}
    

This fails. With the very helpful: 

> Address Book got an error: Can't make state of address 1 of my card into type reference.

Which means absolutely nothing, as far as I can tell. Googling this string brings no joy. Now the weird thing is that if I switch over to another user, it works fine. Update: I quit all running Apps (with the intention of restarting, but System Update stopped me) and retried it. It worked. Something I was running was interfering with it, but I have no idea what. 
