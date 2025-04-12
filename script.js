const grid = document.getElementById('grid');
const status = document.getElementById('status');
let currentPlayer = 1;
const cols = 7;
const rows = 6;
const board = [];

for (let r = 0; r < rows; r++) {
  board[r] = [];
  for (let c = 0; c < cols; c++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = r;
    cell.dataset.col = c;
    grid.appendChild(cell);
    board[r][c] = 0;
  }
}

grid.addEventListener('click', (e) => {
  if (!e.target.classList.contains('cell')) return;
  const col = parseInt(e.target.dataset.col);
  for (let r = rows - 1; r >= 0; r--) {
    if (board[r][col] === 0) {
      board[r][col] = currentPlayer;
      const cell = [...document.querySelectorAll(`.cell[data-row="${r}"][data-col="${col}"]`)][0];
      cell.classList.add(`player${currentPlayer}`);
      if (checkWin(r, col)) {
        status.textContent = `Player ${currentPlayer} Wins!`;
        grid.style.pointerEvents = 'none';
      } else {
        currentPlayer = 3 - currentPlayer;
        status.textContent = `Player ${currentPlayer}'s Turn (${currentPlayer === 1 ? 'Blue' : 'Pink'})`;
      }
      break;
    }
  }
});

function checkWin(r, c) {
  return checkDirection(r, c, 1, 0) || // horizontal
         checkDirection(r, c, 0, 1) || // vertical
         checkDirection(r, c, 1, 1) || // diagonal /
         checkDirection(r, c, 1, -1);  // diagonal \
}

function checkDirection(r, c, dr, dc) {
  let count = 1;
  let i = 1;
  while (getCell(r + dr*i, c + dc*i) === currentPlayer) { count++; i++; }
  i = 1;
  while (getCell(r - dr*i, c - dc*i) === currentPlayer) { count++; i++; }
  return count >= 4;
}

function getCell(r, c) {
  return (r >= 0 && r < rows && c >= 0 && c < cols) ? board[r][c] : -1;
}

// Modal
document.getElementById('instructions-btn').onclick = () => {
  document.getElementById('instructions-modal').style.display = 'block';
};

document.getElementById('close-modal').onclick = () => {
  document.getElementById('instructions-modal').style.display = 'none';
};

window.onclick = (e) => {
  if (e.target === document.getElementById('instructions-modal')) {
    document.getElementById('instructions-modal').style.display = 'none';
  }
};
