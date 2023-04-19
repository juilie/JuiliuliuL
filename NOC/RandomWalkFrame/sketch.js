const one = (sketch) => {
  let BORDER_WIDTH = 50;
  let NUM_OF_SNAKES = 20;
  let colorList = ['#8C5C40', '#4D4E3E', '#5C7B78', '#63A7A6', '#5CB9AD'];
  let snakeArray = [];

  sketch.setup = () => {
    sketch.createCanvas(300, 300);
    sketch.background(100, 255, 100, 0);
    sketch.noiseDetail(8, .5)

    for (let i = 0; i < NUM_OF_SNAKES; i++) {
      var RANDOM_DIRECTION = sketch.floor(sketch.random(0, 4));
      var RANDOM_SEED = sketch.random(0, 100);
      var RANDOM_COLOR = colorList[sketch.floor(sketch.random(0, 5))];
      var RANDOM_SPEED = sketch.random(2, 3);
      i % 2 ? snakeArray[i] = new snake(RANDOM_DIRECTION, RANDOM_SEED, RANDOM_COLOR, RANDOM_SPEED) : snakeArray[i] = new snake(RANDOM_DIRECTION, RANDOM_SEED, RANDOM_COLOR, RANDOM_SPEED);
    }

  }

  sketch.draw = () => {
    for (let i = 0; i < snakeArray.length; i++) {
      snakeArray[i].update();
    }
  }
  class snake {
    constructor(direction, seed, color, speed) {
      this.directions = ["RIGHT", "DOWN", "LEFT", "UP"];
      this.noiseIncrement = seed;
      this.bendTime = sketch.noise(seed) * BORDER_WIDTH;
      this.direction = direction;
      this.seed = seed
      this.color = color;
      this.radius = sketch.random(2, 8);
      this.speed = 2;
      sketch.strokeWeight(0.5);

      switch (this.directions[this.direction]) {
        case "RIGHT":
          this.x = sketch.noise(seed) * BORDER_WIDTH;
          this.y = 0;
          break;
        case "LEFT":
          this.y = 0;
          this.x = sketch.width - sketch.noise(seed) * BORDER_WIDTH;
          break;
        case "UP":
          this.x = 0;
          this.y = sketch.height - sketch.noise(seed) * BORDER_WIDTH;
          break;
        case "DOWN":
          this.x = 0;
          this.y = sketch.noise(seed) * BORDER_WIDTH;;
          break;

        default:
          this.x = 0;
          this.y = 0;
      }

    }

    update() {
      switch (this.directions[this.direction]) {
        case "RIGHT":
          this.x += this.speed;
          this.noiseIncrement += 0.01;
          this.y = sketch.noise(this.noiseIncrement + 0.01) * BORDER_WIDTH;
          sketch.fill(this.color);
                sketch.strokeWeight(0.5);

          sketch.ellipse(this.x, this.y, this.radius);

          if (this.x > (sketch.width - BORDER_WIDTH + this.bendTime)) {
            this.y--;
            this.direction = (this.direction + 1) % 4;
            this.noiseIncrement = this.seed;
          }
          break;

        case "DOWN":
          sketch.fill(this.color);
                sketch.strokeWeight(0.5);

          this.y += this.speed;
          this.noiseIncrement += 0.01;
          this.x = sketch.noise(this.noiseIncrement + 0.01) * BORDER_WIDTH + sketch.width - BORDER_WIDTH;
          sketch.ellipse(this.x, this.y, this.radius);

          if (this.y > (sketch.height - BORDER_WIDTH + this.bendTime)) {
            this.x--;
            this.direction = (this.direction + 1) % 4;
            this.noiseIncrement = this.seed;
          }
          break;

        case "LEFT":
          sketch.fill(this.color);
                sketch.strokeWeight(0.5);

          this.x -= this.speed;
          this.noiseIncrement += 0.01;
          this.y = sketch.noise(this.noiseIncrement + 0.01) * BORDER_WIDTH + sketch.width - BORDER_WIDTH;
          sketch.ellipse(this.x, this.y, this.radius);

          if (this.x < this.bendTime + this.radius / 2) {
            this.y--;
            this.direction = (this.direction + 1) % 4;
            this.noiseIncrement = this.seed;
          }
          break;

        case "UP":
          sketch.fill(this.color);
                sketch.strokeWeight(0.5);

          this.y -= this.speed;
          this.x = sketch.noise(this.noiseIncrement) * BORDER_WIDTH;
          this.noiseIncrement += 0.01;
          sketch.ellipse(this.x, this.y, this.radius);

          if (this.y < (this.bendTime + this.radius / 2)) {
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

  class countersnake {
    constructor(direction, seed, color, speed) {
      this.directions = ["RIGHT", "UP", "LEFT", "DOWN"];
      this.noiseIncrement = seed;
      this.bendTime = sketch.noise(seed) * BORDER_WIDTH;
      this.direction = direction;
      this.seed = seed
      this.color = color;
      this.radius = sketch.random(3, 15);
      this.speed = 2;
      this.strokeWeight = 0.5
      sketch.strokeWeight(this.strokeWeight);

      switch (this.directions[this.direction]) {
        case "RIGHT":
          this.x = sketch.noise(seed) * BORDER_WIDTH;
          this.y = sketch.height;
          break;
        case "LEFT":
          this.y = 0;
          this.x = sketch.width - sketch.noise(seed) * BORDER_WIDTH;
          break;
        case "UP":
          this.x = 0;
          this.y = sketch.height - sketch.noise(seed) * BORDER_WIDTH;
          break;
        case "DOWN":
          this.x = 0;
          this.y = sketch.noise(seed) * BORDER_WIDTH;;
          break;

        default:
          this.x = 0;
          this.y = 0;
      }
    }

    update() {
      switch (this.directions[this.direction]) {
        case "RIGHT":
          this.x += this.speed;
          this.noiseIncrement += 0.01;
          this.y = sketch.noise(this.noiseIncrement + 0.01) * BORDER_WIDTH + sketch.height - BORDER_WIDTH;
          sketch.fill(this.color);
          sketch.strokeWeight(this.strokeWeight)
          
          sketch.ellipse(this.x, this.y, this.radius);

          if (this.x > (sketch.width - BORDER_WIDTH + this.bendTime)) {
            this.y--;
            this.direction = (this.direction + 1) % 4;
            this.noiseIncrement = this.seed;
            this.speed = 0;
            this.color = 'rgba(0,0,0,0)';
            this.strokeWeight = 0;

          }
          break;

        case "DOWN":
          sketch.fill(this.color);
          sketch.strokeWeight(this.strokeWeight)
          
          this.y += this.speed;
          this.noiseIncrement += 0.01;
          this.x = sketch.noise(this.noiseIncrement + 0.01) * BORDER_WIDTH;
          sketch.ellipse(this.x, this.y, this.radius);

          if (this.y > (sketch.height - BORDER_WIDTH + this.bendTime)) {
            this.x--;
            this.direction = (this.direction + 1) % 4;
            this.noiseIncrement = this.seed;
            this.speed = 0;
            this.color = 'rgba(0,0,0,0)';
            this.strokeWeight = 0;

          }
          break;

        case "LEFT":
          sketch.fill(this.color);
          sketch.strokeWeight(this.strokeWeight)
          
          this.x -= this.speed;
          this.noiseIncrement += 0.01;
          this.y = sketch.noise(this.noiseIncrement + 0.01) * BORDER_WIDTH;
          sketch.ellipse(this.x, this.y, this.radius);

          if (this.x < this.bendTime + this.radius / 2) {
            this.y--;
            this.direction = (this.direction + 1) % 4;
            this.noiseIncrement = this.seed;
            this.color = 'rgba(0,0,0,0)';
            this.strokeWeight = 0;
          }
          break;

        case "UP":
          sketch.fill(this.color);
          sketch.strokeWeight(this.strokeWeight)
          
          this.y -= this.speed;
          this.x = sketch.noise(this.noiseIncrement) * BORDER_WIDTH + sketch.width - BORDER_WIDTH;
          this.noiseIncrement += 0.01;
          sketch.ellipse(this.x, this.y, this.radius);

          if (this.y < (this.bendTime + this.radius / 2)) {
            this.x++;
            this.direction = (this.direction + 1) % 4;
            this.noiseIncrement = this.seed;
            this.speed = 0;
            this.color = 'rgba(0,0,0,0)';
            this.strokeWeight = 0;

          }
          break;

        default:
          break;
      }
    }
  }
}

new p5(one,'myDiv');
new p5(one, 'myDivTwo');
new p5(one, 'myDivThree');
new p5(one, 'myDivFour');
new p5(one, 'myDivFive');
new p5(one, 'myDivSix');
new p5(one, 'myDivSeven');
new p5(one, 'myDivEight');