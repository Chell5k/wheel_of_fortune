When the players arrive at the site, they are welcomed by the landing page, which  asks the players for their names. After the players enter both names, the game asks them to click a button to proceed. The players also get a button to exit the game.

After clicking the button, the players see the gameboard, which shows 

the first puzzle, 
the players' names and current scores (0), 
a banner or notification area reporting the name of the current player which tells the player what to do to complete the turn, and 

The notification area asks the current player to do two things: 

to press a button to get the points s/he will win for this round if successful, and
to enter a single letter guess.

After the current player makes the guess, his/her answer is reviewed to make sure its valid.

The player will only be guessing consonants, so there are 26 - 5 or 19 letters available to guess before the puzzle is selected. Assume that there are x unique consonants in the selected puzzle. The users will have 19 - x letters available for play. After a letter is guessed, it is "retired" from the available pool of letters. Here are the reasons why an entry is invalid:

It's not a letter. No consequences, retry
it is already in the puzzle. No consequences, retry.
it has already been guessed. No consequences, retry
it is a vowel. No consequences, retry
it is not in the puzzle. Consequences, current player loses a turn.

if the answer is valid,  the user's score is updated, and s/he gets to have another turn.

If not, the game gives the user another attempt if retries are allowed. If retries are not allowed, the user loses his/her turn.

This continues until either there are no letters left, or the current player makes a mistake.

If there are no letters left, the current player wins the game.

If a mistake is made, the next player gets to have a turn.

When one of the players wins, the game will update the notification area to say who won, and will give the players a button to replay the game. 

In order to replay the game, the gameboard will select an new puzzle, 
which will reset both players' scores to zero, 
will zero out the retired letters collection.

