export const CHOICES = ["rock", "paper", "scissors"];

export const WIN_CONDITIONS = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

export const MESSAGES = {
  roundChoices: (playerChoice, computerChoice) =>
    `You chose ${playerChoice}, computer chose ${computerChoice}.`,
  roundWin: "You won this round!",
  roundLose: "You lost this round!",
  roundTie: "It's a tie!",
  roundScore: (player, computer) =>
    `Score: Player ${player} - Computer ${computer}`,
  gameWin: "Congratulations! You won! 😀",
  gameLose: "Game over, you lost. Better luck next time! 😔",
  playAgain: "Play Again",
};
