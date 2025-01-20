const gridContainer = document.querySelector(".grid");
const generateButton = document.getElementById("generate-grid");
const resetButton = document.getElementById("reset-grid");
const gridSizeInput = document.getElementById("grid-size");

gridContainer.style.display = "grid";
gridContainer.style.width = "400px";
gridContainer.style.height = "400px";
gridContainer.style.borderRadius = "5px";
gridContainer.style.overflow = "hidden";

function createGrid(size) {
  gridContainer.innerHTML = "";

  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");

    square.style.border = "1px solid lightgray";
    square.style.backgroundColor = "white";
    square.style.boxSizing = "border-box";
    square.style.width = "100%";
    square.style.height = "100%";

    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = "black";
      checkResetButtonState();
    });

    gridContainer.appendChild(square);
  }

  checkResetButtonState();
}

resetButton.addEventListener("click", () => {
  const squares = gridContainer.querySelectorAll("div");
  squares.forEach((square) => {
    square.style.backgroundColor = "white";
  });
  checkResetButtonState();
});

function checkResetButtonState() {
  const squares = gridContainer.querySelectorAll("div");
  const hasBlackSquares = Array.from(squares).some(
    (square) => square.style.backgroundColor === "black"
  );
  resetButton.disabled = !hasBlackSquares;
}

createGrid(16);

const errorMessageDiv = document.getElementById("error");

generateButton.addEventListener("click", () => {
  const gridSize = parseInt(gridSizeInput.value);

  if (gridSize >= 2 && gridSize <= 100) {
    errorMessageDiv.textContent = "";
    createGrid(gridSize);
  } else {
    errorMessageDiv.textContent = "Please enter a grid size between 2 and 100.";
  }
});
