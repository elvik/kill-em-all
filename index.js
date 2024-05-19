let audioElement = null;

document.addEventListener("DOMContentLoaded", (event) => {
  audioElement = document.getElementById("audioElement");
});

const MAX_ROWS = 30;
const MAX_COLS = 20;
const SHIP_WIDTH = 5;
document.body.style.overflow = "hidden";

let score = 0;
const state = {
  shipPositionX: 3,
  bulletPositions: [],
  targets: [],
};

let spawnProbability = 0;

const SHIP = [
  [" ", " ", "x", " ", " "],
  [" ", "x", "x", "x", " "],
  [" ", "x", "x", "x", " "],
  ["x", "x", "x", "x", "x"],
  [" ", "x", "x", "x", " "],
];

const gameArea = document.getElementById("game_area");

function clear() {
  while (gameArea.firstChild) {
    gameArea.firstChild.remove();
  }
}

function drawShip(shipPositionX) {
  for (let i = 0; i < SHIP.length; i++) {
    const currentRow = gameArea.childNodes[MAX_ROWS - 1 - i];
    for (let j = 0; j < SHIP[0].length; j++) {
      if (SHIP[SHIP.length - i - 1][j] == "x")
        currentRow.childNodes[j + shipPositionX].classList.add("ship");
    }
  }
}

function drawBullets(bulletPositions) {
  for (let i = 0; i < bulletPositions.length; i++) {
    const bulletPosition = bulletPositions[i]; // { row: ..., col: ... }
    const rowElement = gameArea.childNodes[bulletPosition.row];
    rowElement.childNodes[bulletPosition.col].classList.add("bullet");
  }
}

function draw() {
  clear();
  for (let i = 0; i < MAX_ROWS; i++) {
    let row = document.createElement("div");
    row.className = "row";
    gameArea.appendChild(row);
    for (let j = 0; j < MAX_COLS; j++) {
      let col = document.createElement("div");
      col.className = "col";
      row.appendChild(col);
    }
  }
  drawShip(state.shipPositionX);
  drawBullets(state.bulletPositions);
  drawTarget();
}

function moveTargets() {
  for (let i = 0; i < state.targets.length; i++) {
    state.targets[i].row += 1;
    if (state.targets[i].row >= MAX_ROWS) {
      state.targets.splice(i, 1);
      i;
    }
  }
}

function spawnTarget() {
  const newTarget = {
    row: 0,
    col: Math.floor(2 + Math.random() * (MAX_COLS - 4)),
  };
  state.targets.push(newTarget);
}

function handleSpawning() {
  spawnProbability = 5;
  const randomNumber = Math.random() * 100;

  if (randomNumber < spawnProbability || state.targets.length == 0) {
    spawnTarget();
  }
}

function handleCollisions() {
  for (let i = 0; i < state.bulletPositions.length; i++) {
    const bulletPosition = state.bulletPositions[i];
    for (let k = 0; k < state.targets.length; k++) {
      const targetPosition = state.targets[k];

      if (
        bulletPosition.row == targetPosition.row &&
        bulletPosition.col == targetPosition.col
      ) {
        removeFromList(state.bulletPositions, bulletPosition);
        removeFromList(state.targets, targetPosition);
        document.getElementById("score").innerText = `Score: ${++score}`;
      }
    }
  }
}

function removeFromList(list, item) {
  const index = list.indexOf(item);
  if (index > -1) {
    list.splice(index, 1);
  }
}

function gameOver() {
  state.bulletPositions = [];
  state.targets = [];
  score = 0;
  audioElement.play();
  document.getElementById("score").innerText = `Score: ${0}`;
  document.getElementById("gameOver").style.display = "flex";
  clearInterval(gameIntervalId);
  keysPressed = {};
}

function handleShipCollision() {
  for (const target of state.targets) {
    for (let i = 0; i < SHIP.length; i++) {
      for (let j = 0; j < SHIP[0].length; j++) {
        if (
          SHIP[SHIP.length - i - 1][j] === "x" &&
          target.row === MAX_ROWS - SHIP.length + i &&
          target.col === state.shipPositionX + j
        ) {
          gameOver();
        }
      }
    }
  }
}

function drawTarget() {
  for (let i = 0; i < state.targets.length; i++) {
    const targetPosition = state.targets[i]; // { row: ..., col: ... }
    const rowElement = gameArea.childNodes[targetPosition.row];
    rowElement.childNodes[targetPosition.col].classList.add("target");
  }
}

let keysPressed = {};

document.addEventListener("keydown", function (event) {
  keysPressed[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  keysPressed[event.key] = false;
});

const gameLoop = function () {
  let bulletsToRemove = 0;
  for (let i = 0; i < state.bulletPositions.length; i++) {
    const bulletPosition = state.bulletPositions[i];
    bulletPosition.row = bulletPosition.row - 1;
    if (bulletPosition.row === -1) bulletsToRemove++;
  }
  handleCollisions();

  while (bulletsToRemove > 0) {
    state.bulletPositions.shift();
    bulletsToRemove--;
  }

  for (let i = 0; i < state.targets.length; i++) {
    const target = state.targets[i];
    target.row = target.row + 1;
    if (target.row === MAX_ROWS) gameOver();
  }

  handleSpawning();
  handleCollisions();
  handleShipCollision();
  spawnProbability += 0.2;

  if (
    keysPressed["ArrowRight"] &&
    state.shipPositionX < MAX_COLS - SHIP_WIDTH
  ) {
    state.shipPositionX++;
  }
  if (keysPressed["ArrowLeft"] && state.shipPositionX > 0) {
    state.shipPositionX--;
  }
  if (keysPressed[" "]) {
    keysPressed[" "] = false;
    state.bulletPositions.push({
      row: MAX_ROWS - SHIP.length - 1,
      col: state.shipPositionX + Math.floor(SHIP_WIDTH / 2),
    });
  }

  draw();
};

let gameIntervalId = null;

function start() {
  gameIntervalId = setInterval(gameLoop, 100);
  document.getElementById("score").innerText = `Score: ${++score}`;
  document.removeEventListener("keyup", start);
}

document.addEventListener("keyup", start);
