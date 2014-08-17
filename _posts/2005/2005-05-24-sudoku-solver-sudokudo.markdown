--- 
wordpress_id: 185
layout: post
title: "Sudoku Solver: Sudokudo"
time: "21:42:25"
date: 2005-05-24 21:42:25
tags: 
- python
wordpress_url: http://schinckel.net/2005/05/24/sudoku-solver-sudokudo/
---
The Advertiser, great newspaper as it is (that was sarcasm) has been plugging Sudoku puzzles of late. For the uninitiated, a sudoku puzzle is a 9x9 grid, that is broken up into 9 smaller 3x3 squares. Each row, column, and 3x3 grid contains all of the digits 1-9, and (obviously) each row, column and small grid contains each digit only once. The trick is to work out which ones go where. It's all about logic, and working out which digits will not fit. So, I thought I would write a small python program to do it. I was prompted to do this by a puzzle I was working on on the way home, and I thought to myself "this puzzle appears to not have enough information for me to continue". So, I started marking 9 marks in each box, showing which values could fit and not fit into each box. This was time consuming, but should be easy enough to do programmatically. Once you have this down, it's simple to see if there are any boxes where only one value can go, or any rows, columns or squares where there is only once slot a particular digit can fit. And my program did just this. (I actually made an object-oriented one, that uses classes for cells, and puzzles, and methods for checking rows, columns, squares, etc). But, I seem to be missing one logical leap. The first puzzle I tried got solved with a few iterations of my program, but the other two I brought home get stuck. And one of these was one I solved earlier today, so I cannot recall how I was able to make the leap of logic my program cannot. 
