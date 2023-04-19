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

const treeCanvas = (sketch) => {

  let renderer
  var treeLength = 1;
  var maxTreeLength = 100;
  var MINUTES_TO_FULL_SIZE = .5;
  MINUTES_TO_FULL_SIZE = MINUTES_TO_FULL_SIZE * 60000

  var branchLengthRange = [.7, .9]
  var ROTATION_RANGE_SLIDER;
  var ROTATION_MODIFIER_SLIDER;
  var ROTATION_WAVE = false;
  var ROTATION_WAVE_BOX;

  var SWAY_MODE = false;
  var SWAY_MODE_SLIDER;


  var HIDE_BRANCHES;

  var TREE_SWITCHING = false;
  var TREE_SWITCHING_BOX;

  var TREES_PER_SEC = 20;
  TREES_PER_SEC = 60 / TREES_PER_SEC

  var EGG_MODE = false;
  var EGG_MODE_BOX;


  var THREE_D_MODE = false;
  var THREE_D_MODE_BOX;
  var THREE_D_BRANCHES = false;
  var THREE_D_BRANCHES_BOX;
  var THREE_D_LEAVES = false;
  var THREE_D_LEAVES_BOX;

  var LEAF_COLOR_PICKER;
  var LEAF_OUTLINE_PICKER;
  var BRANCH_COLOR_PICKER;
  var BRANCH_TEXTURE = '';
  var BRANCH_RADIUS;
  var BRANCH_LENGTH;

  var LEAF_SIZE;

  var SPINNING = true;
  var SPINNING_BOX;
  var CONTROLS = [];


  sketch.setup = () => {

    let containerDiv = sketch.createDiv();
    containerDiv.addClass('slider-container');

    renderer = sketch.createCanvas(sketch.windowWidth / 2, sketch.windowHeight / 2, sketch.WEBGL);
    renderer.drawingContext.disable(renderer.drawingContext.DEPTH_TEST);
    sketch.angleMode(sketch.DEGREES)
    sketch.background('black');

    sketch.frameRate(60)

    ROTATION_RANGE_SLIDER = sketch.createSlider(0, 1000, 20).parent(containerDiv);
    ROTATION_MODIFIER_SLIDER = sketch.createSlider(0, 360, 0).parent(containerDiv);


    EGG_MODE_BOX = sketch.createCheckbox('Egg Mode', false).parent(containerDiv);
    EGG_MODE_BOX.changed(() => {
      EGG_MODE = EGG_MODE_BOX.checked()
    })
    THREE_D_MODE_BOX = sketch.createCheckbox('3D Mode', false).parent(containerDiv);
    THREE_D_MODE_BOX.changed(() => {
      THREE_D_MODE = THREE_D_MODE_BOX.checked()
    })
    SPINNING_BOX = sketch.createCheckbox('Spinning', true).parent(containerDiv);
    SPINNING_BOX.changed(() => {
      SPINNING = SPINNING_BOX.checked()
    })
    THREE_D_BRANCHES_BOX = sketch.createCheckbox('3D Branches', false).parent(containerDiv);
    THREE_D_BRANCHES_BOX.changed(() => {
      THREE_D_BRANCHES = THREE_D_BRANCHES_BOX.checked()
    })
    THREE_D_LEAVES_BOX = sketch.createCheckbox('3D Leaves', false).parent(containerDiv);
    THREE_D_LEAVES_BOX.changed(() => {
      THREE_D_LEAVES = THREE_D_LEAVES_BOX.checked()
    })
    TREE_SWITCHING_BOX = sketch.createCheckbox('Tree Switching', false).parent(containerDiv);
    TREE_SWITCHING_BOX.changed(() => {
      TREE_SWITCHING = TREE_SWITCHING_BOX.checked()
    })
    ROTATION_WAVE_BOX = sketch.createCheckbox('Rotation Wave', false).parent(containerDiv);
    ROTATION_WAVE_BOX.changed(() => {
      ROTATION_WAVE = ROTATION_WAVE_BOX.checked()
    })

    HIDE_BRANCHES = sketch.createCheckbox('HIDE BRANCHES', false).parent(containerDiv);
    SWAY_MODE = sketch.createCheckbox('Sway Mode', false).parent(containerDiv);
    SWAY_MODE_SLIDER = sketch.createSlider(0, 5, 2).parent(containerDiv);
    LEAF_SIZE = sketch.createSlider(0, 180, 0).parent(containerDiv);

    LEAF_COLOR = sketch.color('green')
    LEAF_COLOR_PICKER = sketch.createColorPicker(sketch.color('green')).parent(containerDiv)

    LEAF_OUTLINE_PICKER = sketch.createColorPicker(sketch.color(70, 40, 20)).parent(containerDiv)

    BRANCH_COLOR = sketch.color('brown')
    BRANCH_COLOR_PICKER = sketch.createColorPicker(sketch.color('brown')).parent(containerDiv)
    BRANCH_RADIUS = sketch.createSlider(0, 180, 0).parent(containerDiv);
    BRANCH_LENGTH = sketch.createSlider(0, 180, 0).parent(containerDiv);

    BRANCH_TEXTURE = sketch.createRadio().parent(containerDiv);
    BRANCH_TEXTURE.option('', 'none');
    BRANCH_TEXTURE.option('sketch.texture(images[sketch.floor(sketch.random(0, images.length))]);', 'embroidery');
    BRANCH_TEXTURE.option('sketch.texture(barks[0]);', 'bark');
    BRANCH_TEXTURE.selected('');

    CONTROLS = [EGG_MODE_BOX, THREE_D_MODE_BOX, SPINNING_BOX, THREE_D_BRANCHES_BOX, THREE_D_LEAVES_BOX,
      TREE_SWITCHING_BOX, LEAF_COLOR_PICKER, LEAF_OUTLINE_PICKER, BRANCH_COLOR_PICKER, ROTATION_RANGE_SLIDER, ROTATION_MODIFIER_SLIDER, ROTATION_WAVE_BOX,
      SWAY_MODE, SWAY_MODE_SLIDER, BRANCH_RADIUS, HIDE_BRANCHES, LEAF_SIZE,
      SWAY_MODE, SWAY_MODE_SLIDER, BRANCH_LENGTH, HIDE_BRANCHES, LEAF_SIZE,
    ]
  }

  let images = [];
  let barks = []

  sketch.preload = () => {
    images = [sketch.loadImage('./Embroidery/pys1.png'), sketch.loadImage('./Embroidery/embroider2white.png'), sketch.loadImage('./Embroidery/3dpys.jpg'), sketch.loadImage('./Embroidery/3dpys2.jpg'), sketch.loadImage('./Embroidery/blue.png')]
    barks = [sketch.loadImage('./textures/bark1.jpg')]
  }

  sketch.draw = () => {
    // 3D MODE

    if (THREE_D_MODE) {
      renderer.drawingContext.enable(renderer.drawingContext.DEPTH_TEST);
      sketch.background('black')

      sketch.randomSeed(1)

      sketch.translate(0, (sketch.height / 3), sketch.height / 6)
      SPINNING && sketch.rotateY(sketch.frameCount)
      three_branch(treeLength)
      if (sketch.millis() < MINUTES_TO_FULL_SIZE) {
        treeLength = sketch.map(sketch.millis(), 0, MINUTES_TO_FULL_SIZE, 1, maxTreeLength);
      }
    }

    // 2D MODE
    else {
      if (!(sketch.frameCount % TREES_PER_SEC)) {
        renderer.drawingContext.disable(renderer.drawingContext.DEPTH_TEST);

        !TREE_SWITCHING && sketch.randomSeed(100);
        sketch.background('black');
        sketch.translate(0, sketch.height / 2.5)

        branch(treeLength);

        if (sketch.millis() < MINUTES_TO_FULL_SIZE) {
          treeLength = sketch.map(sketch.millis(), 0, MINUTES_TO_FULL_SIZE, 1, maxTreeLength);
        }
      }
    }
  }

  function branch(len) {
    sketch.push()
    if (len > 10) {
      var sinFunction = ROTATION_WAVE ? sketch.map(sketch.sin(sketch.frameCount), -1, 1, 0, 360) : 0;
      var swayFunction = SWAY_MODE.checked() ? sketch.map(sketch.sin(sketch.frameCount), -1, 1, -SWAY_MODE_SLIDER.value(), SWAY_MODE_SLIDER.value()) : 0;
      sketch.strokeWeight(sketch.map(len, 10, 100, 1, 15));
      sketch.stroke(BRANCH_COLOR_PICKER.color());
      HIDE_BRANCHES.checked() && sketch.strokeWeight(0);
      sketch.fill('brown')
      sketch.line(0, 0, 0, -len);
      sketch.translate(0, -len);
      sketch.rotate((sketch.random(-20, -20 - ROTATION_RANGE_SLIDER.value())) + ROTATION_MODIFIER_SLIDER.value() + sinFunction + swayFunction);
      branch(len * sketch.random(...branchLengthRange))
      sketch.rotate(sketch.random(50, 50 + ROTATION_RANGE_SLIDER.value()) + ROTATION_MODIFIER_SLIDER.value() + sinFunction + swayFunction);
      branch(len * sketch.random(...branchLengthRange))
    } else {
      var r = LEAF_COLOR_PICKER.color().levels[0] + sketch.random(-20, 20)
      var g = LEAF_COLOR_PICKER.color().levels[1] + sketch.random(-20, 20)
      var b = LEAF_COLOR_PICKER.color().levels[2] + sketch.random(-20, 20)
      sketch.fill(r, g, b, 150);
      sketch.noStroke()
      sketch.beginShape()

      if (EGG_MODE) {
        sketch.noFill()
        sketch.image(images[0], 0, 0, 20, 20)
      } else {
        sketch.beginShape()
        // noStroke()
        sketch.strokeWeight(.1)
        sketch.stroke('brown')
        sketch.fill(r, g, b, 100)
        sketch.ellipsoid(5, 10, 2);
        sketch.endShape(sketch.CLOSE)
      }
      sketch.endShape(sketch.CLOSE)
    }
    sketch.pop();
  }



  var animation_complete = true;

  function three_branch(len) {
    var sinFunction = ROTATION_WAVE || !animation_complete ? sketch.map(sketch.sin(sketch.frameCount), -1, 1, 0, 360) : 0;
    animation_complete = sinFunction === 0 || sinFunction === 360 ? true : false;

    if (THREE_D_BRANCHES) {
      sketch.translate(0, -len / 2, 0)

      sketch.beginShape()
      sketch.strokeWeight(0);
      !HIDE_BRANCHES.checked() && sketch.cylinder(sketch.map(len, 10, 100, 0.5, 3.5) + BRANCH_RADIUS.value(), len + 2 + BRANCH_LENGTH.value())
      sketch.fill(BRANCH_COLOR_PICKER.color())
      eval(BRANCH_TEXTURE.value());
      sketch.endShape(sketch.CLOSE)
      sketch.translate(0, len / 2, 0)

    } else {
      sketch.beginShape()
      sketch.strokeWeight(sketch.map(len, 10, 100, 1, 7));
      sketch.stroke(BRANCH_COLOR_PICKER.color());
      HIDE_BRANCHES.checked() && sketch.strokeWeight(0);
      sketch.line(0, 0, 0, 0, -len - 2, 0)
      sketch.fill(BRANCH_COLOR_PICKER.color())
      sketch.endShape(sketch.CLOSE)
    }

    sketch.translate(0, -len, 0)

    if (len > 10) {
      for (let i = 0; i < 3; i++) {
        sketch.rotateY(sketch.random(100, 120 + ROTATION_RANGE_SLIDER.value()) + ROTATION_MODIFIER_SLIDER.value() + sinFunction);

        sketch.push()
        sketch.rotateZ(sketch.random(20, 30 + ROTATION_RANGE_SLIDER.value()) + ROTATION_MODIFIER_SLIDER.value() + sinFunction)
        three_branch(len * sketch.random(.6, .7))
        sketch.pop()
      }
    } else {
      var r = LEAF_COLOR_PICKER.color().levels[0] + sketch.random(-20, 20)
      var g = LEAF_COLOR_PICKER.color().levels[1] + sketch.random(-20, 20)
      var b = LEAF_COLOR_PICKER.color().levels[2] + sketch.random(-20, 20)
      sketch.fill(r, g, b, 150);

      if (EGG_MODE) {
        // noFill()
        sketch.beginShape()
        sketch.noStroke()
        sketch.fill('red')
        sketch.texture(images[sketch.floor(sketch.random(0, images.length))])
        sketch.ellipsoid(2.5 + LEAF_SIZE.value(), 3 + LEAF_SIZE.value(), 3 + LEAF_SIZE.value());
        sketch.endShape(sketch.CLOSE)
      } else if (THREE_D_LEAVES) {
        sketch.beginShape()
        sketch.noStroke()
        sketch.strokeWeight(.1)
        sketch.fill(r, g, b, 150)
        sketch.ellipsoid(3.3 + LEAF_SIZE.value(), 5.8 + LEAF_SIZE.value(), 1.8 + LEAF_SIZE.value());
        sketch.endShape(sketch.CLOSE)

        sketch.push();
        sketch.fill(LEAF_OUTLINE_PICKER.color());
        sketch.ellipsoid(3.5, 6.1, 1.5);
        sketch.pop();

      } else {
        sketch.beginShape()
        sketch.fill(r, g, b, 150)
        sketch.translate(5, 0, 0)
        sketch.rotateZ(90)
        for (let i = 45; i < 135; i++) {
          var rad = 8;
          var x = rad * sketch.cos(i)
          var y = rad * sketch.sin(i)
          sketch.vertex(x, y);
        }
        for (let i = 135; i > 45; i--) {
          var rad = 8;
          var x = rad * sketch.cos(i)
          var y = rad * sketch.sin(-i) + 10
          sketch.vertex(x, y);
        }
        // cylinder(20, 20)

        sketch.endShape(sketch.CLOSE)
      }
    }
  }
}

new p5(embroideryCanvas, "embroidery");
new p5(treeCanvas, "tree");