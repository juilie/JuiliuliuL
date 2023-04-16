function preload() {}

let ribbons = []
let dimension = 30;
let images;
let renderer
var lines;


function setup() {
  frameRate(30)
  renderer = createCanvas(innerWidth, innerHeight, WEBGL);
  background(220);
  renderer.drawingContext.disable(renderer.drawingContext.DEPTH_TEST);

  // const lines = ceil(height / dimension);
  lines = 10000;

  for (let i = 0; i < lines; i++) {
    ribbons[i] = new ribbon(i);
  }

  // console.log("loops finished");
}

function preload() {
  images = [loadImage('./Embroidery/blue.png'), loadImage('./Embroidery/emb3white2.png'), loadImage('./Embroidery/ukraine1.png')]
}

function draw() {
  // console.log("draw started")
  background(0, 0, 0, 200);

  for (let i = 0; i < ribbons.length; i++) {
    ribbons[i].update()
  }
  // translate(width / 2, height / 2, 1000);

}



class ribbon {
  constructor(num) {
    this.x = map(num, 0, lines, 0, width);
    this.y = 20 * (num % (ceil(height/dimension)));
    this.increment = 1;
    // this.increment = num % 2 ? -1 * dimension : dimension;
    this.img = images[floor(random(0, images.length))]
    this.modifier = num % 2;
    this.num = num;
  }

  update() {
    // translate(width / 2, height / 2);
    rotate(map(sin(frameCount), -1, 1, 0, 359));

    image(this.img, this.x, this.y, dimension, dimension);
    // this.x += this.increment;

    // if (this.x < 0 && this.modifier) {
    //   this.increment *= -1;
    //   this.modifier = 0;
    // } else if (this.x > width) {
    //   this.increment *= -1;
    //   this.modifier = 1;
    // }
  }
}