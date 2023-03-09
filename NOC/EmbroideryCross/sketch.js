function preload() {}

let ribbons = []
let dimension = 15;
let images = ['./Embroidery/ukraine1.png','./Embroidery/embroider2.png', './Embroidery/emb3.png', './Embroidery/blue.png']

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  // noiseDetail(8, 0.4)


  for (let i = 0; i < 100; i++) {
    ribbons[i] = new ribbon(images[floor(random(0,4))], random(0,100), random(0, height));
  }
}

function draw() {
  // background(220, 5);

  for (let i = 0; i < ribbons.length; i++) {
    ribbons[i].update()
  }
}

class ribbon {
  constructor(imageChoice, seed, yStart) {
    this.x = -2500;
    this.y = yStart;
    this.yStart = yStart;
    this.increment = seed;
    this.img = loadImage(imageChoice);
    this.dimension = random(5,30);
  }

  update() {
    // push();
    imageMode(CENTER);
    // rotate(radians(90));
   
    image(this.img, this.x, this.y, this.dimension, this.dimension);
    this.x += this.dimension;
    this.y = map(noise(this.increment), 0, 1, this.yStart-100, this.yStart+100);
    this.increment += 0.01;
    // pop();
  }


}