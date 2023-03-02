let images = ['./Embroidery/ukraine1.png','./Embroidery/embroider2white.png', './Embroidery/emb3white2.png']

let dimension = 15;

let x = 0
let rotation = 0

let BORDER_WIDTH = 100;
// let divTest = document.querySelector("#myDiv");
// let colorList = ['#11393B', '#194431', '#89B173', '#F0E6AB', '#F0D17F'];
let colorList = ['#8C5C40', '#4D4E3E', '#5C7B78', '#63A7A6', '#5CB9AD'];

let test = [];

function setup() {
  // var myCanvas = createCanvas(innerHeight, innerWidth);
  // myCanvas.parent("myDiv")
  // frameRate(20)
  createCanvas(500, 500);

  background(0,0,0,0);

  for (let i = 0; i < 10; i++) {
    test[i] = new snake(floor(random(0,4)), random(0, 100), colorList[floor(random(0, 5))], images[floor(random(0,3))]);
  }
  x = 0
  noiseDetail(8, .6)

  imageMode(CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  for (let i = 0; i < test.length; i++) {
    test[i].update();
  }
}


class snake {
  constructor(direction, seed, color, image) {
    this.directions = ["RIGHT", "DOWN", "LEFT", "UP"];

    this.noiseIncrement = seed;
    this.bendTime = noise(seed) * BORDER_WIDTH;
    this.direction = direction;
    this.seed = seed
    this.color = color;
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
        fill(this.color);
        image(this.img, this.x, this.y, this.radius, this.radius);

        if (this.x > (width - BORDER_WIDTH + this.bendTime - this.radius)) {
          this.y--;
          this.direction = (this.direction + 1) % 4;
          this.noiseIncrement = this.seed;
        }
        break;

      case "DOWN":
        fill(this.color);
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

        if (this.y > (width - BORDER_WIDTH + this.bendTime - this.radius)) {
          this.x--;
          this.direction = (this.direction + 1) % 4;
          this.noiseIncrement = this.seed;
        }
        break;

      case "LEFT":
        fill(this.color);
        this.x -= this.radius;
        this.noiseIncrement += 0.01;
        this.y = noise(this.noiseIncrement + 0.01) * BORDER_WIDTH + width - BORDER_WIDTH;
        image(this.img, this.x, this.y, this.radius, this.radius);

        if (this.x < (this.bendTime + this.radius)) {
          this.y--;
          this.direction = (this.direction + 1) % 4;
          this.noiseIncrement = this.seed;
        }
        break;

      case "UP":
        fill(this.color);
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

// function draw() {
//   // background(220, 5);  

//   if (x * 50 >= width - 1000 && rotation <= 89) {
//     push();
//     // Translate to the origin of the shape
//     translate(x * 50, (height / 2));
//     // Rotate around the origin
//     rotate(rotation);
//     // Because we've translated to the origin, we draw the square at 0, 0
//     image(img, 0, 0, 50, 50);
//     // Restore the state saved with push();
//     pop();
//     rotation++
//   } else {
//     push();
//     // Translate to the origin of the shape
//     translate(x * 50, (height / 2));
//     // Rotate around the origin
//     rotate(rotation);
//     // Because we've translated to the origin, we draw the square at 0, 0
//     image(img, 0, 0, 50, 50);
//     // Restore the state saved with push();
//     pop();
//     x++
//     // rotation = 0
//   }
