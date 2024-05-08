/*
let areaState = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

  let x = 5;
  let y = 0;

  let ship = [
    [0, 0, 1, 0, 0],
    [0, 1 ,1, 1, 0],
    [1, 1 ,1, 1, 1],
    [0, 1, 1, 1, 0]

];

function draw(array) {
    for (let i = 0; i < array.length; i++) {
      let row = document.createElement("div");
      row.className = "row";
      gameArea.appendChild(row);
      for (let j = 0; j < array[i].length; j++) {
        let col = document.createElement("div");
        col.className = "col";
        row.appendChild(col);
*/

const MAX_ROWS = 30;
const MAX_COLS = 20;
const SHIP_WIDTH = 5;

const state = {
  shipPositionX: 3,
  bulletPositions: [],
  targets: [],
};

const gameArea = document.getElementById("game_area");

function clear() {
  while (gameArea.firstChild) {
    gameArea.firstChild.remove();
  }
}

function drawShip(shipPositionX) {
  const lastRow = gameArea.childNodes[MAX_ROWS - 1];
  for (let i = 0; i < SHIP_WIDTH; i++) {
    lastRow.childNodes[i + shipPositionX].classList.add("ship");
  }
}

function drawBullets(bulletPositions) {
  // for (const bulletPosition of bulletPositions) {
  //   const targetRow = gameArea.childNodes[target.row];
  //   targetRow.childNodes[target.col].classList.add("target");
  // }
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
  const spawnProbability = 50;
  const randomNumber = (Math.random() * 100);

  if (randomNumber < spawnProbability) {
    spawnTarget();
  }
}

function handleCollisions() {
  for (let i = 0; i < state.bulletPositions.length; i++) {
    const bulletPosition = state.bulletPositions[i];
    for (let k = 0; k < state.targets.length; k++) {
      const targetPosition = state.targets[k];

      if (bulletPosition.row == targetPosition.row && bulletPosition.col == targetPosition.col) {
        removeFromList(state.bulletPositions, bulletPosition);
        removeFromList(state.targets, targetPosition);
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


function drawTarget() {
  for (let i = 0; i < state.targets.length; i++) {
    const targetPosition = state.targets[i]; // { row: ..., col: ... }
    const rowElement = gameArea.childNodes[targetPosition.row];
    rowElement.childNodes[targetPosition.col].classList.add("target");
  };
}
console.log(state.targets);



document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key === "ArrowRight") {
    if (state.shipPositionX < MAX_COLS - SHIP_WIDTH) {
      state.shipPositionX++;
      draw();
    }
  }

  if (key === "ArrowLeft") {
    if (state.shipPositionX > 0) {
      state.shipPositionX--;
      draw();
    }
  }

  if (key === " ") {
    state.bulletPositions.push({
      row: MAX_ROWS - 2, // Just above the ship
      col: state.shipPositionX + Math.floor(SHIP_WIDTH / 2), // Center of the ship
    });
    draw();
  }
});

setInterval(function () {
  console.log('total bullets', state.bulletPositions.length);

  for (let i = 0; i < state.bulletPositions.length; i++) {
    const bulletPosition = state.bulletPositions[i];
    bulletPosition.row = bulletPosition.row - 1;
  }
  handleCollisions();

  for (let i = 0; i < state.targets.length; i++) {
    const target = state.targets[i];
    target.row = target.row + 1;
  }
  handleSpawning();
  handleCollisions();


  state.bulletPositions = state.bulletPositions.filter(function (item) {
    if (item.row < 0) {
      return false;
    }
    return true;
  });

  draw();
}, 300);
