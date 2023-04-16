function preload() {}

let ribbons = []
let dimension = 15;
let images = ['./Embroidery/vert/1.png','./Embroidery/vert/2.png','./Embroidery/vert/3.png','./Embroidery/vert/blue.png']

function setup() {
  createCanvas(innerWidth, innerHeight);
  background('black');
  // noiseDetail(8, 0.4)


  for (let i = 0; i < 100; i++) {
    ribbons[i] = new ribbon(images[floor(random(0,4))], random(0,100), random(0, width));
  }
}

function draw() {
  // background(220, 5);

  for (let i = 0; i < ribbons.length; i++) {
    ribbons[i].update()
  }
}

class ribbon {
  constructor(imageChoice, seed, xStart) {
    this.y = -2500;
    this.x = xStart;
    this.xStart = xStart;
    this.increment = seed;
    this.img = loadImage(imageChoice);
    this.dimension = random(5,30);
  }

  update() {
    // push();
    imageMode(CENTER);
    // rotate(radians(90));
   
    image(this.img, this.x, this.y, this.dimension, this.dimension);
    this.y += this.dimension;
    this.x = map(noise(this.increment), 0, 1, this.xStart-100, this.xStart+100);
    this.increment += 0.01;
    // pop();
  }
}