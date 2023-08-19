let images = ['./Embroidery/blue.png', './Embroidery/emb3White1.png', './Embroidery/ukraine1.png', './Embroidery/embroider2white.png' ]

let x = 0
let rotation = 0

let BORDER_WIDTH = 50;
// let divTest = document.querySelector("#mainDiv");

let embroidery = [];

function setup() {
  // var embroideryCanvas = createCanvas(innerHeight, innerWidth);
  // embroideryCanvas.parent("mainDiv")

  createCanvas(1200, 800);

  background(0,0,0,0);

  for (let i = 0; i < 20; i++) {
    embroidery[i] = new snake(floor(random(0,4)), random(0, 100), images[floor(random(0,3))]);
  }
  x = 0
  noiseDetail(8, .6)

  imageMode(CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);
  frameRate(50)
}

function draw() {
  for (let i = 0; i < embroidery.length; i++) {
    embroidery[i].update();
  }
}


class snake {
  constructor(direction, seed, image) {
    this.directions = ["RIGHT", "DOWN", "LEFT", "UP"];

    this.noiseIncrement = seed;
    this.bendTime = noise(seed) * BORDER_WIDTH;
    this.direction = direction;
    this.seed = seed
    this.radius = random(5, 15);
    this.img = loadImage(image);
    strokeWeight(0.5);

    switch (this.directions[this.direction]) {
      case "RIGHT":
        this.x = noise(seed) * BORDER_WIDTH;
        this.y = 0;
        break;
      case "LEFT":
        this.y = 0;
        this.x = width - noise(seed) * BORDER_WIDTH;
        break;
      case "UP":
        this.x = 0;
        this.y = height - noise(seed) * BORDER_WIDTH;
        break;
      case "DOWN":
        this.x = 0;
        this.y = noise(seed) * BORDER_WIDTH;;
        break;

      default:
        this.x = 0;
        this.y = 0;
    }

  }

  update() {
    switch (this.directions[this.direction]) {
      case "RIGHT":
        this.x += this.radius;
        this.noiseIncrement += 0.01;
        this.y = noise(this.noiseIncrement + 0.01) * BORDER_WIDTH;
        image(this.img, this.x, this.y, this.radius, this.radius);

        if (this.x > (width - BORDER_WIDTH + this.bendTime - this.radius)) {
          this.y--;
          this.direction = (this.direction + 1) % 4;
          this.noiseIncrement = this.seed;
        }
        break;

      case "DOWN":
        this.y += this.radius;
        this.noiseIncrement += 0.01;
        this.x = noise(this.noiseIncrement + 0.01) * BORDER_WIDTH + width - BORDER_WIDTH;
        push();
        // Translate to the origin of the shape
        translate(this.x, this.y);
        // Rotate around the origin
        rotate(90);
        // Because we've translated to the origin, we draw the square at 0, 0
        image(this.img, 0, 0, this.radius, this.radius);
        // Restore the state saved with push();
        pop();
        // image(this.img, this.x, this.y, this.radius, this.radius);

        if (this.y > (height - BORDER_WIDTH + this.bendTime - this.radius)) {
          this.x--;
          this.direction = (this.direction + 1) % 4;
          this.noiseIncrement = this.seed;
        }
        break;

      case "LEFT":
        this.x -= this.radius;
        this.noiseIncrement += 0.01;
        this.y = noise(this.noiseIncrement + 0.01) * BORDER_WIDTH + height - BORDER_WIDTH;
        image(this.img, this.x, this.y, this.radius, this.radius);

        if (this.x < (this.bendTime + this.radius)) {
          this.y--;
          this.direction = (this.direction + 1) % 4;
          this.noiseIncrement = this.seed;
        }
        break;

      case "UP":
        this.y -= this.radius;
        this.x = noise(this.noiseIncrement) * BORDER_WIDTH;
        this.noiseIncrement += 0.01;

        push();
        // Translate to the origin of the shape
        translate(this.x, this.y);
        // Rotate around the origin
        rotate(90);
        // Because we've translated to the origin, we draw the square at 0, 0
        image(this.img, 0, 0, this.radius, this.radius);
        // Restore the state saved with push();
        pop();
        // image(this.img, this.x, this.y, this.radius, this.radius);

        if (this.y < (0 + this.bendTime + this.radius)) {
          this.x++;
          this.direction = (this.direction + 1) % 4;
          this.noiseIncrement = this.seed;
        }
        break;

      default:
        break;
    }
  }
}
