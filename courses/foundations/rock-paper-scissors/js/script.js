import { CHOICES, WIN_CONDITIONS, MESSAGES } from "./constants.js";

function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function getValidPlayerChoice() {
  while (true) {
    let choice = prompt(MESSAGES.choicePrompt);
    if (choice === null) {
      console.log(MESSAGES.gameCancelled);
      return null;
    }
    choice = choice.toLowerCase().trim();
    if (CHOICES.includes(choice)) {
      return choice;
    }
    console.log(MESSAGES.invalidChoice);
  }
}

function playRound(playerChoice, computerChoice, scores) {
  console.log(MESSAGES.playerComputerChoices(playerChoice, computerChoice));
  if (playerChoice === computerChoice) {
    console.log(MESSAGES.tieRound);
  } else if (WIN_CONDITIONS[playerChoice] === computerChoice) {
    scores.player++;
    console.log(MESSAGES.winRound);
  } else {
    scores.computer++;
    console.log(MESSAGES.loseRound);
  }
  console.log(MESSAGES.score(scores.player, scores.computer));
}

function playGame() {
  do {
    const scores = { player: 0, computer: 0 };
    while (scores.player < 5 && scores.computer < 5) {
      const playerSelection = getValidPlayerChoice();
      if (playerSelection === null) {
        console.log(MESSAGES.endEarly);
        return;
      }
      const computerSelection = getComputerChoice();
      playRound(playerSelection, computerSelection, scores);
    }
    console.log(
      scores.player > scores.computer ? MESSAGES.gameWin : MESSAGES.gameLose
    );
  } while (askToReplay());
}

function askToReplay() {
  const replay = prompt(MESSAGES.replayPrompt).toLowerCase();
  return replay === "yes";
}

playGame();
