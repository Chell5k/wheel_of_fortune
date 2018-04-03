// console.log('linked');

/*******************************************************************/
//used var variable assignment to give gameState a global scope
var gameState = {
  "players": [{"name": null, "score": 0},{"name": null, score: 0}],
  "game_number": 0,
  "round_number": 0, //this includes each turn, even if the same player when more than once
  "current_player": 0, //this is the index into the player array. 0=>first player.
  "next_player": 1,
  "puzzle_size": 0,
  "points": 0, //for the current round
  "points_flag": null, //true if we are going to add points for this user's turn. Sometims they get to keep the turn, but without points
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
    gameState["players"][player]["score"] += score;
  },
  setPuzzleSize: function(size) {
    this.puzzle_size = size;
  },
  updatePuzzleSize: function(value) {
    this.puzzle_size += value* -1;
  },
getPuzzleSize: function () {
    return this.puzzle_size;
},
  getState: function() {
    return this.status;
  },
updateAfterGuess: function (points_flag, retry_flag) {
  this.points_flag = points_flag;
  this.retry_flag = retry_flag;
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
//"0": ["r","h","a","p","s","o","d","y"],
"0": ["m","o","n","s","t","e","r"],
"1": ["v","a","r","i","e","t","y"],
"2": ["j","o","u","r","n","e","y"]
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
'v':"active",
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
function updateGamePage(points_flag, retry_flag, message, position) {
  console.log('updateGamePage starting...');
  //if boolean points_flag is true, we will update three items on the gamae page page:
  //1. the current player's increased score,
  //2. the message
  //3. and we will reveal the correctly guessed letter.
  //if. points is NOT true, will will update just one item, i.e.,
  //1. the message.
  let curr_player;
  let curr_player_score;
  let curr_points;
  let curr_player_name;
  let newScore;
  let letters_remaining = null;
  let tempnum;

  curr_player = gameState.getCurrentPlayer();
  curr_player_name = gameState.getPlayerName(curr_player);

  if (points_flag) {
    //manipulate the player's score on the game page.

    //curr_player = gameState.getCurrentPlayer();
    curr_player_score = gameState.getCurrentPlayer(curr_player);
    curr_points = gameState.getPoints();
    //curr_player_name = gameState.getPlayerName(curr_player);
    console.log("updateGamePage: curr_player_score: ",curr_player_score);
    console.log("updateGamePage: curr_points: ", curr_points);
    console.log(`updateGamePage: We update player ${curr_player} score here...`);
    console.log(`updateGamePage: we update player ${curr_player} here by adding these points: `, curr_points);
    gameState.updatePlayerScore(curr_player, curr_points);
    tempnum = curr_player+1;
    $("#player_"+tempnum+"_score").text(curr_points+curr_player_score);

    //debugger;
    //reveal the hidden letter, using the "position" argument
    console.log('updateGamePage: Next, we reveal the previously hidden letter here.');


  }
 //here we update the message.
 console.log("updateGamePage: We update the message here. It will be: ", message);
 $('div.game_update h2').text(message+", "+curr_player_name+"!");
 console.log('updateGamePage: debugger on');
 //debugger;


 //here we will check for a win.
 letters_remaining = gameState.getPuzzleSize();
 if (letters_remaining === 0) {
    alert("You have won!!");
 // game status = game won;
 // reset();
 }
 else if ( retry_flag) {
  handleGuess();
  //or, set flag for fetchGuess to run.
 }
 else {
  gameState.switchPlayers();
  //spinFlag =false;
  console.log("updateGamePage: =====================================");
  console.log("updateGamePage: about to spin wheel.");
  spinWheel();
  //or, set flag for spinWheel
 }

  console.log('points_flag, message, position', points_flag, message, position);
  console.log('UpdateGamePage ending.');
} //end function

function resetGame (){
  console.log("resetGame in");

  console.log("resetGame out");
}

function endGame() {
  console.log("endGame in");
  console.log("endGame out");
}

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
  spinFlag = null;
  let value = null;

$('.game_wheel').one("click",function () {
 //$('.game_wheel').on('click', function() {
  let a = 0;
  let value = 0;
  a  = Math.random();
    if (a < .3) {
      a = .25;
    }
    if (a > .6) {
      a = .6;
    }
    value = Math.floor(a * 1000);
    gameState.updatePoints(value);
    console.log('spinWheel: This turn is worth '+value+' points.');
  //Display the points on the board.
  spinFlag = true;
  clearSpinChecker = setInterval(handleGuess, 1000);
  console.log('spinWheel: clearSpinChecker: ', clearSpinChecker);

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
    console.log("runPuzzle: =====================================");
    console.log("runPuzzle: About to spin wheel");
    spinWheel(); //sets spinflag and spinflag checker.
  console.log('runPuzzle ending');
}

function getPuzzle() {
  console.log('getPuzzle starting...');
  let lettersToGuess=0;
  //let puzzleMax=puzzles.length;
  let puzzleMax = 3; // MMR remove this hardcode.

  currentPuzzle = puzzles[puzzleCounter];
  let consonants='bcdfghjklmnpqrstvwxyz';
  let vowels= 'aeiou';
  let $puzzle_divs;
  console.log('Number of letters in currentPuzzle: ', currentPuzzle.length);

  //blankout the default letters on the gameboard. There are 8 divs.

$puzzle_divs  = $('.puzzle_wrapper > div');


  for (let i = 0; i < currentPuzzle.length; i++) {
    let j = currentPuzzle[i];
    $('.tiny_div'+i).text(j);
    letters[j] = "in_puzzle";
    if (vowels.indexOf(j) >= 0) {
      letters[j]="vowel";
    }
    if (consonants.indexOf(j) >= 0){
      console.log("Here is a consonant: ",j);
     $('.tiny_div'+i).css("color", "white");
      lettersToGuess++ ;
      //console.log('getPuzzle. degguer in i loop.');
      //debugger;
    }
  }

  //console.log('debugger in getPuzzle');
  //debugger;

  gameState.setPuzzleSize(lettersToGuess);
  if (puzzleCounter === puzzleMax) {puzzleCounter = 0;}
  console.log('getPuzzle ending.');
}
//From Peter: example of targetting one indiv idual div by unique classname
// function getOneSquare() {
//   console.log('hey from 4A!', $('.puzzle tiny_div1').innerText)
// }
// getOneSquare();

  /**************************************************************/

  function handleGuess () {
   console.log('handleGuess starting');
   console.log('handleguess: spinFlag: ', spinFlag);
   //check if the wheel was spun
  if (spinFlag ) {
    console.log('handleGuess: ok to proceed.')
    console.log('handleGuess: clearSpinChecker',clearSpinChecker);
    clearInterval(clearSpinChecker);

  //  console.log('handleGuess: Clearing more intervalsl, to be safe');

   // for (let i = (clearSpinChecker+4);  i >= 0; i--) {
    //  clearInterval(i);
    //}
   // spinFlag = false; //reset spinflag
    fetchGuess();
    //checkGuess();
    //checkForWin();
    }
  console.log('handleGuess: debugger on');
  //debugger;
  console.log('handleGuess out.');
}


  function fetchGuess () {
    // console.log("fetchGuess: in...");
    //retrieve the guess and stuff it into the guess array...
    //for testing purposes, set it to a fixed value.
    //let tempGuess = ["r", "r", "a", "b", "b","y"];
    // let tempGuess = ["r", "a", "y"];
    // currentGuess = tempGuess[tempCounter];
    // console.log("fetchGuess: out.");
    // tempCounter++;
    // console.log("debugger in fetchguess.");
    // console.log("fetchGuess: Array tempGuess:",tempGuess);
    // console.log("fetchGuess: tempCounter: ", tempCounter);
    // console.log("fetchGuess: Array currentGuess: ", currentGuess);
    // console.log("fetchGuess: out.");
  console.log('fetchGuess in');
  $('#guess').one('change', function(){
    console.log('in event handler for fetchGuess')
    currentGuess = $(this).val();
    console.log('fetchGuess: value of guess is: ', currentGuess);
    gotGuess = true;
    clearGuess = setInterval(checkGuess, 2000);
    console.log('fetchGuess: clearGuess for setInterval is: ', clearGuess)
    console.log('fetchGuess: out')
    });
  }
  /**************************************************************/
  function checkGuess() {
    console.log('checkGuess in');
    //Updated function to be called from setInterval.
    //Look for gotGuess flag = true. If not, return.
    if (!gotGuess) {
      console.log('checkGuess: did not find gotGuess flag... will retry.');
      return;
    }

    clearInterval(clearGuess);
    console.log('checkGuess: cleared setInterval with clearGuess of ', clearGuess);
    gotGuess = false;
    //let puzzle = puzzleAndLetters["puzzle"];
    //let letters = puzzleAndLetters["letters"];

    let guess = currentGuess[0];
    let position = currentPuzzle.indexOf(guess); // -1 => not in the puzzle. >= 0 means in the puzzle.
    let old_status = letters[guess]; // active, bad_guess, good_guess, in_puzzle, vowel.
    let new_status = old_status;
    let points_flag;
    let retry_flag; //boolean. Sometime the current person gets to go again.
    console.log('curentGuess: guess', guess);
    console.log('curentGuess: position ', position);
    console.log('curentGuess: old_status ', old_status);
    console.log ('Debugger in checkGuess');
      //debugger;

    // About the guess:
    // if it not in the puzzle and is a new guess (old_status is active, status becomes bad_guess.
    // No points awarded.
    //if it is in tne puzzle and wasn't guessed before (old_status = in_puzzle), this is a good_guess.
    //if it was already considered or ineligible no points, but player can try again.
    //These old statuses are: in_puzzle, bad_guess, vowel, good_guess.

    if (position === -1) {
          new_status = 'bad_guess';
          letters[guess] = new_status;
          points_flag = false;
          if (old_status === 'active') {
            message = "Sorry - not in the puzzle";
            retry_flag = false;
          }
          else {
            message = "This is a repeat guess --still not in the puzzle -- try again";
            retry_flag = true;
          }
    }
    //console.log('checkGuess: write messages before to updte gameState with puzzle size.');
    if (position >= 0) {
      switch (old_status) {
        case "in_puzzle":
          message = "Good guess"
          new_status = "good_guess";
          letters[guess] = new_status;
          points_flag = true;
          retry_flag = false;
          $('.tiny_div'+position).css("color", "black");
          gameState.updatePuzzleSize(1); //number of letters remaining by 1.
        break;
        case 'bad_guess':
          message = "This is a repeat -- and it is not in the puzzle";
          points_flag = false;
          retry_flag = true;
        break;
        case 'good_guess':
          message = "This letter was already successfully guessed -- try again";
          points_flag = false;
          retry_flag = true;
         break;
        case 'vowel':
          message = "No vowels for now -- try again";
          points_flag = false;
          retry_flag = true;
        break;
        default:
          message == "Well this is odd";
          points_flag = false;
          retry_flag = false;
      }
    }

    gameState.updateAfterGuess(points_flag, retry_flag);
    updateGamePage(points_flag, retry_flag, message, position);
    console.log('checkGuess: ',message);
    console.log('puzzleAndLetters, currentGuess, old_status, new_status, points_flag, retry_flag',
                 puzzleAndLetters, currentGuess, old_status, new_status, points_flag, retry_flag);
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
clearVal = setInterval(checkForNames, 2000);
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
  $('#player_1').html($name);
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
  $('#player_2').html($name);
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
let tempCounter = 0;
let currentPuzzle;
let puzzleCounter = 0;
let puzzleAndLetters = {};
// These allow us to proceed to the game page.
let gotPlayer1 = false;
let gotPlayer2 = false;

let showPuzzle = false; //flag
let clearPuzzleCheck = null;

let currentGuess = [];
let gotGuess = false;

let spinFlag = null;
let clearSpinChecker = null;

// let clearVal = null;

//------------------------------------------------------------------//
startGame();
console.log('ready function ends. ');
});

