function preload() {}

let ribbons = []
let dimension = 50;


function setup() {
  frameRate(30)
  createCanvas(innerWidth, innerHeight);
  background(220);

  const lines = ceil(height / dimension);

  for (let i = 0; i < lines; i++) {
    ribbons[i] = new ribbon(i);
  }
  // console.log("loops finished");
}

function draw() {
  // console.log("draw started")
  background(150,200,255, 30);

  for (let i = 0; i < ribbons.length; i++) {
    ribbons[i].update()
  }
}

class ribbon {
  constructor(num) {
    this.x = num % 2 ? width : 0;
    this.y = dimension * num;
    this.increment = num % 2 ? -1 * dimension : dimension;
    this.img = loadImage('./PCoTandyLogo.ico')
    this.modifier = num % 2;
  }

  update() {
    image(this.img, this.x, this.y, dimension, dimension);
    this.x += this.increment;

    if (this.x < 0 && this.modifier) {
      this.increment *= -1;
      this.modifier = 0;
    } else if (this.x > width) {
      this.increment *= -1;
      this.modifier = 1;
    }
  }

}