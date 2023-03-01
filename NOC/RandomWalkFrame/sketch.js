let BORDER_WIDTH = 100;
// let divTest = document.querySelector("#myDiv");
let colorList = ['#11393B', '#194431', '#89B173', '#F0E6AB', '#F0D17F'];

let test = [];

function setup() {
  var myCanvas = createCanvas(500, 500);
  myCanvas.parent("myDiv")
  
  background(0,0,0,0);

  for (let i = 0; i < 10; i++) {
    test[i] = new snake(floor(random(0,4)), random(0, 100), colorList[floor(random(0, 5))]);
  }
  x = 0
  noiseDetail(8, .5)
}

function draw() {
  for (let i = 0; i < test.length; i++) {
    test[i].update();
  }
}


class snake {
  constructor(direction, seed, color) {
    this.directions = ["RIGHT", "DOWN", "LEFT", "UP"];

    this.noiseIncrement = seed;
    this.bendTime = noise(seed) * BORDER_WIDTH;
    this.direction = direction;
    this.seed = seed
    this.color = color;
    this.radius = random(5, 20);
    strokeWeight(0.5);

    switch (this.directions[this.direction]) {
      case "RIGHT":
        console.log("hello")
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
        this.x += 2;
        this.noiseIncrement += 0.01;
        this.y = noise(this.noiseIncrement + 0.01) * BORDER_WIDTH;
        fill(this.color);
        ellipse(this.x, this.y, this.radius);

        if (this.x > (width - BORDER_WIDTH + this.bendTime)) {
          this.y--;
          this.direction = (this.direction + 1) % 4;
          this.noiseIncrement = this.seed;
        }
        break;

      case "DOWN":
        fill(this.color);
        this.y += 2;
        this.noiseIncrement += 0.01;
        this.x = noise(this.noiseIncrement + 0.01) * BORDER_WIDTH + width - BORDER_WIDTH;
        ellipse(this.x, this.y, this.radius);

        if (this.y > (height - BORDER_WIDTH + this.bendTime)) {
          this.x--;
          this.direction = (this.direction + 1) % 4;
          this.noiseIncrement = this.seed;
        }
        break;

      case "LEFT":
        fill(this.color);
        this.x -= 2;
        this.noiseIncrement += 0.01;
        this.y = noise(this.noiseIncrement + 0.01) * BORDER_WIDTH + width - BORDER_WIDTH;
        ellipse(this.x, this.y, this.radius);

        if (this.x < (0 + BORDER_WIDTH - this.bendTime)) {
          this.y++;
          this.direction = (this.direction + 1) % 4;
          this.noiseIncrement = this.seed;
        }
        break;

      case "UP":
        fill(this.color);
        this.y -= 2;
        this.noiseIncrement += 0.01;
        this.x = noise(this.noiseIncrement + 0.01) * BORDER_WIDTH;
        ellipse(this.x, this.y, this.radius);

        if (this.y < (0 + BORDER_WIDTH - this.bendTime)) {
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