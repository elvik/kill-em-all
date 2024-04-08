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
const SHIP_WIDTH = 2;

const state = {
    shipPositionX: 3,
};

const gameArea = document.getElementById('game_area');

function clear() {
    while (gameArea.firstChild) {
        gameArea.firstChild.remove();
    }
}

function drawShip(shipPositionX) {
    const lastRow = gameArea.childNodes[MAX_ROWS - 1];
    for(let i = 0; i < SHIP_WIDTH; i++) {
        lastRow.childNodes[i + shipPositionX].classList.add('ship');
    }
}

function draw() {
    for (let i = 0; i < MAX_ROWS; i++) {
        let row = document.createElement("div");
        row.className = "row";
        gameArea.appendChild(row);
        for (let j = 0; j < MAX_COLS; j++) {
            let col = document.createElement("div");
            col.className = "col";
            row.appendChild(col);
            // if (array[i][j] !== 0) {
            //     col.style.backgroundColor = colors[array[i][j] - 1];
            // }
        }
    }
    drawShip(state.shipPositionX);
}


draw();

document.addEventListener("keydown", function (event) {
    const key = event.key;
    console.log("key", key);

if (key === "ArrowRight") {
    if (gameArea - getCurrentFigure()[0].length) {
      if (canPutFigure(areaState, getCurrentFigure(), x, y + 1)) {
        y = y + 1;

        redraw();
      }
    }
  }

  if (key === "ArrowLeft") {
    if (y > 0) {
      if (canPutFigure(areaState, getCurrentFigure(), x, y - 1)) {
        y = y - 1;

        redraw();