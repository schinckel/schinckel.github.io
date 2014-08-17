--- 
wordpress_id: 1401
layout: post
title: Chess, just for fun.
time: "16:36:20"
date: 2008-04-13 16:36:20
tags: 
- java
wordpress_url: http://schinckel.net/2008/04/13/chess-just-for-fun/
---
We had a homework exercise the other day, that went something like this:

> Consider the design a class, `ChessBoard`, to represent a chess board (an 8 by 8 grid of squares) where each square can have a single chess piece on it (pawn, rook, knight, bishop, king or queen) which is either black or white. Discuss the design of move methods for each type of piece. The methods should have parameters which specify where the piece currently is and where it is being moved to. Each method should check if the move is valid (the correct type of piece is on the square, the move is to a square that is on the board and it does not contain a piece of the same colour) - a proper implementation would also check that none of the other rules of chess are being violated.
> 
> Give declarations and initializations for each of the instance variables the class (ChessBoard) would need and declare any other classes necessary. Add a method to ChessBoard that will place all the pawns of a particular colour on the board. White pawns occupy the entire second row (1 pawn on each square of the second row) of the board while black pawns occupy the seventh row of the board. 
> 
> Complete the implementation of the `moveKnight` method below and the class Position (you could just use `java.awt.Point`). Knights move 2 square either horizontally or vertically (along rows or columns) and then 1 square to the left or right.
> 
> `boolean moveKnight(Position currentPosition, Position newPosition) { ...`

Now, that was just not enough for me. So I designed and implemented, just for fun, a framework to handle all of the pieces, and all of their possible moves. I went a bit full-on: my classes are listed below. 

  * ChessGame
  * ChessBoard
  * Location (each square is a Location, this makes it easy to do stuff later on)
  * Team
  * Move
  * Piece (abstract)
  * King, Queen, Bishop, Knight, Rook, Pawn

Now, most of this is fairly easy: using OO is golden for something like this, where there are stacks of cases where inheritance means you can implement it once, and this is fine for most cases, but where not you can just override it once or twice. And having this level of abstraction in each case has also been quite handy. For instance, by having a Move class, which has a Piece, and two Locations (start and finish), it's a simple thing for me to keep a record of the game (LinkedList of Moves), and calculate things, like whether a particular piece was the last to move (for en passant).

There are actually only a couple of tricky things to worry about with Chess. Most of these are related only to the King: you have to check before each move to see that the move won't put your team's king into check, and if you are already in check, then ensure that the move you make takes you out of check. Otherwise, it's a fairly simple algorithm. To set up the rules, not to actually play.

As it turns out, the Pawn is actually the hardest piece to code for, since it moves in a variety of different ways in different contexts. It's harder to code for the normal behaviour (ignoring en passant) than it is to handle castling.

The only thing I haven't implemented yet (apart from being able to drag and drop or click on pieces) is whether the game is in checkmate. I'm not quite sure how to do this, just yet.

Anyway, here is a screenshot of my simple chess game. It's the biggest thing I've written in Java so far, and doing all of the UI code, was, as expected, a whole lot more painful than Cocoa.

![Picture 1.png][1]

I still don't have my head around the Drag and Drop stuff to do with Java, nor really at this stage have I figured out how to make each Location clickable, and then use this to execute moves. I think I'll make it so that a click checks to see if a piece is of the right team, and present in the chosen location, and then highlights that square so you can see what piece you are moving. Then clicking on a second Location will move that piece to there, if it is a valid move.

I guess after that, I just need to make the intelligence to play...just kidding. That might wait till I am studying AI, next semester... 

   [1]: /images/2008/04/picture-1.jpg

