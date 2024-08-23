"use strict";
const tilesContainer = document.querySelector(".tiles-container");
const generateBtn = document.querySelector("#generateTiles");
const resetBtn = document.querySelector("#reset");

function generateNewColor() {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
}

function darkenColor(color, percentage) {
  const rgb = color.match(/\d+/g).map(Number);
  return `rgb(${rgb
    .map((value) => Math.floor(value * (1 - percentage)))
    .join(", ")})`;
}

function generateTiles(size) {
  tilesContainer.innerHTML = "";
  const tileSize = 100 / size;

  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("tile");
    div.style.width = `${tileSize}%`;
    div.style.height = `${tileSize}%`;
    div.style.backgroundColor = "white";

    let interactions = 0;

    div.addEventListener("mouseover", () => {
      interactions++;
      let newColor = generateNewColor();
      if (interactions <= 10) {
        newColor = darkenColor(newColor, 0.1 * interactions);
      } else {
        newColor = "rgb(0, 0, 0)";
      }
      div.style.backgroundColor = newColor;
    });

    tilesContainer.appendChild(div);
  }
}

function defaultTiles() {
  generateTiles(16);
}

defaultTiles();

generateBtn.addEventListener("click", () => {
  const input = parseInt(prompt("Please input your number"));
  if (!isNaN(input) && input > 0) {
    generateTiles(input);
  } else {
    alert("Please enter a valid positive number.");
  }
});

resetBtn.addEventListener("click", () => {
  tilesContainer.innerHTML = "";
  defaultTiles();
});
