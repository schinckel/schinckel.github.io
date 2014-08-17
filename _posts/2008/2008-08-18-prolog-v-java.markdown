--- 
wordpress_id: 1530
layout: post
title: Prolog v Java
time: "18:24:11"
date: 2008-08-18 18:24:11
tags: 
- prolog
- java
- sudoku
wordpress_url: http://schinckel.net/2008/08/18/prolog-v-java/
---
One program I tend to get around to writing in any new language I learn is a Sudoku solver. I originally wrote one in python, that solved every puzzle I could throw at it (although it had to guess and backtrack on failure in some cases).

Recently, I wrote one in Java. It was three classes plus a Driver/Main class. It took hours to write (at least the whole length of Phar Lap), and eventually it worked. I spent quite a while fixing up all of the syntactic errors I make in Java after programming in better languages again.

I then wrote one in Prolog. It was amazingly simple - it just defines a sudoku puzzle as a list of lists (each of which is 9 elements long), states that each element in each of the lists must be unique, and that each element in the first position of each list (columns) must be unique. Next, it states that each 3x3 grid must be unique, and that each element must be an integer of range 1-9.

That's it. Solved.

My `unique/1` predicate takes a list of items, and succeeds only if each item in the list is unique. This is simple:

  1. An empty list is unique.
  2. A list of one item is unique.
  3. A list of the form `[A,B|X]` is unique if `A` and `B` are different, and `[A|X]` and `[B|X]` are also unique-lists.

I also use a predicate that indicates a variable should be of the value 1-9, it's possible to use advanced techniques and something called "Domains", but I couldn't get this figured out.

The only trick then is in the definitions. The simplest to understand, but messiest is to define the elements in the sudoku puzzle as each having unique names (`[[A1,A2,...,A9],[B1,...]]` and so on), and then passing some lists to unique, ie all 'Ax' elements, all 'X1' elements, and so on.

The coolest thing about Prolog is that you don't need to say how things will happen, but just what the desired outcomes are. This can be dangerous - it's rather easy to write something that will be executed in a ridiculous amount of time, so you often need to think about how to narrow the search space as quickly as possible. In Java, I needed to have methods that would remove elements from a possibles list, and then check to see if there was only one element, in which case it's the actual value that belongs there, and so on. This is all error-prone code, wheras Prolog's backtracking does all of this for you.

The biggest benefit is that in a puzzle that is fiendishly hard, Prolog will still come up with a solution, wheras some other languages, using the algorithm I defined above may not. And, in Prolog, you will automatically get multiple solutions to a problem if they exist.

Can you tell I love Prolog?
