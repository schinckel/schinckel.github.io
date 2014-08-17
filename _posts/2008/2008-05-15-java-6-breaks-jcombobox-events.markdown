--- 
wordpress_id: 1418
layout: post
title: Java 6 Breaks JComboBox Events
time: "17:59:06"
date: 2008-05-15 17:59:06
tags: 
- java
wordpress_url: http://schinckel.net/2008/05/15/java-6-breaks-jcombobox-events/
---
It took some figuring out, but I came across what appears to be a deliberate bug in Java 6 SE.

Under Java 1.5, you can rely on a JComboBox to generate ActionEvent actions whenever an item is selected from the list - even if that item is already selected.

Java 6 SE does not do this. You only receive an ActionEvent when you select a different item from the list than is currently selected.

For most cases, this will be fine. If selecting something should update other objects or properties, then this might not be the case.

There are a couple of workarounds. The one I chose uses .setSelectedItem(null) when another event is generated that would need to be 'overridden' by the JComboBox choice. Another is to create a subclass of JComboBox that performs the desired behaviour. But this is too hard.

It comes about from using ComboBoxes where they aren't really designed. The shouldn't really be used for actions to begin with, but in some cases they are.

This is yet another example of Java breaking previous code.  

