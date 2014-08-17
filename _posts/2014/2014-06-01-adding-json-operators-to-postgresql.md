---
date: 2014-06-01 23:04:22
layout: post
publish: true
tags: [postgres, sql, operator]
title: Adding JSON operators to PostgreSQL

---


Notably, the new JSONB data type in postgres is missing some of the features that the hstore data type has had for some time.

    hstore - text     : delete key from left operand
    hstore - text[]   : delete keys from left operand
    hstore - hstore   : delete matching pairs from left operand

However, using two awesome features of Postgres, it's possible to add these operators in.

Firstly, python as a language in postgres:

{% highlight sql %}
matt=# CREATE LANGUAGE plpythonu;
{% endhighlight %}

Then, you can write functions in python, that import standard system libraries, like `json`.

{% highlight sql %}
CREATE OR REPLACE FUNCTION json_subtract(json_object json, key text) RETURNS json AS $body$
import json
data = json.loads(json_object)
data.pop(key, None)
return json.dumps(data)
$body$ LANGUAGE plpythonu;
{% endhighlight %}

Finally, you can now overload the operator to get the syntactic sugar you want:

{% highlight sql %}
CREATE OPERATOR - (
  LEFTARG = json,
  RIGHTARG = text,
  PROCEDURE = json_subtract
);
{% endhighlight %}

Now, you can use the same syntax as for hstore:

{% highlight sql %}
matt=# SELECT '{"a":1, "b":2}'::json - 'a'::text;
 ?column? 
----------
 {"b": 2}
(1 row)
{% endhighlight %}

It's possible to repeat these for the other subtraction operators:

{% highlight sql %}
CREATE OR REPLACE FUNCTION json_subtract(json_object json, keys text[]) RETURNS json AS $body$
import json
data = json.loads(json_object)
for key in keys:
    data.pop(key, None)
return json.dumps(data)
$body$ LANGUAGE plpythonu;

CREATE OPERATOR - (
  LEFTARG = json,
  RIGHTARG = text[],
  PROCEDURE = json_subtract
);

CREATE OR REPLACE FUNCTION json_subtract(json_object json, pairs json) RETURNS json AS $body$
import json
data = json.loads(json_object)
pairs_data = json.loads(pairs)
for key,value in pairs_data.items():
  if key in data and data[key] == value:
    data.pop(key)
return json.dumps(data)
$body$ LANGUAGE plpythonu;

CREATE OPERATOR - (
  LEFTARG = json,
  RIGHTARG = json,
  PROCEDURE = json_subtract
);
{% endhighlight %}

I'll leave it as an exercise to write functions for the other operators.