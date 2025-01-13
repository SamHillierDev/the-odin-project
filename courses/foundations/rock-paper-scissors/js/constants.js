export const CHOICES = ["rock", "paper", "scissors"];

export const WIN_CONDITIONS = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

export const MESSAGES = {
  choicePrompt: "Please enter rock, paper, or scissors:",
  gameCancelled: "Game cancelled by the user.",
  invalidChoice: "Invalid choice. Try again.",
  tieRound: "It's a tie!",
  winRound: "You win this round!",
  loseRound: "You lose this round!",
  score: (player, computer) => `Score: Player ${player} - Computer ${computer}`,
  gameWin: "Congratulations! You win the game!",
  gameLose: "Sorry, you lost the game. Better luck next time!",
  endEarly: "Game ended early.",
  replayPrompt: "Do you want to play again? (yes or no)",
  playerComputerChoices: (playerChoice, computerChoice) =>
    `You chose ${playerChoice}, computer chose ${computerChoice}`,
};
