--- 
wordpress_id: 1666
layout: post
title: On Django and Check Constraints
time: "18:45:38"
date: 2009-09-25 18:45:38
tags: 
- general
- database
- django
wordpress_url: http://schinckel.net/2009/09/25/on-django-and-check-constraints/
---
I've come to love Django, and now I seem to be spending not only my work time, but also my own time working on one django project or another. Today at work I came across the need to have check constraints in a database. For instance, this can be used to ensure that the start of an event is before the end of the event, or that a certain value has a particular range of values.

For the SQL savvy, it can look like:

CREATE TABLE event (  
...more columns here...  
start datetime,  
finish datetime,  
count integer CHECK (count >= 0),  
CONSTRAINT event_starts_before_finish CHECK (start < finish)  
);

There are two types of constraint here: the column-level constraint, which in this instance can be done with django, and the table-level constraint, which in many systems cannot be a part of a column definition. In PostgreSQL, my DBMS of choice, it is possible to define a constraint that affects more than one column as part of a column, but I prefer not to. Note also that I am using the syntax form that allows me to name the constraint. This means I can alter or drop it later.

As I mentioned, django can do the first type of constraint, as long as it is a > 0 constraint, using one of the field types that subclasses PositiveInteger. However, there is no functionality built into django to do the latter. And I would like to use them.

It is possible to just add the constraints to an already existing database: indeed, that is what I did for work. Having the constraints at the database level means that, since I have more than one interface to my datastore (don't ask: one of them is for an old SOAP interface I need to keep around), I want to ensure that even if someone accesses it outside of django, they cannot put in data that breaks these constraints. Similarly, if I use an interface other than the admin interface, or heaven forbid, open up the database in raw form, I cannot accidentally put in data that breaks this validation.

But, pure database level constraints don't give very nice feedback in django. It is nicer to have the pretty red boxes around my field than the traceback. So, I want the validation to occur on the field level as well. As long as I am using django's forms (and my API for RESTful access will use them for validation), then I will have these errors nicely presented.

So, to that end, I have created some code that allows for the definition and enforcement of both of these types of constraint.

The column form allows for a new keyword argument to a field:

`count = models.IntegerField(constraint=">= 0")`  


Notably, the string that can be passed in must conform to the pattern "cmp value", where cmp is one of the comparison operators (<, >, <=, >=, =, !=), and value is a valid value for this column type. It will be passed to the to_python() method of this field when comparing. There must be a string between the two parts.

The other form is a new attribute on the Meta class of a model.

check_constraints = ('start < finish',)    


This must be a tuple of strings, where a string is of the form "column cmp column". Again, there must be a space either side of cmp, and each column name must be a valid column. Not meeting these criteria will result in a validation error.

From these definitions, the database constraints will be applied, and validation of forms will also occur.

I have deliberately made the constraints simple (ie, not callable objects) so that they can easily be converted to database constraints. For instance, they can effectively be transferred straight through to the database (with the addition of the column name in the case of the column constraint).

I am going to create a ticket in the django trac, and submit a patch. Guessing I should write up some test cases, though!
