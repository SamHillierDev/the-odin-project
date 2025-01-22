const gridContainer = document.querySelector(".grid");
const generateButton = document.getElementById("generate-grid");
const resetButton = document.getElementById("reset-grid");
const gridSizeInput = document.getElementById("grid-size");
const randomColorCheckbox = document.getElementById("random-color-checkbox");
const darkenCheckbox = document.getElementById("darken-checkbox");

let globalHue = 0;

randomColorCheckbox.addEventListener("change", () => {
  if (randomColorCheckbox.checked) {
    darkenCheckbox.checked = false;
  }
});

darkenCheckbox.addEventListener("change", () => {
  if (darkenCheckbox.checked) {
    randomColorCheckbox.checked = false;
  }
});

gridContainer.style.display = "grid";
gridContainer.style.width = "400px";
gridContainer.style.height = "400px";
gridContainer.style.borderRadius = "5px";
gridContainer.style.overflow = "hidden";

const colorPicker = document.getElementById("color-picker");

function applyColor(square) {
  if (randomColorCheckbox.checked) {
    globalHue = (globalHue + 30) % 360;
    square.style.backgroundColor = `hsl(${globalHue}, 100%, 50%)`;
  } else if (darkenCheckbox.checked) {
    let currentLevel = parseInt(square.dataset.darkenLevel);
    if (currentLevel < 10) {
      currentLevel++;
      square.dataset.darkenLevel = currentLevel.toString();
      const darkenPercentage = (10 - currentLevel) * 10;
      square.style.backgroundColor = `hsl(0, 0%, ${darkenPercentage}%)`;
    }
  } else {
    square.style.backgroundColor = colorPicker.value;
  }
  checkResetButtonState();
}

function createGrid(size) {
  gridContainer.innerHTML = "";

  const squareSize = 400 / size;
  gridContainer.style.gridTemplateColumns = `repeat(${size}, ${squareSize}px)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, ${squareSize}px)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.style.border = "1px solid lightgray";
    square.style.backgroundColor = "white";
    square.style.boxSizing = "border-box";
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    square.dataset.darkenLevel = "0";

    square.addEventListener("mouseover", () => applyColor(square));

    gridContainer.appendChild(square);
  }

  checkResetButtonState();
}

resetButton.addEventListener("click", () => {
  const squares = gridContainer.querySelectorAll("div");
  squares.forEach((square) => {
    square.style.backgroundColor = "white";
    square.dataset.darkenLevel = "0";
  });
  globalHue = 0;
  checkResetButtonState();
});

function checkResetButtonState() {
  const squares = gridContainer.querySelectorAll("div");
  const hasColoredSquares = Array.from(squares).some(
    (square) => square.style.backgroundColor !== "white"
  );
  resetButton.disabled = !hasColoredSquares;
}

createGrid(16);

generateButton.addEventListener("click", () => {
  generateGridFromInput();
});

gridSizeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateGridFromInput();
  }
});

function generateGridFromInput() {
  const gridSize = parseInt(gridSizeInput.value);

  if (gridSize >= 2 && gridSize <= 100) {
    globalHue = 0;
    createGrid(gridSize);
    document.getElementById("error").textContent = "";
  } else {
    document.getElementById("error").textContent =
      "Please enter a grid size between 2 and 100.";
  }
}
