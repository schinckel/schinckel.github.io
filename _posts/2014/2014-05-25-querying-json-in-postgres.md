---
date: 2014-05-25 16:25:15
layout: post
publish: true
tags: [postgres, json, sql]
title: Querying JSON in Postgres

---


Yesterday, I discovered how you can [enable jsonb in postgres/psycopg2](/2014/05/24/python%2C-postgres-and-jsonb/).

Today, I experimented around with how to query the data in json columns. There is [documentation](http://www.postgresql.org/docs/9.4/static/functions-json.html), but it wasn't initially clear to me how the different operations worked.

{% highlight sql %}
CREATE TABLE json_test (
  id serial primary key,
  data jsonb
);

INSERT INTO json_test (data) VALUES 
  ('{}'),
  ('{"a": 1}'),
  ('{"a": 2, "b": ["c", "d"]}'),
  ('{"a": 1, "b": {"c": "d", "e": true}}'),
  ('{"b": 2}');
  
{% endhighlight %}

So far, so good. Let's see what's in there, to check:

{% highlight sql %}
SELECT * FROM json_test;
{% endhighlight %}

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  1 | {}
  2 | {"a": 1}
  3 | {"a": 2, "b": ["c", "d"]}
  4 | {"a": 1, "b": {"c": "d", "e": true}}
  5 | {"b": 2}
(5 rows)  
{% endhighlight %}

Super. Let's have a go at filtering those results. There are several operators that we can use (and we'll soon see why we chose jsonb).

### Equality

Only available for jsonb, we can test that two JSON objects are identical:

{% highlight sql %}
SELECT * FROM json_test WHERE data = '{"a":1}';
{% endhighlight %}

{% highlight text %}
 id | data 
----+------
  1 | {"a": 1}
(1 row)
{% endhighlight %}

### Containment

Again, jsonb only, we can see if one JSON object contains another. In this case, containment means "is a subset of".

{% highlight sql %}
SELECT * FROM json_test WHERE data @> '{"a":1}';
{% endhighlight %}

Give me all objects that contain the key `"a"`, with the value `1` associated with that key:

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  2 | {"a": 1}
  4 | {"a": 1, "b": {"c": "d", "e": true}}
(2 rows)
{% endhighlight %}

Containment goes both ways:

{% highlight sql %}
SELECT * FROM json_test WHERE data <@ '{"a":1}';
{% endhighlight %}

In this case, we can see that the query object is a superset of the empty object, as well as matching exactly to object 2.

{% highlight text %}
 id |   data   
----+----------
  1 | {}
  2 | {"a": 1}
(2 rows)
{% endhighlight %}

### Key/element existence

The last batch of jsonb only operators: we can test for the existence of a key (or an element of type string in an array, but we'll get to those later).

{% highlight sql %}
SELECT * FROM json_test WHERE data ? 'a';
{% endhighlight %}

Give me all objects that have the key `a`.

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  2 | {"a": 1}
  3 | {"a": 2, "b": ["c", "d"]}
  4 | {"a": 1, "b": {"c": "d", "e": true}}
(3 rows)
{% endhighlight %}

We can also test for objects that have _any_ of a list of keys:

{% highlight sql %}
SELECT * FROM json_test WHERE data ?| array['a', 'b'];
{% endhighlight %}

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  2 | {"a": 1}
  3 | {"a": 2, "b": ["c", "d"]}
  4 | {"a": 1, "b": {"c": "d", "e": true}}
  5 | {"b": 2}
(4 rows)
{% endhighlight %}

And, as you may expect, for objects that have _all_ of the keys:

{% highlight sql %}
SELECT * FROM json_test WHERE data ?& array['a', 'b'];
{% endhighlight %}

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  3 | {"a": 2, "b": ["c", "d"]}
  4 | {"a": 1, "b": {"c": "d", "e": true}}
(2 rows)
{% endhighlight %}

### Key-path traversal

We can also filter records that have a matching key-path. In simple cases, using the containment operators might be simpler, but in more complex situations, we would need to use these. These operations can also be used to extract a value, although at this stage I'm only interested in using them as part of a `WHERE` clause.

{% highlight sql %}
SELECT * FROM json_test WHERE data ->> 'a' > '1';
{% endhighlight %}

Give me all the records where the value of the element associated with key `a` is greater than `1`. Notice the need to use a text value, rather than a number. I'm still investigating how this will play out.

{% highlight text %}
 id |           data            
----+---------------------------
  3 | {"a": 2, "b": ["c", "d"]}
(1 row)
{% endhighlight %}

We can also do comparisons between primitives, objects and arrays:

{% highlight sql %}
SELECT * FROM json_test WHERE data -> 'b' > '1';
{% endhighlight %}

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  3 | {"a": 2, "b": ["c", "d"]}
  4 | {"a": 1, "b": {"c": "d", "e": true}}
  5 | {"b": 2}
(3 rows)
{% endhighlight %}

So, it seems that arrays and objects sort greater than numbers.

We can also look deeper down the path:

{% highlight sql %}
SELECT * FROM json_test WHERE data #> '{b,c}' = '"d"';
{% endhighlight %}

Give me objects where element `b` has a child object that has element `c` equal to the string `"d"`. Neat.

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  4 | {"a": 1, "b": {"c": "d", "e": true}}
{% endhighlight %}

There are also versions of these operators that return a text, rather than a json object. In the case of the last query, that means we don't need to compare to a JSON object (in the case where we actually want a string).

{% highlight sql %}
SELECT * FROM json_test WHERE data #>> '{b,c}' = 'd';
{% endhighlight %}

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  4 | {"a": 1, "b": {"c": "d", "e": true}}
(1 row)
{% endhighlight %}

### Don't cross the streams...

So, all good so far. We can query stuff, and this same stuff can be used to index jsonb columns, too.

However, the more astute reader may have noticed that I've been dealing with json data that has an object as it's root. This needn't be the case: arrays are also valid json, indeed so are any of the allowable atoms:

{% highlight sql %}
SELECT 
  'null'::json, 
  'true'::json, 
  'false'::json, 
  '2'::json,
  '1.0001'::json,
  '"abc"'::json, 
  '1E7'::jsonb;
{% endhighlight %}

Note the last one is a jsonb, which converts to canonical form:

{% highlight text %}
 json | json | json  | json |  json   | json  |  jsonb   
------+------+-------+------+---------+-------+----------
 null | true | false | 2    | 1.00001 | "abc" | 10000000
(1 row)
{% endhighlight %}

Note also that a json `null` is different to an SQL `NULL`.

So, what happens when we start storing objects of mixed "type" in a json column?

I'm glad you asked.

{% highlight sql %}
INSERT INTO json_test (data) 
VALUES ('[]'), ('[1,2,"a"]'), ('null'), ('1E7'), ('"abc"');

SELECT * FROM json_test;
{% endhighlight %}

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  1 | {}
  2 | {"a": 1}
  3 | {"a": 2, "b": ["c", "d"]}
  4 | {"a": 1, "b": {"c": "d", "e": true}}
  5 | {"b": 2}
  6 | []
  7 | [1, 2, "a"]
  8 | null
  9 | 10000000
 10 | "abc"
(10 rows)
{% endhighlight %}

So far, so good. We can store those objects. And query?

Equality testing works fine:

{% highlight sql %}
SELECT * FROM json_test WHERE data = '{"a":1}';
SELECT * FROM json_test WHERE data = 'null';
{% endhighlight %}

Containment, too works as expected.

{% highlight sql %}
SELECT * FROM json_test WHERE data @> '{"a":1}';
SELECT * FROM json_test WHERE data <@ '{"a":1}';
{% endhighlight %}

Key and element existence perform reliably: perhaps surprisingly, the one query will match elements in an array, as well as keys in an object.

{% highlight sql %}
SELECT * FROM json_test WHERE data ? 'a';
{% endhighlight %}

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  2 | {"a": 1}
  3 | {"a": 2, "b": ["c", "d"]}
  4 | {"a": 1, "b": {"c": "d", "e": true}}
  7 | [1, 2, "a"]
(4 rows)
{% endhighlight %}

{% highlight sql %}
SELECT * FROM json_test WHERE data ?| array['a', 'b'];
{% endhighlight %}

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  2 | {"a": 1}
  3 | {"a": 2, "b": ["c", "d"]}
  4 | {"a": 1, "b": {"c": "d", "e": true}}
  5 | {"b": 2}
  7 | [1, 2, "a"]
(5 rows)
{% endhighlight %}

{% highlight sql %}
SELECT * FROM json_test WHERE data ?& array['a', 'b'];
{% endhighlight %}

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  3 | {"a": 2, "b": ["c", "d"]}
  4 | {"a": 1, "b": {"c": "d", "e": true}}
(2 rows)
{% endhighlight %}

But, as soon as we start doing key or element 'get', we hit a problem:

{% highlight sql %}
SELECT * FROM json_test WHERE data ->> 'a' > '1';

ERROR: cannot call jsonb_object_field_text 
       (jsonb ->> text operator) on an array
{% endhighlight %}

We can still use the key-path traversal, though, unless we have scalar values:

{% highlight sql %}
SELECT * FROM json_test WHERE data #> '{b,c}' = '"d"';
ERROR:  cannot call extract path from a scalar
SELECT * FROM json_test WHERE data #> '{b,c}' = '"d"' AND id < 8;
{% endhighlight %}

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  4 | {"a": 1, "b": {"c": "d", "e": true}}
(1 row)
{% endhighlight %}

Note the syntax for a key path: it only allows for strings (which json keys must be), or integers (which array indices are).

This seems like a pretty severe limitation. I'm not sure how things like MongoDB handle this, but in hindsight, if you are storing both array-based and object-based json data in the one column, you are probably going to be in a world of hurt anyway.

### ...or, maybe, do cross the streams

All is not lost, however: it's possible to get just the object-based rows:

{% highlight sql %}
SELECT * FROM json_test WHERE data @> '{}';
{% endhighlight %}

{% highlight text %}
 id |                 data                 
----+--------------------------------------
  1 | {}
  2 | {"a": 1}
  3 | {"a": 2, "b": ["c", "d"]}
  4 | {"a": 1, "b": {"c": "d", "e": true}}
  5 | {"b": 2}
(5 rows)
{% endhighlight %}

You could then combine this with a previously-forbidden query:

{% highlight sql %}
SELECT * FROM json_test WHERE data @> '{}' AND data ->> 'a' > '1';
{% endhighlight %}

{% highlight text %}
 id |           data            
----+---------------------------
  3 | {"a": 2, "b": ["c", "d"]}
(1 row)
{% endhighlight %}

Indeed, postgres is so awesome you don't even need to ensure the `data @> '{}` bit comes first!

But what about limiting to just array-typed data? Turns out we can use the same trick:

{% highlight sql %}
SELECT * FROM json_test WHERE data @> '[]';
{% endhighlight %}

{% highlight text %}
 id |    data     
----+-------------
  6 | []
  7 | [1, 2, "a"]
(2 rows)
{% endhighlight %}

And, again, combine with the other required operator:

{% highlight sql %}
SELECT * FROM json_test WHERE data @> '[]' AND data ->> 1 = '2';
{% endhighlight %}

{% highlight text %}
 id |    data     
----+-------------
  7 | [1, 2, "a"]
(1 row)
{% endhighlight %}


Worth noting is that the `@>` operator is only available on jsonb columns, so you won't be able to query mixed-form data in a regular json column.

### Wow! What's next?

This foray into querying jsonb data in postgres was an aside to a project I'm working on to bring json(b) querying to django. With django 1.7's new custom lookup features, it will be possible to write things like:

{% highlight python %}
# Exact
MyModel.objects.filter(data={'a': 1})
MyModel.objects.exclude(data={})
# Key/element existence
MyModel.objects.filter(data__has='a')
MyModel.objects.filter(data__has_any=['a', 'b'])
MyModel.objects.filter(data__has_all=['a', 'b'])
# Sub/superset of key/value pair testing
MyModel.objects.filter(data__contains={'a': 1})
MyModel.objects.filter(data__in={'a': 1, 'b': 2})
# Get element/field (compare with json)
MyModel.objects.filter(data__get=(2, {'a': 1}))
# Get element/field (compare with scalar, including gt/lt comparisons)
MyModel.objects.filter(data__get=(2, 'a'))
MyModel.objects.filter(data__get__gt=('a', 1))
# key path traversal, compare with json or scalar.
MyModel.objects.filter(data__get=('{a,2}', {'foo': 'bar'}))
MyModel.objects.filter(data__get=('{a,2}', 2))
MyModel.objects.filter(data__get__lte=('{a,2}', 2))
{% endhighlight %}

I'm still not sure about the lookup names, especially the last set. The name "get" seems a little generic, and maybe we could use different lookup names for the input type, although only integer and string values are permitted.