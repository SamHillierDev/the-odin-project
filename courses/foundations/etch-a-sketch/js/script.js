const gridContainer = document.querySelector(".grid");

const gridSize = 16;

gridContainer.style.display = "grid";
gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

gridContainer.style.width = "400px";
gridContainer.style.height = "400px";

for (let i = 0; i < gridSize * gridSize; i++) {
  const square = document.createElement("div");
  square.style.border = "1px solid lightgray";
  square.style.backgroundColor = "white";
  square.style.width = "100%";
  square.style.height = "100%";

  square.addEventListener("mouseover", () => {
    square.style.backgroundColor = "black";
  });

  gridContainer.appendChild(square);
}
