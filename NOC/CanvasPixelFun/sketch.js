function setup() {
  createCanvas(innerWidth, innerHeight);
  background(50);
  x = innerWidth / 2;
  y = innerHeight / 2;
  pixelDensity(1);
}
let randomNumber
let STROKE_WEIGHT = 2
let STROKE_COLOR = [255, 255, 255, 255]
let increment = 0.1

function draw() {
  let yoff = 0;
  let xoff = 0;
  loadPixels();
  for (let y = 0; y < height; y++) {
    xoff = 0;
    for (let x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      var rand = random(0, 255);

      pixels[index] = rand;
      pixels[index + 1] = rand;
      pixels[index + 2] = rand;
      pixels[index + 3] = 255;
      x += increment;

    }
    yoff += increment;
  }
  updatePixels();
}