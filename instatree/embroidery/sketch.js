const embroideryCanvas = (sketch) => {
  let yOffset = 0;
  let ribbons = []
  var isMobile = screen.width <= 480;
  var img;

  let images = ['./Embroidery/vert/1.png', './Embroidery/vert/2.png', './Embroidery/vert/3.png', './Embroidery/vert/blue.png', './Embroidery/vert/blue.png']

  sketch.setup = () => {
    if (isMobile) {
      sketch.pixelDensity(1);
    }
    sketch.frameRate(60)
    let coverage = 0;

    sketch.createCanvas(innerWidth, innerHeight);

    for (let i = 0; coverage < sketch.width; i++) {
      var size = sketch.random(6, 35);
      ribbons[i] = new ribbon(sketch.random(0, sketch.width), size, sketch.random(0, 100));
      coverage += size/4;
    }
  }

  sketch.preload = () => {
    img = sketch.loadImage("./Embroidery/ukraine1.png")
  }

 sketch.windowResized = () => {
    sketch.resizeCanvas(windowWidth, windowHeight);
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
      this.yOff = sketch.random(0.0002, 0.0025);
    }

    update() {
      for (let i = 0; i < sketch.height / this.diameter; i++) {
        sketch.image(this.img, sketch.map(sketch.noise((sketch.frameCount * this.yOff) + this.noiseOffset + i / this.move), 0, 1, -this.diameter * this.multiplier, this.diameter * this.multiplier) + this.startY, i * this.diameter, this.diameter, this.diameter)
      }
    }
  }
}

new p5(embroideryCanvas, "embroidery");