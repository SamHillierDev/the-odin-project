function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getPlayerChoice() {
  let playerChoice = prompt("Please enter rock, paper, or scissors:");
  if (playerChoice === null) {
    console.log("Game cancelled by the user.");
    return null;
  }

  playerChoice = playerChoice.toLowerCase();
  while (!["rock", "paper", "scissors"].includes(playerChoice)) {
    playerChoice = prompt(
      "Invalid choice. Please enter rock, paper, or scissors:"
    );
    if (playerChoice === null) {
      console.log("Game cancelled by the user.");
      return null;
    }
    playerChoice = playerChoice.toLowerCase();
  }
  return playerChoice;
}

function playRound(playerChoice, computerChoice, scores) {
  console.log(`You chose ${playerChoice}, computer chose ${computerChoice}`);
  if (playerChoice === computerChoice) {
    console.log("It's a tie!");
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    scores.player++;
    console.log("You win this round!");
  } else {
    scores.computer++;
    console.log("You lose this round!");
  }
  console.log(`Score: Player ${scores.player} - Computer ${scores.computer}`);
}

function playGame() {
  const scores = { player: 0, computer: 0 };
  while (scores.player < 5 && scores.computer < 5) {
    const playerSelection = getPlayerChoice();
    if (playerSelection === null) {
      console.log("Game ended early.");
      return;
    }

    const computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection, scores);
  }
  if (scores.player > scores.computer) {
    console.log("Congratulations! You win the game!");
  } else {
    console.log("Sorry, you lost the game. Better luck next time!");
  }
}

playGame();
