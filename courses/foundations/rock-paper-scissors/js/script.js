function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getValidPlayerChoice() {
  while (true) {
    let choice = prompt("Please enter rock, paper, or scissors:");
    if (choice === null) {
      console.log("Game cancelled by the user.");
      return null;
    }
    choice = choice.toLowerCase().trim();
    if (["rock", "paper", "scissors"].includes(choice)) {
      return choice;
    }
    console.log("Invalid choice. Try again.");
  }
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
  do {
    const scores = { player: 0, computer: 0 };
    while (scores.player < 5 && scores.computer < 5) {
      const playerSelection = getValidPlayerChoice();
      if (playerSelection === null) {
        console.log("Game ended early.");
        return;
      }
      const computerSelection = getComputerChoice();
      playRound(playerSelection, computerSelection, scores);
    }
    console.log(
      scores.player > scores.computer
        ? "Congratulations! You win the game!"
        : "Sorry, you lost the game. Better luck next time!"
    );
  } while (askToReplay());
}

function askToReplay() {
  const replay = prompt("Do you want to play again? (yes or no)").toLowerCase();
  return replay === "yes";
}

playGame();
