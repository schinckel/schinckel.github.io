---
date: 2014-05-28 22:15:27
layout: post
publish: true
tags: [python, dateutil, rrule, rfc2445, monkey-patch]
title: rrule to RFC-string

---

  
I've been playing around with Postgres lots lately, and I had the idea to store RRULE data in a Postgres Composite Type.

It then occurred to me I didn't need to reimplement all of the great stuff that is in the python [dateutil](https://labix.org/python-dateutil) module: I can just use PL/Python and import it.

The next step was realising I didn't need to use a custom type, but just use a new Domain of type text that validates the string is an RFC 2445 compatible string.

That's all well and good, but `dateutil` doesn't come with a way to convert `rrule` objects back into a string.

There is a patch, but it wasn't quite right. So here is my method (which can be monkey-patched, as seen at the end):

{% highlight python %}
FREQNAMES = ['YEARLY','MONTHLY','WEEKLY','DAILY','HOURLY','MINUTELY','SECONDLY']

def rrule_to_string(rule):
    output = []
    h,m,s = [None] * 3
    if rule._dtstart:
        output.append(rule._dtstart.strftime('DTSTART:%Y%m%dT%H%M%S'))
        h,m,s = rule._dtstart.timetuple()[3:6]
    
    parts = ['FREQ='+FREQNAMES[rule._freq]]
    if rule._interval != 1:
        parts.append('INTERVAL='+str(rule._interval))
    if rule._wkst:
        parts.append('WKST='+str(rule._wkst))
    if rule._count:
        parts.append('COUNT='+str(rule._count))
    
    for name, value in [
            ('BYSETPOS', rule._bysetpos),
            ('BYMONTH', rule._bymonth),
            ('BYMONTHDAY', rule._bymonthday),
            ('BYYEARDAY', rule._byyearday),
            ('BYWEEKNO', rule._byweekno),
            ('BYWEEKDAY', rule._byweekday),
            ]:
        if value:
            parts.append(name+'='+','.join(str(v) for v in value))
    
    # Only include these if they differ from rule._dtstart
    if rule._byhour and rule._byhour[0] != h:
        parts.append('BYHOUR=%s' % rule._byhour)
    if rule._byminute and rule._byminute[0] != m:
        parts.append('BYMINUTE=%s' % rule._byminute)
    if rule._bysecond and rule._bysecond[0] != s:
        parts.append('BYSECOND=%s' % rule._bysecond),
    
    
    output.append(';'.join(parts))
    return '\n'.join(output)

from dateutil.rrule import rrule
rrule.__str__ = rrule_to_string
{% endhighlight %}

I've only lightly tested it (in both regular python and PL/Python). I've also come up with a neat way of caching `rrule` objects between function calls, but that's a topic for another day, but here it is in an SQL session.

{% highlight sql %}
SELECT rrulestr('DTSTART:19970902T090000 FREQ=DAILY;INTERVAL=10;COUNT=5');

            rrulestr            
--------------------------------
 DTSTART:19970902T090000       +
 FREQ=DAILY;INTERVAL=10;COUNT=5
(1 row)
{% endhighlight %}