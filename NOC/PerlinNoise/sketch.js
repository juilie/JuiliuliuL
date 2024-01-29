let DIAMETER_SLIDER
var MULTIPLIER_SLIDER
var isMobile = screen.width <= 480;

function setup() {
  if(isMobile) {     
    pixelDensity(1);
}
  var canvas = createCanvas(Math.min(400, displayWidth), displayHeight/2);
  canvas.parent(document.querySelector("#canvas-wrapper"));

  DIAMETER_SLIDER = document.querySelector("#diameterSlider");
  MULTIPLIER_SLIDER = document.querySelector("#multiplierSlider");
}



yOffset = 0;
let diameter
let multiplier

function draw() {
  background(50)
  var y = map(noise(yOffset), 0, 1, 0, 400);
  yOffset += 0.01;

  diameter = DIAMETER_SLIDER.value;
  multiplier = map(MULTIPLIER_SLIDER.value, 1, 100, 0.1, 0.5);
  
  for (let i = 1; i < width / diameter; i++) {
    ellipse(i * diameter, map(noise(yOffset + i ** multiplier), 0, 1, 0, height), diameter)
  }
}