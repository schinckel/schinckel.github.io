---
date: 2013-08-11 16:55:14
layout: post
publish: true
tags: [bash, pipe, mac_address, arp, sed, regex]
title: arp -a | vendor

---


I have lots of things on my local network. Most of them behave nicely with the DHCP server, and provide their machine name as part of their DHCP request (Client ID), which means I can see them in the list in Airport Utility.

However, some of them don't which means I have some blank rows.

It would be nice to be able to figure out which devices these are, especially for those that don't provide any services (particulary a web interface).

Enter [MAC Vendor Lookup](http://www.macvendorlookup.com/api).

You can register, and get an API key that will return values in the format you desire.

Then, it's possible to do:

{% highlight bash %}
$ curl --silent http://www.macvendorlookup.com/api/:API_KEY/:MAC_ADDRESS | cut -f 1 -d \|
{% endhighlight %}

(I use the pipe delimited version).

This is all well and good, but who wants to have to type them in? Not this guy.

Let's look at how we can get them from `arp -a`.

{% highlight bash %}
$ arp -a | cut -f 4 -d ' '
{% endhighlight %}

Okay, that's promising, it gives me a list of MAC addreses. Almost. It skips out leading zeros, which the API rejects. And it includes ones that are missing.

Cue about an hour mucking about with the (limited) `sed` regex docs:

{% highlight bash %}
$ arp -a | 
    cut -f 4 -d ' ' | 
    sed -E 's/:([[:xdigit:]]):/:0\1:/g' | 
    sed -E 's/^.:/0&/' | 
    sed -E 's/:(.)$/:0\1/'
{% endhighlight %}

Ah, that's better. Now we have the proper MAC addresses.

Now, we can pipe this information through the API call.

This is where we need to start to get a bit tricky. We need to create a function that will allow us to call the API with a new value each time. You'll want to stick this in your ``.bashrc``.

{% highlight bash %}
function mac_vendor() {
  $API_URL="http://www.macvendorlookup.com/api"
  $API_KEY="<your api key>"
  if [[ $1 ]]; then
    curl --silent "$API_KEY/:API_KEY/$1" | cut -f 1 -d \|
  else
    while read DATA; do
      curl --silent "$API_KEY/:API_KEY/$DATA" | cut -f 1 -d \|
    done
  fi
}
{% endhighlight %}

The if statement means we can use it by passing an argument on the command line:

{% highlight bash %}
$ mac_vendor 00:00:00:00:00:00
Xerox Corporation
{% endhighlight %}

Or by passing through data from ``stdin``:

{% highlight bash %}
$ arp -a | 
    cut -f 4 -d ' ' | 
    sed -E 's/:([[:xdigit:]]):/:0\1:/g' | 
    sed -E 's/^.:/0&/' | 
    sed -E 's/:(.)$/:0\1/' |
    mac_vendor
{% endhighlight %}

Okay, that's nice, but we now can't see which IP address is associated with which vendor.

Let's move that ugly chained `sed` call into it's own function, called `normalise_mac_address`, which we will also wrap in a `while read DATA; do ... done` clause, so we can pipe data through it:

{% highlight bash %}
function normalise_mac_address() {
  while read DATA; do
    echo $DATA |
      sed -E 's/:([[:xdigit:]]):/:0\1:/g' |
      sed -E 's/^.:/0&/' |
      sed -E 's/:(.)$/:0\1/'
  done
}
{% endhighlight %}

Nearly there!

We now need to be able to grab out the IP address and the MAC address from arp, and pass only the MAC address through our conversion functions. By default the bash `for … in …` construct will iterate through words, so we need to tell it to deal with a line at a time:

{% highlight bash %}
function get_all_local_vendors() {
  IFS=$'\n'
  for LINE in `arp -a | cut -f 2,4 -d ' '`; do
    # We have LINE="(<ip.address.here>) <mac:address:here>"
    MAC=`echo $LINE | cut -f 2 -d ' ' | normalise_mac_address`
    IP=`echo $LINE | cut -f 1 -d ' '`
    # We only want ones that were still active
    if [ $MAC != '(incomplete)' ]; then
      VENDOR=`echo $MAC | mac_vendor`
      echo $VENDOR $IP
    fi
  done
}
{% endhighlight %}

I'm hardly a bash expert, so there may be a better way of doing things rather than the repeated ``VARIABLE=`foo thing` `` construct I keep using.

So, the outcome I get when I run this looks something like:

{% highlight bash %}
$ get_all_local_vendors 
Apple, Inc. (10.0.1.1)
Sparklan Communications, Inc. (10.0.1.3)
Devicescape Software, Inc. (10.0.1.4)
Mitrastar Technology (10.0.1.5)
Apple, Inc. (10.0.1.15)
Silicondust Engineering Ltd (10.0.1.16)
Apple Computer (10.0.1.21)
none (10.0.1.255)
{% endhighlight %}

Getting rid of that last one is left as an exercise to the reader: the MAC address is `FF:FF:FF:FF:FF:FF`.