# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.

|  Day | Deliverable |
|---|---|
|Day 1: Tue| Wireframes and Priority Matrix|
|Day 2: Wed| Project Approval /  Pseudocode / actual code|
|Day 3: Thur| Basic Clickable Model |
|Day 4: Fri| Working Prototype |
|Day 5: Sat| Final Working Project |
|Day 6: Sun| Bugs / Stylying / PostMVP |
|Day 7: Mon| Project Presentations |


## Project Description

Use this section to describe your final project and perhaps any links to relevant sites that help convey the concept and\or functionality.

I am implementing a version of Wheel of Fortune, beloved by word puzzle enthusiasts of all ages. In this game, players take turns guessing the letters that are missing from a well known word or phrase. The first player to successfully guess the word or phrase wins the game.

## Wireframes

Include images of your wireframes.

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matix.

## Game Components

### Landing Page
What will a player see when they start your game?
1. "Welcome" message
1. Fom to collect players' names
1. Button to continue to game

### Game Initialization
What will a player see when the game is started?
1. Presentation of the word puzzle:
  Attractive Letters and punctuation - some of the letters will be blocked out
1. Player names and current scores
1. Button for obtaining point values
1. Optional form for entering the puzzle's solution
1. Notification area - indicates whose turn it is, status of turn, status of game.


### Playing The Game
What will be the flow of the game, what will the user be expected to do and what will the user expect from the game

The game is played by two players, who will enter their names on the game's landing page.

The gameboard contains the players' names, scores,  a roulette-style "wheel", and a word or phrase with missing letters.

Each player to take a turn, during which s/he spins the wheel for determine points for the round, then guesses a letter.

If guessed correctly,
  all letters in the word/phrase matching the guess are revealed;
  The player accumulates points in his/her score, and can either
    spin/guess again, or
    try to guess the puzzle.
Letters which are correctly guessed are removed from the game (not available for guesses)

If the player guesses the wrong letter, or tries and fails to guess the puzzle, s/he loses the turn, and the other player gets a turn.

### Winning The Game
What does it look like when the game ends, what determines winning or losing?

The winner is the first player for whom the following occurs during his/her turn:
  No more letters remain to guess, or
  s/he correctly guesses the puzzle.

The game announces the winner prominently and suggests resetting to play another game.

The points earned are kept by the winner, but the loser's score is wiped out.

### Game Reset
How will the user restart the game once it has been completed.

There will be a game-reset button on the board, after the game has ended.

## MVP

Include the full list of features that will be part of your MVP
1. Landing page with welcome message, player entry form, button to continue to game
1. Game board with
  1. player's names
  1. scoreboard
  1. presentation of puzzle
  1. input area to enter guesses
  1. wheel-shaped turn value button (instead of spinning wheel)
  1. short list of puzzles
1. "Level-1" Reset button
1. "Level-1" Guess logic - functionality to handle letter guesses, for example:
    1. Accept consonant guesses only - reject vowel guesses
    1. Reveal successful guesses on gameboard
    1. Track used letters - is this visible on tv show?
1. "Level-l" Player Turn logic - exclude solve-the-puzzle guesses for now?
1. "Level-1" Puzzle list (short, easier, more letters revealed at the start)
1. "Level-1" Turn value selection (easier; non randomized)
1. Puzzle selection (easier; non randomized)

## POST MVP

Include the full list of features that you are considering for POST MVP
## Functional Components

1. "Level-2" guess logic -
    1. buying vowels
    1. guessing the puzzle
1. "Level-2" Player Turn logic - include guess-the-puzzle portion of a turn
1. "Level-2" Turn value selection - enhanced
    1. losing turn
    1. wipeout of points
1.  "Level-2" puzzles - Longer list of puzzles. Harder puzzles?
1. spinning wheel which selects turn value.
1. Sound effects
1. "Level-2" reset button - works during the game, not just the end (in case players want to start a new game without finishing the old game)

Based on the initial logic defined in the previous game phases section try and breakdown the logic further into functional components, and by that we mean functions.  Does your logic indicate that code could be encapsulated for the purpose of reusablility.  Once a function has been defined it can then be incorporated into a class as a method.

Determine which player goes first.
Player executes a turn. (Each turn has a mandatory part A, the letter guess, and an optional part B, the word/phrase guess.)
* Turn Part A: Player spins wheel; player x makes guess
    * Check remaining letters
    * Check Player's status:
    * GAME-WIN - GAME OVER
    * PART-A-WIN - repeat Part A or go on to PART B.
    * PART-A-LOSE - next Player's turn

* Turn Part B: Player guesses word/phrase
    * Check Player's status
    * GAME-WIN - GAME OVER
    * PART-B-LOSE - next player's turn

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted.

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Component 1 | H | 10hrs| 12hrs | 12hrs |
| Total |  | 10hrs| 12hrs | 12hrs |


## Helper Functions
Helper functions should be generic enought that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

| Function | Description |
| --- | :---: |
| Capitalize | This will capitalize the first letter in a string |

## Additional Libraries
 Use this section to list all supporting libraries and thier role in the project.

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description.

## jQuery Discoveries
 Use this section to list some, but not all, of the jQuery methods and\or functionality discovered while working on this project.

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.

## Issues and Resolutions
 Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....
**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier
**RESOLUTION**: Missing comma after first object in sources {} object
