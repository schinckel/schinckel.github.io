--- 
wordpress_id: 1424
layout: post
title: (One reason) why J2EE sucks dog balls.
time: "00:40:45"
date: 2008-05-26 00:40:45
tags: 
- internet
- java
wordpress_url: http://schinckel.net/2008/05/26/one-reason-why-j2ee-sucks-dog-balls/
---
I really don't respect or like Java as a language. I'm not going to go into reasons why here, but I am going to bitch about J2EE and Enterprise Java app development under NetBeans.

Now, I'm not just a clueless student annoyed with stuff that doesn't work because I'm a gumby. I write enterprise applications in python, apache and SQL Alchemy for my day job. It shouldn't be as hard as it is to develop in NetBeans.

For starters, if I deploy my code and it fails, I shouldn't be able to redeploy it again and it works. Same goes for building. I have found instances where I can build and it fails, and then an immediate re-build succeeds. And I'm not talking "Clean Build", just a regular ordinary build.

More to the point, if I do an "Undeploy and Deploy", and I get a whole load of exceptions, I kind of expect that the deployment has failed. But if I then do a build, it works.

And, it appears that if I build without a fresh redeployment, it fails.

This is just build and deployment issues. I've also had instances where code has failed, when I was pretty fucking sure it should have worked. I was throwing exceptions all over the joint (or, more correctly, the JVM or some other bit of technology was), and they were meaningless. A redeployment and the associated re-build, and it worked.

Developing a similar application in python+SQL Alchemy is faster, doesn't appear to run much slower, and is much, much easier to read later. Yet, it is not taken seriously, because it isn't Java.

Ugh.
