// Random Cloud Walk

let x, y, RANDOM_COORDS;
let RANDOM_DIRECTION;
let STROKE_COLOR = [255];
let CLOUD_SIZE = 100;
let BORDER_ALLOWANCE;
let EXTRA_WIDTH = 30;
let STEP_DISTANCE = 10;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(100, 200, 255);

  RANDOM_COORDS = [map(random(), 0, 1, 0, width), map(random(), 0, 1, 0, height)]
  x = RANDOM_COORDS[0];
  y = RANDOM_COORDS[1];


  setInterval(() => {
    RANDOM_COORDS = [map(random(), 0, 1, 0, width), map(random(), 0, 1, 0, height)]

    x = RANDOM_COORDS[0];
    y = RANDOM_COORDS[1];

    STROKE_COLOR = [255];
    CLOUD_SIZE = map(random(), 0, 1, 100, 150)

  }, 10000);
}

function draw() {

  STROKE_COLOR[0] = min(265, STROKE_COLOR[0]);
  stroke(...STROKE_COLOR);
  fill(...STROKE_COLOR)

  BORDER_ALLOWANCE = random(0, 10);
  RANDOM_DIRECTION = floor(random(4));

  switch (RANDOM_DIRECTION) {
    case 0:
      x >= RANDOM_COORDS[0] + CLOUD_SIZE + EXTRA_WIDTH ? x -= STEP_DISTANCE : x += STEP_DISTANCE + BORDER_ALLOWANCE;
      break;
    case 1:
      x <= RANDOM_COORDS[0] - CLOUD_SIZE - EXTRA_WIDTH ? x += STEP_DISTANCE : x -= STEP_DISTANCE + BORDER_ALLOWANCE;
      break;
    case 2:
      if (y >= RANDOM_COORDS[1] + CLOUD_SIZE) {
        y -= STEP_DISTANCE;
        STROKE_COLOR[0] += 5;

      } else {
        y += STEP_DISTANCE + BORDER_ALLOWANCE;
        STROKE_COLOR[0] -= 7;
      }

      break;
    case 3:
      if (y <= RANDOM_COORDS[1] - CLOUD_SIZE) {
        y += STEP_DISTANCE + BORDER_ALLOWANCE;
        STROKE_COLOR[0] -= 7;
      } else {
        y -= STEP_DISTANCE;
        STROKE_COLOR[0] += 5;
      }
      break;
    default:
      break;
  }

  ellipse(x, y, 40, 40);
}