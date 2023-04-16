function preload() {}

let ribbons = []
let dimension = 30;
let images;
let renderer
var lines;

function preload() {
  images = [loadImage('./Embroidery/blue.png'), loadImage('./Embroidery/emb3white2.png'), loadImage('./Embroidery/ukraine1.png')];
}

function setup() {
  frameRate(60)
  renderer = createCanvas(innerWidth, innerHeight);
  // background(220);
  // renderer.drawingContext.disable(renderer.drawingContext.DEPTH_TEST);

  // const lines = ceil(height / dimension);
  lines = 10000;

  // for (let i = 0; i < lines; i++) {
  //   ribbons[i] = new ribbon(i);
  // }

  // console.log("loops finished");
  // translate
  noiseDetail(6)
  for (let i = 0; i < 1; i++) {
    ribbons[i] = new ribbon(images[floor(random(0,4))], random(0,100), random(0, height));
  }

}

var counter=0
var increment = 2

function draw() {
  for (let i = 0; i < ribbons.length; i++) {
    ribbons[i].update()
  }
}



class ribbon {
  constructor(num) {
    this.x = 0;
    this.y = random(0, height);
    this.increment = 1;
    // this.increment = num % 2 ? -1 * dimension : dimension;
    this.img = images[floor(random(0, images.length))]
    this.modifier = num % 2;
    this.num = num;
  }

  update() {

    this.x += this.increment;
    let c = this.img.get(this.increment % this.img.width, 0, this.increment, this.img.height);
    image(c, this.increment, this.y + map(noise(this.increment/800),0, 1, 0, 500), 1);

    this.x += this.increment;
    this.y = map(noise(this.increment), 0, 1, this.yStart-100, this.yStart+100);
    this.increment += 1;
  }
}