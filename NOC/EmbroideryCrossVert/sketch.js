let ribbons = []
let song

class ribbon {
  constructor(imageChoice, seed, xStart, yStart) {
    this.y = yStart;
    this.x = xStart;
    this.xStart = xStart;
    this.increment = seed;
    this.img = loadImage(imageChoice);
    this.dimension = random(15, 100);
  }

  update() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.dimension, this.dimension);
    this.y += this.dimension;
    this.x = map(noise(this.increment), 0, 1, this.xStart - 100, this.xStart + 100);
    this.increment += 0.01;
  }
}
let images = ['./Embroidery/PCoTandyLogo.png','./Embroidery/PCoTandyLogo3.png']


  let yDelay = -2000;
  function setup() {
    createCanvas(innerWidth, innerHeight);
    background('black');
    // song = loadSound('./tandy.mp3');

    // for (let i = 0; i < 1000; i++) {
    //   ribbons[i] = new ribbon(images[floor(random(0, 2))], random(0, 100), random(0, width), yDelay);
    // }
    // frameRate(50)
  }

  function draw() {
    background("#0000000a")
    for (let i = 0; i < ribbons.length; i++) {
      ribbons[i].update();
    }
  }

// let tandySketch = new p5(embroideryCanvas, "embroidery");
