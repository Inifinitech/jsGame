// Variables for players
let player1 = "";
let player2 = "";
let isPlayingWithComputer = false;

// Function to start the game
function startGame() {
  // Get player names
  player1 = document.getElementById("one").value.trim();
  player2 = document.getElementById("two").value.trim();

  // Check if player names are entered
  if (player1) {
    if (!player2) {
      player2 = "Computer";
      isPlayingWithComputer = true;
    }

    // Open the dialog
    let dialogPop = document.getElementById("dialog");
    dialogPop.showModal();

    // Initialize the game
    initializeGame();
  } else {
    console.error("Please enter a name for Player 1");
    alert("Please enter a name for Player 1.");
  }
}

// Variables to select the cells
const cells = document.querySelectorAll(".cell");
// Variable to select the restart button
const restart = document.querySelector("#reset");
// Variable to select the status text
const statusText = document.querySelector("#statusText");
// Creating the winning conditions
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Variables to call an array of placeholders
let chance = ["", "", "", "", "", "", "", "", ""];
// Variable to keep track of the current player
let currentPlayer = "X";
// Variable to keep track if the game is running
let gameIsActive = false;

// Function to initialize the game
function initializeGame() {
  gameIsActive = true;
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  statusText.textContent = `${player1}'s turn (X)`;
  restart.addEventListener("click", restartOnceMore);
}

// Function to show that the cell is clicked
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (chance[cellIndex] !== "" || !gameIsActive) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();

  if (gameIsActive && isPlayingWithComputer && currentPlayer === "O") {
    setTimeout(computerPlay, 500); // Adding delay for computer's move
  }
}

// Function to display cell clicked
function updateCell(cell, cellIndex) {
  chance[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
}

// Function to change player
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer === "X" ? player1 : player2}'s turn (${currentPlayer})`;
}

// Function for computer to make a move
function computerPlay() {
  let availableCells = [];
  cells.forEach((cell, index) => {
    if (chance[index] === "") {
      availableCells.push(index);
    }
  });

  if (availableCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cellIndex = availableCells[randomIndex];
    const cell = cells[cellIndex];
    updateCell(cell, cellIndex);
    checkWinner();
  }
}

// Function to check the winner
function checkWinner() {
  let winnerRound = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cellA = chance[condition[0]];
    const cellB = chance[condition[1]];
    const cellC = chance[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      winnerRound = true;
      break;
    }
  }

  if (winnerRound) {
    statusText.textContent = `${currentPlayer === "X" ? player1 : player2} wins!`;
    gameIsActive = false;
  } else if (!chance.includes("")) {
    statusText.textContent = "Draw!";
    gameIsActive = false;
  } else {
    changePlayer();
  }
}

// Function to restart the game
function restartOnceMore() {
  chance = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameIsActive = true;
  statusText.textContent = `${player1}'s turn (X)`;
  cells.forEach((cell) => (cell.textContent = ""));
}

// Function to close dialog/close game
function iQuit() {
  restartOnceMore();
  gameIsActive = false;
  let dialogPop = document.getElementById("dialog");
  dialogPop.close();
}
