import { CHOICES, WIN_CONDITIONS, MESSAGES } from "./constants.js";

let scores = { player: 0, computer: 0 };

const messagesContainer = document.getElementById("messages");
const buttonSection = document.getElementById("buttons");

function logMessage(message) {
  console.log(message);
}

function createButton(text, id = null, onClick = null) {
  const button = document.createElement("button");
  button.textContent = text;
  if (id) button.id = id;
  if (onClick) button.addEventListener("click", onClick);
  return button;
}

function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function updateMessage({
  playerChoice,
  computerChoice,
  roundResult,
  scoreMessage,
  finalMessage,
}) {
  messagesContainer.replaceChildren();

  const messages = [
    MESSAGES.roundChoices(playerChoice, computerChoice),
    finalMessage || roundResult,
    scoreMessage,
  ];

  messages.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    messagesContainer.appendChild(p);
  });
}

function updateButtons(buttonConfig) {
  buttonSection.replaceChildren();
  buttonConfig.forEach(({ text, id, onClick }) => {
    buttonSection.appendChild(createButton(text, id, onClick));
  });
}

function resetGame() {
  scores = { player: 0, computer: 0 };
  updateButtons(
    CHOICES.map((choice) => ({
      text: choice.charAt(0).toUpperCase() + choice.slice(1),
      id: choice,
      onClick: () => playRound(choice),
    }))
  );
  messagesContainer.replaceChildren();
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  logMessage(MESSAGES.roundChoices(playerChoice, computerChoice));

  let roundResult;
  if (playerChoice === computerChoice) {
    roundResult = MESSAGES.roundTie;
  } else if (WIN_CONDITIONS[playerChoice] === computerChoice) {
    scores.player++;
    roundResult = MESSAGES.roundWin;
  } else {
    scores.computer++;
    roundResult = MESSAGES.roundLose;
  }

  logMessage(roundResult);

  const scoreMessage = MESSAGES.roundScore(scores.player, scores.computer);
  logMessage(scoreMessage);

  if (scores.player === 5 || scores.computer === 5) {
    const finalMessage =
      scores.player > scores.computer ? MESSAGES.gameWin : MESSAGES.gameLose;
    logMessage(finalMessage);

    updateMessage({
      playerChoice,
      computerChoice,
      roundResult,
      scoreMessage,
      finalMessage,
    });

    replaceButtonsForReplay();
  } else {
    updateMessage({
      playerChoice,
      computerChoice,
      roundResult,
      scoreMessage,
    });
  }
}

function replaceButtonsForReplay() {
  updateButtons([
    {
      text: MESSAGES.playAgain,
      onClick: resetGame,
    },
  ]);
}

resetGame();
