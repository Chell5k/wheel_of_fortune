// console.log('linked');

/*******************************************************************/
//used var variable assignment to give gameState a global scope
var gameState = {
  "players": [{"name": null, "score": 0},{"name": null, score: 0}],
  "game_number": 0,
  "round_number": 0, //this includes each turn, even if the same player when more than once
  "current_player": 0, //this is the index into the player array. 0=>first player.
  "next_player": 1,
  "points": 0, //for the current round
  "retry": null, // will be set to true or false after the current guess.
  "status": "initialized", /* running; win; reset; finished.*/
  updatePlayer: function (player, playerName) {
    gameState["players"][player]["name"] = playerName;
  },
  getPlayerName: function (player) {
    return gameState["players"][player]["name"];
  },
  getCurrentPlayer: function() {
    return this.current_player;
  },
  getPoints: function() {
    return this.points;
  },
  updatePoints: function(value) {
    this.points = value;
  },
  updatePlayerScore: function(player, score) {
    gameState[players][player][score] += score;
  },
  getState: function() {
    return this.status;
  },
updateAfterGuess: function (points, retry) {
  this.points = points;
  this.retry = retry;
},
  switchPlayers: function() {
    let temp = this.current_player;
    this.current_player = this.next_player;
    this.next_player = this.current_player;
    return this.current_player;
  },
};
/*******************************************************************/

$(document).ready(function() {
console.log('ready function starting...');

const puzzles = {
"0": ["r","a","p","s","o","d","y"],
"1": ["v","a","r","i","e","t","y"],
"2": ["b","u","z","z","a","r","d"]
};

const letters = {
'a':"active",
'b':"active",
'c':"active",
'd':"active",
'e':"active",
'f':"active",
'g':"active",
'h':"active",
'i':"active",
'j':"active",
'k':"active",
'l':"active",
'm':"active",
'n':"active",
'o':"active",
'p':"active",
'q':"active",
'r':"active",
's':"active",
't':"active",
'u':"active",
'w':"active",
'x':"active",
'y':"active",
'z':"active"
};

// class Player {
//   constructor  (init_name, init_score) {
//    this.player = init_name;
//    this.score = init_score;
//   }

//   updateName (init_name) {
//     this.name = init_name;
//   }
//   updateScore (init_score) {
//     this.score = init_score;
//   }
// }

// let player1 = new Player('noname', 0);
// let player2 = new Player('noname', 0);
// let allPlayers = {};

 /**************************************************************/
 /* Helper functions
  /**************************************************************/
function displayLandingPage () {
  console.log('displayLandingPage starting');
  $('.game_page').hide();
  console.log('displayLandingPage ending.');
}
/****************************************************************/
function showGamePage () {
  console.log('showGamePage starting...');
  //player is set tto whoever has the current turn. 0 or 1.
 // $('div.game_update > h2')
$('#startbutton').on('click', function() {
    $('.landing_page').fadeOut();
    $('.game_page').fadeIn();
});
console.log('showGamePage ending.');
}
/****************************************************************/
function updateGamePage(points, message, position) {
  console.log('updateGamePage starting...');
  //if boolean points is true, we will update three items on the gamae page page:
  //1. the current player's increased score,
  //2. the message
  //3. and we will reveal the correctly guessed letter.
  //if. points is NOT true, will will update just one item, i.e.,
  //1. the message.
  let current_player;
  let current_player_score;
  let current_points;
  if (points) {
    //manipulate the player's score on the game page.
    console.log(`We update player ${current_player} score here...`);
    current_player = gameState.getCurrentPlayer;
    current_player_score = gameState.getCurrentPlayer(current_player);
    current_points = gameState.getPoints;
    console.log(`we update player ${current_player} here by adding these points: `, current_points);

    //reveal the hidden letter, using the "position" argument
    console.log('Next, we reveal the previously hidden letter here.');
  }
 //here we update the message.
 console.log("We update the message here. It will be: ", message);

  console.log('points, message, position', points, message, position);
  console.log('UpdateGamePage ending.');
} //end function
/****************************************************************/
// initalizeGame goes the following:
//* shows the game page
//* clears scores
//* gets a new puzzle; resets the letter inventoru
//function initializeGame (puzzles, letters) {

//    return puzzleAndLetters;
//}
/****************************************************************/

// ***MMR*** Update spinWheel to use ternary operators
// spinWheel simulates random spinning of a wheel with varying
// points. The point value will be passed back to caller.
function spinWheel () {
  console.log('spinWheel starting...');

 $('.game_wheel').on('click', function() {
  let a = 0;
  let points = 0;
  a  = Math.random();
    if (a < .3) {
      a = .25;
    }
    if (a > .6) {
      a = .6;
    }
    points = Math.floor(a * 1000);
    gameState.updatePoints(points);
    console.log('This turn is worth '+points+' points.');
    return points;

  //Display the points on the board.

  });
  console.log('spinWheel ending');
}
/****************************************************************/
// //From Peter - using function expressions to hold values
// let pointsOkay = function spinWheel();
// // look at setinterval functions
//function hello() {
//   console.log('hello world')
// };
// setInterval(function(){hello()}, 3000);
// use the clearInterval method to stop the setInterval method
//getPuzzle does 2 things:
//1. Retrieves current puzzle. ***MMR*** ensure mechanism to cycle
//   through all puzzles.
//2. Synchs the puzzle to the letter inventory (puts the right starting
//   status on each letter
function runPuzzle() {
  console.log('runPuzzle starting...');
    getPuzzle();
    fetchGuess();
    checkGuess();
  console.log('runPuzzle ending');
}

function getPuzzle() {
  console.log('getPuzzle starting...');
  let puzzleMax=puzzles.length;
  currentPuzzle = puzzles[puzzleCounter];
  console.log('Number of letters in currentPuzzle: ', currentPuzzle.length);

  for (let i = 0; i < currentPuzzle.length; i++) {
   letters[currentPuzzle[i]] = "in_puzzle";
  }
  if (puzzleCounter === puzzleMax) {puzzleCounter = 0;}
  console.log('getPuzzle ending.');
}
//From Peter: example of targetting one individual div by unique classname
// function getOneSquare() {
//   console.log('hey from 4A!', $('.puzzle tiny_div1').innerText)
// }
// getOneSquare();

  /**************************************************************/
  function fetchGuess () {
    console.log("fetchGuess: in...");
    //retrieve the guess and stuff it into the guess array...
    //for testing purposes, set it to a fixed value.
    currentGuess = ["r"];
    console.log("fetchGuess: out.");
  }
  /**************************************************************/
  function checkGuess(puzzleAndLetters, currGuess) {
    console.log('checkGuess starting...');

    //let puzzle = puzzleAndLetters["puzzle"];
    //let letters = puzzleAndLetters["letters"];
    let guess = currentGuess[0];
    let position = puzzle.indexOf(guess); // -1 => not in the puzzle. >= 0 means in the puzzle.
    let old_status = letters[guess]; // active, bad_guess, good_guess, in_puzzle, vowel.
    let new_status = old_status;
    let points;
    let retry; //boolean. Sometime the current person gets to go again.

    debugger;

    // About the guess:
    // if it not in the puzzle and is a new guess (old_status is active, status becomes bad_guess.
    // No points awarded.
    //if it is in tne puzzle and wasn't guessed before (old_status = in_puzzle), this is a good_guess.
    //if it was already considered or ineligible no points, but player can try again.
    //These old statuses are: in_puzzle, bad_guess, vowel, good_guess.

    if (position === -1) {
          new_status = 'bad_guess';
          letters[guess] = new_status;
          message = "Sorry - not in the puzzle";
          points = false;
          retry = false;
    }

    if (position >= 0) {
      switch (old_status) {
        case "in_puzzle":
          message = "Good guess!"
          new_status = "good_guess";
          letters[guess] = new_status;
          points = true;
          retry = false;
        break;
        case 'bad_guess':
          message = "This is a repeat -- and it is not in the puzzle.";
          points = false;
          retry = true;
        break;
        case 'good guess':
          message = "This letter was already successfully guessed.";
          points = false;
          retry = true;
         break;
        case 'vowel':
          message = "No vowels for now.";
          points = false;
          retry = true;
        break;
        default:
          message == "Well this is odd.";
          points = false;
          retry = false;
      }
    }

    gameState.updateAfterGuess(points, retry);
    updateGamePage(message, points, position);
    console.log(message);
    console.log('puzzleAndLetters, currGuess, old_status, new_status, points, retry',
                 puzzleAndLetters, currGuess, old_status, new_status, points, retry);
    console.log('checkGuess finished.');
  }

// function checkForNames () {
//   console.log('checkForNames: in');
//  console.log('checkForNames: gamestate value:', gameState["players"][0]["name"]);
//  if (gameState["players"][0]["name"]) {gotPlayer1 = true;}
//  if (gameState["players"][1]["name"]) {gotPlayer2 = true;}
//   if ((gotPlayer1) && (gotPlayer2)) {
//     console.log('checkForNames: ok to proceed.')
//     clearInterval(clearVal);
//     showGamePage();
//   }
//   else {
//     return;
//   }
//   console.log('checkForNames: out.');
// }
// function () {

//   console.log('newPuzzleCheck: starting');
//   setInterval(checkforPuzzleCheck, 1000);
//   console.log('newPuzzle: ending');
// }

function startGame () {
console.log('startGame: in');
$('.game_page').hide();
readyPlayer1();
readyPlayer2();
console.log('startGame: gotPlayer1, gotPlayer2' , gotPlayer1, gotPlayer2);
showGamePage();
clearVal = setInterval(checkForNames, 1000);
console.log('startGame: out. clearVal: ', clearVal);
return 1;
}

function checkForNames () {
  console.log('checkForNames: in. clearVal: ', clearVal);
  if (gotPlayer1 && gotPlayer2 ) {
    console.log('checkForNames: ok to proceed.')
    clearInterval(clearVal);
    runPuzzle();
    //getPuzzle();
    console.log('checkForNames: out.');
    }
}

function readyPlayer1 () {
console.log('readyPlayer1 in');
$('#name1').on('change', function(){
  console.log('in event handler for player1')
  let $name = $(this).val();
  console.log('rp1 ', $name);
  gameState.updatePlayer(0, $name);
  console.log('gameState name value: ', gameState["players"][0]["name"]);
  //debugger;
    console.log($name);
  /*Update player name on gameboard*/
  $('#player_1').html($name+":");
  console.log('readyPlayer1 is set up');
  gotPlayer1 = true;
  return true;
  });
  console.log('readyPlayer1: we should never get here.');
}

function readyPlayer2 () {
  console.log('readyPlayer2 in');
  $('#name2').on('change', function(){
  console.log('in event handler for player2')
  let $name = $(this).val();
  gameState.updatePlayer(1, $name);
  console.log('gameState name value: ', gameState["players"][1]["name"]);
  console.log($name);
  $('#player_2').html($name+":");
    console.log('readyPlayer2 is set up');
  gotPlayer2 = true;
  return true;
  });
  console.log('readyPlayer1: we should never get here.');
}

function showGamePage () {
  console.log("showGamePage: in")
$('#startbutton').on('click', function() {

  $('.landing_page').fadeOut();
  $('.game_page').fadeIn();
  console.log("showGamePage: out");
});
}




  /**************************************************************/
//----------------------------------------------------------------//
//STARTPROGRAM: Program starts here...
//----------------------------------------------------------------//

let currentPuzzle;
let puzzleCounter = 0;
let puzzleAndLetters = {};
// These allow us to proceed to the game page.
let gotPlayer1 = false;
let gotPlayer2 = false;

let showPuzzle = false; //flag
let clearPuzzleCheck = null;

let currentGuess = [];

// let currGuess;
// let gotNames = false;
// let clearVal = null;

//------------------------------------------------------------------//
startGame();
//Check if we are ready to get a new puzzle.
//clearPuzzleCheck = setInterval(puzzleCheck, 1000);


// puzzleAndLetters = getPuzzle(puzzles, letters);
// spinWheel();
// currGuess = fetchGuess(puzzleAndLetters);
// checkGuess(puzzleAndLetters, currGuess);
// console.log('ready function ending.');




});

