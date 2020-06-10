const X_class = 'x';
const CIRCLE_class = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
let circleTurn;

startGame();
restartButton.addEventListener('click', startGame);
function startGame() {
	// body...
    circleTurn = false;
	cellElement.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true});
});
	setBoardHoverClass();
	winningMessageElement.classList.remove('show');
	cellElement.forEach(cell => {
		cell.classList.remove('x') || cell.classList.remove('circle');
	});
}

function handleClick(e) {
	const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_class : X_class;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)){
       winningMessageElement.classList.add('show');
       winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    else if (isDraw()){
    	winningMessageElement.classList.add('show');
    	winningMessageTextElement.innerText = 'Draw';
    }else {
    swapTurns();
    setBoardHoverClass();
    }
}

function placeMark(cell, currentClass){
	cell.classList.add(currentClass);
}

function swapTurns(){
	circleTurn = !circleTurn;
} 

function setBoardHoverClass() {
  board.classList.remove(X_class);
  board.classList.remove(CIRCLE_class);
  if (circleTurn) {
    board.classList.add(CIRCLE_class);
  } else {
    board.classList.add(X_class);
  }
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElement[index].classList.contains(currentClass);
		});
	});
}

function isDraw() {
  return [...cellElement].every(cell => {
    return cell.classList.contains(X_class) || cell.classList.contains(CIRCLE_class)
  })
}