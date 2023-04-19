const embroideryCanvas = (sketch) => {
  let yOffset = 0;
  let ribbons = []
  var isMobile = screen.width <= 480;
  var img;

  let images = ['../EmbroideryCross/Embroidery/vert/1.png', '../EmbroideryCross/Embroidery/vert/2.png', '../EmbroideryCross/Embroidery/vert/3.png', '../EmbroideryCross/Embroidery/vert/blue.png']

  sketch.setup = () => {
    if (isMobile) {
      sketch.pixelDensity(1);
    }
    sketch.frameRate(60)
    let coverage = 0;

    sketch.createCanvas(innerWidth, innerHeight);

    for (let i = 0; coverage < sketch.width; i++) {
      var size = sketch.random(4, 30);
      ribbons[i] = new ribbon(sketch.random(0, sketch.width), size, sketch.random(0, 100));
      coverage += size / 2;
    }
  }

  sketch.preload = () => {
    img = sketch.loadImage("../EmbroideryCross/Embroidery/ukraine1.png")
  }

  sketch.draw = () => {
    sketch.background('black')
    yOffset += 0.005;

    for (let i = 0; i < ribbons.length; i++) {
      ribbons[i].update()
    }

    sketch.noStroke()
    sketch.fill('black')
  }

  class ribbon {
    constructor(start, size, noiseOffset) {
      this.img = img;
      this.diameter = size;
      this.startY = start
      this.img = sketch.loadImage(images[sketch.floor(sketch.random(0, images.length))]);
      this.multiplier = sketch.random(2, 10)
      this.move = sketch.random(80, 120)
      this.noiseOffset = noiseOffset;
    }

    update() {
      for (let i = 0; i < sketch.height / this.diameter; i++) {
        sketch.image(this.img, sketch.map(sketch.noise(yOffset + this.noiseOffset + i / this.move), 0, 1, -this.diameter * this.multiplier, this.diameter * this.multiplier) + this.startY, i * this.diameter, this.diameter, this.diameter)
      }
    }
  }
}

new p5(embroideryCanvas, "embroidery");