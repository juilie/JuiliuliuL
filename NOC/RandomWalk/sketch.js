function setup() {
  createCanvas(innerWidth, innerHeight);
  background(50);
  x = innerWidth/2;
  y = innerHeight/2;
}
let randomNumber
let STROKE_WEIGHT = 2
let STROKE_COLOR = [255,255,255,255]
function draw() {
  stroke(...STROKE_COLOR);
  strokeWeight(STROKE_WEIGHT);

  randomNumber = floor(random(4));

  switch (randomNumber) {
    case 0:
      x++;
      STROKE_COLOR[0]+=5;
      break;
    case 1:
      x--;
      STROKE_COLOR[1]+=5;
      break;
    case 2:
      y++;
      STROKE_COLOR[0]-=5;

      break;
    case 3:
      y--;
      STROKE_COLOR[1]-=5;
      break;
    default:
      break;
  }

  point(x,y);
}
