const embroideryCanvas = (sketch) => {

  let ribbons = []
  let images = ['./Embroidery/vert/1.png', './Embroidery/vert/2.png', './Embroidery/vert/3.png', './Embroidery/vert/blue.png']

  sketch.setup = () => {
    sketch.createCanvas(innerWidth, innerHeight);
    sketch.background('black');

    for (let i = 0; i < 100; i++) {
      ribbons[i] = new ribbon(images[sketch.floor(sketch.random(0, 4))], sketch.random(0, 100), sketch.random(0, sketch.width));
    }
  }

  sketch.draw = () => {
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
      this.img = sketch.loadImage(imageChoice);
      this.dimension = sketch.random(5, 30);
    }

    update() {
      sketch.imageMode(sketch.CENTER);
      sketch.image(this.img, this.x, this.y, this.dimension, this.dimension);
      this.y += this.dimension;
      this.x = sketch.map(sketch.noise(this.increment), 0, 1, this.xStart - 100, this.xStart + 100);
      this.increment += 0.01;
    }
  }
}

new p5(embroideryCanvas, "embroidery");