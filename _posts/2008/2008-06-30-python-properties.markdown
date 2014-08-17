--- 
wordpress_id: 1474
layout: post
title: Python Properties
time: "15:17:46"
date: 2008-06-30 15:17:46
tags: 
- database
- python
wordpress_url: http://schinckel.net/2008/06/30/python-properties/
---
One of the criticisms of many languages is that they are so complex, that people do not use all of the features of them. Meaning that one person might write a program in a language that another, fluent reader/writer of that language may not be able to understand. I think this is just rubbish, at least to some respect. If you see some code in a language that doesn't make sense, then hopefully you should be able to either figure it out, or look up in the documentation (what, your language doesn't have complete online, searchable documentation?) what is going on.

A similar thing happened to me the other day - and I didn't even need to look up in the Python documentation to see what the story was.

People often criticise python because it lacks the ability to mark a variable as private, or protected. All attributes of a class are automatically public, and it is only really a guideline that if you prefix a variable with one or two underscores, you are marking it as protected or private. Namespace mangling means that this becomes slightly more than just a guideline, IIRC, although I'm not really sure of how this all works. Basically, the theory is that if you prefix an attribute, that is a marker to users of your API that you really shouldn't use this.

I've often been frustrated when writing Java programs that attributes aren't accessible, but I can see the value in only allowing protected access, through getters and setters. You can do this to prevent user classes/objects from putting garbage data into your attributes. This becomes even more important in Python, as its dynamic (but still strong) typing means I could put a "GOO" in where you expected an integer.

I discovered yesterday, as I was implementing a database in SQL Alchemy, that python has the ability to only allow protected access, through getters and setters, using the property function.

So, for this project, I have a database, where Sheep objects are stored, along with a variety of attributes. Sheep can be either Rams or Ewes, but the data that is stored about a Ram is virtually identical as that stored about a Ewe. However, using polymorphic mapping, I can have Ram and Ewe objects both stored in the Sheep table, since they are both sub-classes. Furthermore, I can use the gender attribute to determine if the object retrieved from the database should be a Ram or a Ewe. This is much better than anything I was able to do with J2EE, at least as far as I could find.

Because I am using a composite primary key (again, not something that is easy to do with J2EE, without defining a Primary Key class, ugh), and a Sheep can have a .sire and a .dam, which internally is stored with three columns in the table each, and that a sire/dam must be older than the sheep in question (and of particular gender), then some form of restricting which data can be assigned to the sire and dam attributes (which, using SQL Alchemy are references to other objects in the table).

Thus, I can have the following lines in the class definition for Sheep:
    
    
{% highlight python linenos %}
        sire = property(_getSire, _setSire)
        dam = property(_getDam, _setDam)
{% endhighlight %}
    

The crux of this post is that now, if you attempt to set a sire, using: sheep.sire = otherSheep; then it will pass the contents of otherSheep to the `_setSire` method of the Sheep class.

This goes even further - it now allows me to either use a Ram object, or a Sheep object (and uses some checking to ensure that it is a Gender=M), or even just a string that is the string representation of a sheep - the value that I am using for the three parts of the primary key. It will then look up the sheep in question, or create a new one if it doesn't exist in the database.

Thus, a sheep is identified to the real world by three things: it's flock number, such as 160188, the year it was born, like 2004, and the tag number, such as 040001, which is not unique between flocks, or necessarily years. For the flock this system is designed for, the tag number is unique for sheep of a given century, which would generally suffice, but in a situation where there were more than 9999 sheep born every year in a flock, then you wouldn't just be able to use the last two digits of the year for the start of the tag number.

Thus a sheep might be declared as 160188-2007-070001, which is a unique identifier of that sheep in the world (or at least Australia!), but having this as a primary key on it's own means more jigglery would be required to get the flock number and year. By storing as three seperate parts it is possible to keep an easy reference to the flock, and the year. There is no chance of a data integrity error as there might be if I stored the id, then the year and flock number. It would be possible then to change one without the others being udpated.

I've also done something quite clever with the mapping of the sire/dam relationship. By having different classes for Ram and Ewe, and mapping sire/dam to these, it is possible to use the same backreference term, offspring, to generate a list of sheep who are offspring of the Ram or Ewe in question. If you don't use subclasses, then it isn't nearly as neat.

•

If you can't tell, I'm loving SQL Alchemy. I had some issues figuring out what the hell was going wrong with my relations between sheep and sire, but it turned out that you have to use the remote_side argument to the relation function to do what I wanted. Funnily, it was working with dam, but not with sire, but now it's much more solid. No more circular reference constraints either.

By the way, this project is going to be an online database for livestock information, allowing potential purchasers to research pedigrees online. If anyone else is interested in purchasing it, send me an email. At this stage, it is sheep only, but will be easy to change to, say cattle if they are your thing...
