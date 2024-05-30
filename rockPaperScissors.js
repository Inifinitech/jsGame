function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection, computerSelection) {
    const player = playerSelection.toLowerCase();
    if (player === computerSelection) {
        return "It's a tie!";
    } else if (
        (player === "paper" && computerSelection === "scissors") ||
        (player === "scissors" && computerSelection === "rock") ||
        (player === "rock" && computerSelection === "paper")
    ) {
        return "Try again. Computer wins!";
    } else {
        return "Winner! Claim your prize!";
    }
}

function handleClick(event) {
    const playerSelection = event.target.id;
    const computerSelection = getComputerChoice();
    const result = playRound(playerSelection, computerSelection);
    alert(result);
}

document.getElementById("rock").addEventListener("click", handleClick);
document.getElementById("scissors").addEventListener("click", handleClick);
document.getElementById("paper").addEventListener("click", handleClick);
