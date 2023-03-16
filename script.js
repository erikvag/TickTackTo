const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('game-status');
const xWins = document.getElementById('x-wins');
const oWins = document.getElementById('o-wins');
const draws = document.getElementById('draws');
const resetButton = document.getElementById('reset-button');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalButton = document.getElementById('modal-button');

let currentPlayer = 'X';
let gameOver = false;
let leaderboard = {
  X: 0,
  O: 0,
  Draw: 0
};

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

resetButton.addEventListener('click', () => {
  leaderboard = {
    X: 0,
    O: 0,
    Draw: 0
  };
  updateLeaderboard();
});

modalButton.addEventListener('click', () => {
  hideGameOverMessage();
  resetBoard();
});

function handleClick(e) {
  if (gameOver) {
    return;
  }

  const cell = e.target;
  cell.dataset.player = currentPlayer;

  if (checkWinner(currentPlayer)) {
    showGameOverMessage(`Player ${currentPlayer} has won!`);
    leaderboard[currentPlayer]++;
    updateLeaderboard();
    gameOver = true;
    return;
  }

  if (isDraw()) {
    showGameOverMessage('It\'s a draw!');
    leaderboard.Draw++;
    updateLeaderboard();
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameStatus.textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner(player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].dataset.player === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.dataset.player === 'X' || cell.dataset.player === 'O';
  });
}

function updateLeaderboard() {
  xWins.textContent = leaderboard.X;
  oWins.textContent = leaderboard.O;
  draws.textContent = leaderboard.Draw;
}

function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = '';
    delete cell.dataset.player;
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
  gameStatus.textContent = `Current Player: ${currentPlayer}`;
  gameOver = false;
}

function showGameOverMessage(message) {
  modalTitle.textContent = message;
  modal.classList.remove('hidden');
}

function hideGameOverMessage() {
  modal.classList.add('hidden');
}
