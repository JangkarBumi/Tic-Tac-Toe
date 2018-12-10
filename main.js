let originalBoard;
const HUMAN_PLAYER_SYMBOL = 'X'
const AI_PLAYER_SYMBOL = 'O'

const winningMove = [
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]


const indvBox = document.querySelectorAll('.box')
//select all the box
playGame()


function playGame() {
    document.querySelector(".endgame").style.display = "none";
    originalBoard = Array.from(Array(9).keys());
//The code above will create an array of nine elements consisting number 0 to 8
    for( let i = 0;i<indvBox.length;i++) {
        indvBox[i].innerText = '';
        indvBox[i].style.removeProperty('background-color');
        indvBox[i].addEventListener('click', turnClick, false)
    }
}

function turnClick(box) {
    if (typeof originalBoard[box.target.id] === 'number') {
        turn(box.target.id, HUMAN_PLAYER_SYMBOL)
        //square.target.id is the id of the target (clicked) box
        //We call turn inside turnClick becase the turn function can be called either by the human or ai
        if (!checkTie()) turn(bestSpot(), AI_PLAYER_SYMBOL)
    }
}

function turn(squareId, player) {
    originalBoard[squareId] = player;
    // In this array, its going to show the player who just took a turn in that spot
    document.getElementById(squareId).innerText = player;
    // Updating the display so we can see where you just clicked
    let gameWon = checkWin(originalBoard, player)
    //passing the original board if there is winning combos
    if ( gameWon ) gameOver(gameWon)
}   


function checkWin ( board, player) {
//The reason why we have to pass the original board and not jsut reference the original board variable
//because later we will passing things that are not the original board
let plays = board.reduce((a, e, i) => 
//this line is just a fancy way to find all the places on the board  they have already been played in
//reduce method is going through every element of the board array and do something
//and going to return one single value
//the a is accumulator; the value that's going to give back at the end , and we are going to initialize the accumulator to an empty array
//the e is the element in the board array that we're going through 
//the i is the index
(e === player) ? a.concat(i) : a, []);
//concat just means we're gonna take the accumulator array and add the index to that array
//If element doesnt equal player then were just going to return the accumulator 
//So this is just a way to find every index that the player has played in
 let gameWon = null;
 //if nobody win gameWon will return null
for(let [index, win] of winningMove.entries()) {
//looping through winningMove array to check if there is a match
//winningMove.entries is just a way to get the index the win 
if (win.every(elem => plays.indexOf(elem )> -1)) {
//win.every means we're going to go through every element in the win 
//plays is the all the places that the player has played on the board 
//has the player play in every spot that counts as win
    gameWon = {index: index, player: player};
// index is which winning combo that make the player win, and who the player who win
    break;
   }
 }
    return gameWon
}

function gameOver(gameWon) {
    for (let index of winningMove[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == HUMAN_PLAYER_SYMBOL ? "blue" : "red";
    }
    //highlight the winning combos box
	for (var i = 0; i < indvBox.length; i++) {
		indvBox[i].removeEventListener('click', turnClick, false);
    }
    //remove the event listener if someone won
    declareWinner(gameWon.player == HUMAN_PLAYER_SYMBOL ? "You win!" : "You lose.");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
	return originalBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return emptySquares()[0];
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < indvBox.length; i++) {
			indvBox[i].style.backgroundColor = "green";
			indvBox[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}








/*Instead of looping to each .board child and add event listener to it using for loop
You can also use the following code using function(e)
function playGame () {
  const board = document.querySelector('.board')
  board.addEventListener('click', function(e) {
      e.target.innerHTML = currentTurn
      currentTurn = currentTurn === PLAYER_ONE_SYMBOL ? AI_PLAYER_SYMBOL : PLAYER_ONE_SYMBOL
  })
}
playGame()
*/

//Tutorial Source https://www.youtube.com/watch?v=P2TcQ3h0ipQ&t=1362s