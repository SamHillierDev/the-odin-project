import { MESSAGES } from "./constants.js";

export function createButton(text, id = null, onClick = null) {
  const button = document.createElement("button");
  button.textContent = text;
  if (id) button.id = id;
  if (onClick) button.addEventListener("click", onClick);
  return button;
}

export function getComputerChoice(choices) {
  return choices[Math.floor(Math.random() * choices.length)];
}

export function addMessagesToContainer(container, messages) {
  messages.forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    container.appendChild(p);
  });
}

export function addResetProgressButton(container, resetCallback) {
  if (localStorage.getItem("stats")) {
    const resetButton = createButton(
      MESSAGES.resetProgress,
      null,
      resetCallback
    );
    container.appendChild(resetButton);
  }
}

export function saveGameStats(gameStats) {
  localStorage.setItem("stats", JSON.stringify(gameStats));
}

export function loadGameStats() {
  const savedWins = localStorage.getItem("stats");
  return savedWins ? JSON.parse(savedWins) : { player: 0, computer: 0 };
}

export function getGameStatsMessage(messages, gameStats) {
  return `${messages.gameTotalWins(
    gameStats.player
  )} ${messages.gameTotalLosses(gameStats.computer)}`;
}
