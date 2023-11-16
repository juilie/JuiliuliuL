const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(220);
}

function draw() {
  let mouse = createVector(mouseX, mouseY)
  let pos = createVector(CANVAS_WIDTH*.5,CANVAS_HEIGHT*.5)
  let v = p5.Vector.sub(mouse, pos);

  line(CANVAS_WIDTH*.5, CANVAS_HEIGHT*.5, v.x, v.y);
}
