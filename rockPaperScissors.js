// give computer random choices to choose from
// using a function
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
// make the return value be random
    return choices[randomIndex];
};
// make a function for the game
// it should contain 2 parameters
function playRound(playerSelection, computerSelection){
// convert player's entry to case insensitive
    const player =  playerSelection.toLowerCase();
    const computer = computerSelection;
// use if/else if/else to compare entries
    if (player === computer) {
        console.log("It's a tie!");
    }else if (
    (player === "paper" && computer === "scissors")||
    (player === "scissors" && computer === "rock")||
    (player === "rock" && computer === "paper")){
        console.log("Try again. Computer wins!");
    }else{
        console.log("Winner! Claim your prize!");
    }
}
// ask for player's entry
const playerSelection = prompt("Choose your lucky object: ");
// call the function for the computer's choice
const computerSelection = getComputerChoice();
// output player's selection
console.log("Players choice", playerSelection)
// output computer's selection
console.log("Computers choice", computerSelection)    
// call the game function
console.log(playRound(playerSelection, computerSelection));

