--- 
wordpress_id: 1483
layout: post
title: Using moGenerator as part of the Build Process (XCode)
time: "16:58:33"
date: 2008-07-08 16:58:33
tags: 
- general
- core-data
- xcode
wordpress_url: http://schinckel.net/2008/07/08/using-mogenerator-as-part-of-the-build-process-xcode/
---
Using Core Data is awesome.

[moGenerator][1] makes it even better, as you can have Entitites defined as being of a particular class, and this code generator creates two classes for each Entity - a machine-readable one which is updatable by running the script again, and a human readable one that you can safely edit - it won't be changed once it has been created.

You can easily make this tool a part of you build process.

First, create a new directory inside your project folder, I called mine MO. Then, cd to that directory, and run:

`$ mogenerator -m ../*_DataModel.xcdatamodel`  


Then add the folder MO to your project.

Now add a new build phase script, and put into it:

`cd MO`  
`mogenerator -m ../*_DataModel.xcdatamodel`  


It's not quite perfect - if you add a class, it won't be added to your project automatically. You might be able to get around this by including the -includem switch, but then you won't be able to have the .m files located in your project, else you will get duplicate symbol errors.

   [1]: http://rentzsch.com/code/mogenerator

