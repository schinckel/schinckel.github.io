--- 
wordpress_id: 1413
layout: post
title: On Teaching Programming
time: "14:55:20"
date: 2008-04-28 14:55:20
tags: 
- education
- programming
wordpress_url: http://schinckel.net/2008/04/28/on-teaching-programming/
---
Before I begin, I'll recap my qualifications, and why I think I can write this article, and have it stand as meaning something.

I have spent the last 9 years teaching. I know how to teach. I haven't always managed to have the best results, but I have a solid understanding of educational theories and principles. I have taught a little bit of programming, somewhat unsuccessfully, although I have written programs of one sort or another consistently over the past 20 years. Most of my programming has not been for commercial purposes, in fact quite a lot of it has been programming for programming's sake.

This year has so far been a huge eye-opener for me. I returned to study after a 9-year hiatus, and it was 4 years since my previous study in Computer Science/Engineering. As mentioned before, I haven't exactly done nothing related to Computer Science in that time, but haven't been in a formal education setting related to programming in about 13 years.

One of the things that stopped me from returning to study was that all three Universities in the city I live in have only taught Java in the introductory courses for the past god-knows-how-many-years. I'd tried a couple of times to learn Java from various books, but always returned to python, or other more productive languages. I'd studied C, and done quite well at that, a long time ago, so it wasn't that I was afraid of "real" languages, but more that Java just had no appeal for me. I think the first time I tried I gave up at "primitives and objects are totally different." I certainly remember thinking "You are joking!?" when this came up again at the start of this year when I learned Java.

So, now I'm studying full-time at Flinders University, doing Computer Science. A lot of what I'm about to say may be perceived to be somewhat critical of that institution, but please bear in mind that some of what I'm studying is useful, advanced and interesting. It's just that some of it isn't.

The introductory programming topic is all Java. But not even real Java. See, they are using the fantastic IDE called BlueJ, which removes a lot of the complexity of Object Oriented programming. By fantastic, I mean fucking shit. The whole point of programming is that it is somewhat complex, but I'll get to that later. So this BlueJ thing takes a different approach. Instead of writing code, and seeing how that works, the first stuff you tend to do is graphical, and you instantiate classes by right-clicking on them, and selecting from a menu. In fact, for the first week's work (or the first day, since I did the course intensively), I don't think we wrote a line of code at all.

And the students who suffered through this, and the running of the same topic in normal semester last year, are really feeling it now. We are (almost) doing some real programming, and in many cases these students haven't grasped what I consider to be the basics of programming. They haven't totally understood selection and iteration, let alone recursion.

I think Object Oriented programming is a great paradigm. I mean, I wrote an Object Oriented chess game (without the artificial intelligence) in less than 10 hours of coding time. That's a game, complete with GUI, that allows users to click-click to move pieces. It checks validity of moves, redraws the screen, and so on. Doing it procedurally would really suck.

But I went into that with a solid grounding in imperative programming. I learned how to construct loops and selection statements in BASIC back in the 80s. I used to criticise BASIC and Pascal, but I think I'm starting to see the value in having those type of languages, the ones that are really limited and limiting, but allow you to learn in a safe environment. By safe I mean less-threatening, because you can still, if you try hard enough, break things.

I think more importantly though, the first language people learn should be interpreted. For starters, it removes the barrier to entry of having to understand the compile/execute cycle. More so, it provides immediate feedback on what you type in.

Back to educational-land. I have studied a significant amount of Psychology, and know one thing. The sooner after an action you receive feedback, the more likely you will take away the lesson from the situation. If you type in a command, it will fail immediately, and you can then try to get it right.

Interpreted languages don't need to be restricted to type-in-command : get-feedback styles of programming. They can be used in batch mode, but being able to experiment with the code as you go along makes a big difference to learning how stuff works. I'll repeat the example I used last November. When I had a Commodore 128D (think of a C=64, but with a separate keyboard, a larger case, a floppy drive, and more memory: 128kb!)I remember at first being stumped by the error message that appeared when you moved the cursor up over the READY. prompt and pressed return.

OUT OF DATA ERROR.

(Apologies for the all caps, that was the way it was back then...)

It wasn't until I started programming on that machine, which had a low entry cost since there was a built-in basic interpreter which was basically the access point to the OS. When you deal with data structures on C= BASIC, you use a command called READ, which works in conjunction with DATA. Because you could sometimes have a READ when there wasn't a corresponding DATA statement (or argument), then you would run out of data. And the error message shown above would appear.

The first time I saw the error message on one of my own programs something clicked. I finally understood what the computer meant when I did the whole READY. thing. But more than that, I realised that computers are in many senses contextually insensitive. The computer had no idea that I wasn't writing a program. It was inside the BASIC interpreter, therefore it was a program.

That's the key. With computers, you need to spell stuff out instruction by instruction. In the early days, this was done with setting switches to reflect binary values. As we go on, we abstract this process. Next it was machine code, then assembly language, then higher-level languages.

In some ways, you lose something at each level. What you gain, however, in most cases exceeds that which you lose. I'd hate to try to write anything significant in assembler, let alone machine code. Being able to grasp the full idea that you are working on, being able to fit one concept in a screen, and not having to worry about things that are at a higher or lower level of abstraction enables you to better write bug-free code.

•

It is possible that the current limit of reasonable abstraction will be extended in the future - natural language processing and diagram-based programming tools may someday become the norm. At this point in time, however, syntax is still important, perhaps even more so than semantics. Programmers must still spell every keyword correctly. Compilers and interpreters aren't smart enough to determine which else clause goes with which if determinant without some sort of structure, be it braces or indentation. They can't just guess, and get it right, nor can they make sound judgements based on context.

So, it's still important for beginning programmers to learn how to structure a loop, or several types of loop. More important, IMHO, than knowing about objects and inheritance. Yet the current trend towards OO as the be-all and end-all of learning coding means that these ideas are given precedence.

I think the saddest reflection of this is that students are not capable or interested in advanced programming topics. With 120 students at Flinders University doing Computer Programming 2A, this drops to 10 doing Programming Language Concepts. And PLC is going to make those 10 much better programmers. Because it teaches them about the structure and interpretation of computer programs. Not just how to knock together a few classes that kind-of work and get the job done.

But I rant.
