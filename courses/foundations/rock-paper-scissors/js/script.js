import {
  createButton,
  getComputerChoice,
  addMessagesToContainer,
  addResetProgressButton,
  saveGameStats,
  loadGameStats,
  getGameStatsMessage,
} from "./utils.js";

import { CHOICES, WIN_CONDITIONS, MESSAGES } from "./constants.js";

let scores = { player: 0, computer: 0 };
let gameStats = loadGameStats();

const messagesContainer = document.getElementById("messages");
const buttonSection = document.getElementById("buttons");

function updateButtons(buttonConfig) {
  buttonSection.replaceChildren();
  buttonConfig.forEach(({ id, onClick, imgSrc, text }) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.id = id;
    button.onclick = onClick;

    if (imgSrc) {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = `${id.charAt(0).toUpperCase() + id.slice(1)}`;
      button.appendChild(img);
    } else if (text) {
      button.textContent = text;
      button.classList.add("text-button");
    }

    buttonSection.appendChild(button);
  });
}

function resetGame() {
  scores = { player: 0, computer: 0 };
  updateButtons(
    CHOICES.map((choice) => ({
      text: choice.charAt(0).toUpperCase() + choice.slice(1),
      id: choice,
      onClick: () => playRound(choice),
      imgSrc: `assets/images/${choice}.png`,
    }))
  );

  messagesContainer.replaceChildren();

  addMessagesToContainer(messagesContainer, [
    getGameStatsMessage(MESSAGES, gameStats),
  ]);

  addResetProgressButton(messagesContainer, resetProgress);
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
    getGameStatsMessage(MESSAGES, gameStats),
  ];

  addMessagesToContainer(messagesContainer, messages);

  addResetProgressButton(messagesContainer, resetProgress);
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice(CHOICES);

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

  const isGameOver = scores.player === 5 || scores.computer === 5;

  const scoreMessage = MESSAGES.roundScore(scores.player, scores.computer);

  if (isGameOver) {
    if (scores.player > scores.computer) {
      gameStats.player++;
    } else {
      gameStats.computer++;
    }

    saveGameStats(gameStats);

    const finalMessage =
      scores.player > scores.computer ? MESSAGES.gameWin : MESSAGES.gameLose;

    updateMessage({
      playerChoice,
      computerChoice,
      finalMessage,
      scoreMessage,
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

function resetProgress() {
  localStorage.removeItem("stats");
  gameStats = { player: 0, computer: 0 };
  resetGame();
}

resetGame();
