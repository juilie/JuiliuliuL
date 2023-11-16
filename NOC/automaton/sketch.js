let cells = [];
let CELL_SIZE = 1
let rows, cols, rowMult;
let nextGen, prevGen;
let bg;
let eraseGen = 200;


function neighborCount(pos) {
  let num = 0;

  // Check 8 neighbors
  // TODO: Account for edges
  cells[pos - 1] ? num++ : num += 0;
  cells[pos - 1 - cols] ? num++ : num += 0;
  cells[pos - 1 + cols] ? num++ : num += 0;

  cells[pos + 1] ? num++ : num += 0;
  cells[pos + 1 + cols] ? num++ : num += 0;
  cells[pos + 1 - cols] ? num++ : num += 0;

  cells[pos - cols] ? num++ : num += 0;
  cells[pos + cols] ? num++ : num += 0;

  return num
}

function addArray(val, index) {
  return val + nextGen[index];
}

function removeNegValue(val) {
  return val <= 0 ? 0 : val
}

function inkSpot(pos) {
  return neighborCount(pos) == 3;
}

function preload() {
  bg = loadImage("./coverTest.jpg")
}

function setup() {
  createCanvas(1000, 1000);
  pixelDensity(1)
  background("black");

  for (let i = 0; i < floor(height / CELL_SIZE) * floor(width / CELL_SIZE); i++) {

    // starts the initial cells in the center area
    i > 1000 && i < 3000 ? cells[i] = floor(random(0, 2)) : cells[i] = 0;

  }
  nextGen = cells.slice(0)
  rows = floor(width / CELL_SIZE)
  // used to optimize because multiplication is faster than dividing by rows
  rowMult = 1 / rows
  cols = floor(height / CELL_SIZE)
}

let x, y;
let i = 0


function draw() {
  // background("#00000004")
  // background(bg)
  fill('#11bb1111');
  // fill('black');
  // prevGen = cells.slice(0);
  cells = cells.map(addArray);
  nextGen = nextGen.map(removeNegValue);

  for (let i = 0; i < cells.length; i++) {
    if (cells[i] >= 1 && cells[i] <= 2) {
      x = i % rows;
      y = (i - x) * rowMult;
      stroke('#00ff00ff')
      strokeWeight(.3)
      rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE)
      // ellipse(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE)
    }
    if (cells[i] == 0 && inkSpot(i)) {
      nextGen[i] = 1;
    }

    if (cells[i] > eraseGen) {
      x = i % rows;
      y = (i - x) * rowMult;
      // stroke(col.r,col.g,col.b)
      stroke('black')
      strokeWeight(1)
      rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE)
      nextGen[i] = -1*cells[i];
    }
  }
}