---
date: 2014-05-24 21:46:33
layout: post
publish: true
tags: [python, psycopg2, postgres, jsonb]
title: Python, postgres and jsonb

---

  
I maintain a json field for django, and was working today on getting the new (1.7+) lookup code to play nicely: in order for this to happen, you basically need to be running Postgres 9.4, and using a jsonb column. Otherwise, querying kind-of sucks.

After a significant amount of work, where I drift backwards and forwards between having old and new code working, I had an idea.

Some time ago I discovered that [psycopg2](http://initd.org/psycopg) has really nice support for some custom types. Indeed, it's super-easy to get it to handle UUID and json data. But it seems that it hasn't yet been made to work with jsonb.

However, the registration process for handling the data makes it possible to do so, and trivial, since the serialised form will be essentially identical for both:

{% highlight python %}
psycopg2.extras.register_json(
    conn_or_curs=None,
    globally=False,
    loads=None,
    oid=None,
    array_oid=None
)
{% endhighlight %}

Note the last two arguments. We can trick psycopg2 into using jsonb instead of json.

Is your database, execute:

{% highlight sql %}
SELECT oid, typarray FROM pg_type WHERE typname = 'jsonb';
-- oid      --> 3802
-- typarray --> 3807
{% endhighlight %}

(Syntax highlighting fail means I can't include the actual results).

Your values may vary (I'm really not sure), but you'll simply need to call `register_json` with the first two:

{% highlight python %}
register_json(oid=3802, array_oid=3807)
{% endhighlight %}

Now, assuming you have a jsonb column, when you fetch data from it, it will already be turned into python objects.

{% highlight pycon %}
Python 2.7.5 (default, Mar  9 2014, 22:15:05) 
[GCC 4.2.1 Compatible Apple LLVM 5.0 (clang-500.0.68)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import psycopg2
>>> conn = psycopg2.connect("")
>>> cur = conn.cursor()
>>> cur.execute("SELECT * FROM jsonb_test;")
>>> data = cur.fetchone()
>>> data
(1, '{}')
>>> from psycopg2.extras import register_json
>>> register_json(oid=3802, array_oid=3807)
(<psycopg2._psycopg.type 'JSON' at 0x101713418>, <psycopg2._psycopg.type 'JSONARRAY' at 0x101721208>)
>>> cur.execute("SELECT * FROM jsonb_test;")
>>> data = cur.fetchone()
>>> data
(1, {})
{% endhighlight %}