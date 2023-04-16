yOffset = 0;
let diameter
let multiplier
let ribbons = []
var DIAMETER_SLIDER
var MULTIPLIER_SLIDER
var isMobile = screen.width <= 480;
var img;

let images = ['../EmbroideryCross/Embroidery/vert/1.png', '../EmbroideryCross/Embroidery/vert/2.png', '../EmbroideryCross/Embroidery/vert/3.png', '../EmbroideryCross/Embroidery/vert/blue.png']


function setup() {
  if (isMobile) {
    pixelDensity(1);
  }
  frameRate(30)
  let coverage = 0;

  createCanvas(innerWidth, innerHeight);

  for (let i = 0; coverage < width; i++) {
    var size = random(4, 30);
    ribbons[i] = new ribbon(random(0, width), size, random(0, 100));
    coverage += size *2;
  }

  // for (let i = 0; i < 100; i++) {
  //   ribbons[i] = new ribbon(random(0, width),random(10,30), random(0,1000));
  // }
  // DIAMETER_SLIDER = document.querySelector("#diameterSlider");
  // MULTIPLIER_SLIDER = document.querySelector("#multiplierSlider");
}

function preload() {
  img = loadImage("../EmbroideryCross/Embroidery/ukraine1.png")
}

function draw() {
  // background(0,0,0,5)
  background('black')
  yOffset += 0.005;

  for (let i = 0; i < ribbons.length; i++) {
    ribbons[i].update()
  }

}

class ribbon {
  constructor(start, size, noiseOffset) {
    this.img = img;
    this.diameter = size;
    this.startY = start
    this.img = loadImage(images[floor(random(0, images.length))]);
    this.multiplier = random(2, 10)
    this.move = random(80, 120)
    this.noiseOffset = noiseOffset;
  }

  update() {



    for (let i = 0; i < height / this.diameter; i++) {
      image(this.img, map(noise(yOffset + this.noiseOffset + i / this.move), 0, 1, -this.diameter * this.multiplier, this.diameter * this.multiplier) + this.startY, i * this.diameter, this.diameter, this.diameter)
    }


    // rect(0,0,100,100+yOffset*1000)
    // for (let i = 0; i < width/100; i++) {
    //   image(this.img,i*100,map(noise(yOffset + i/100), 0, 1, 0, this.diameter*20),100,100)

    // }
  }
}