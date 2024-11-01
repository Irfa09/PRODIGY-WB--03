const board = document.getElementById('board');
const messageDisplay = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');
let cells = Array.from(document.querySelectorAll('.cell'));
let currentPlayer = 'X';
let gameState = Array(9).fill(null); // Tracks the state of the board

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle user clicks on the board
function handleClick(event) {
  const index = event.target.getAttribute('data-index');
  if (!gameState[index] && !checkWin()) {
    gameState[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    if (checkWin()) {
      messageDisplay.innerText = `${currentPlayer} wins!`;
    } else if (gameState.every(cell => cell !== null)) {
      messageDisplay.innerText = 'It\'s a draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Check for winning condition
function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

// Restart the game
function restartGame() {
  gameState.fill(null);
  cells.forEach(cell => {
    cell.innerText = '';
  });
  currentPlayer = 'X';
  messageDisplay.innerText = '';
}

// Add event listeners to cells and restart button
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartBtn.addEventListener('click', restartGame);
