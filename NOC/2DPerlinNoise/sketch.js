function setup() {
  createCanvas(innerWidth, 500);
  background(50);
  x = innerWidth / 2;
  y = innerHeight / 2;
  pixelDensity(1);
  // frameRate(240);
}
let randomNumber
let STROKE_WEIGHT = 2
let STROKE_COLOR = [255, 255, 255, 255]
let increment = 0.006
let timer = 0;

function draw() {
  var yoff = 0 + timer/2;

  loadPixels();
  for (let y = 0; y < height; y++) {
    var  xoff = 0+timer;
    for (let x = 0; x < width; x++) {
      var index = (x + y * width) * 4;
      var noiseVal = noise(xoff, yoff) * 255

      pixels[index] = noiseVal;
      pixels[index + 1] = noiseVal;
      pixels[index + 2] = 255;
      pixels[index + 3] = 255;
      xoff += increment;
    }
    yoff += increment;
  }
  updatePixels();
  timer+= .005;

}