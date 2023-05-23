let renderer
var treeLength = 100;
var maxTreeLength = 100;
var MINUTES_TO_FULL_SIZE = .1;
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

var THREE_D_MODE = true;
var THREE_D_MODE_BOX;
var LEAF_COLOR_PICKER;
var LEAF_OUTLINE_PICKER;
var BRANCH_COLOR_PICKER;
var BRANCH_TEXTURE = '';
var bg;
var branchShapeFunctions = [
  'cylinder(map(len, 10, 100, 0.5, 3.5) + BRANCH_RADIUS.value(), len + 2 + BRANCH_LENGTH.value())',
  'box(map(len, 10, 100, 0.5, 3.5) + BRANCH_RADIUS.value(), len + 2 + BRANCH_LENGTH.value())',
  'sphere(map(len, 10, 100, 0.5, 3.5) + BRANCH_RADIUS.value())',
  'ellipsoid(map(len, 10, 100, 0.5, 3.5) + BRANCH_RADIUS.value(), len + 2 + BRANCH_LENGTH.value())',
  'torus(map(len, 10, 100, 0.5, 3.5) + BRANCH_RADIUS.value(), len + 2 + BRANCH_LENGTH.value())'
];
var BRANCH_SHAPE = '0';

var BRANCH_RADIUS;
var BRANCH_LENGTH;

var LEAF_SIZE;
var LEAF_SIZE_X;
var LEAF_SIZE_Y;
var LEAF_SIZE_Z;

var leafShapeFunctions = [
  'cylinder(3.3 + LEAF_SIZE_X.value() + LEAF_SIZE.value(), 5.8 + LEAF_SIZE_Y.value() + LEAF_SIZE.value())',
  'box(3.3 + LEAF_SIZE_X.value() + LEAF_SIZE.value(), 5.8 + LEAF_SIZE_Y.value() + LEAF_SIZE.value(), 1.8 + LEAF_SIZE_Z.value() + LEAF_SIZE.value())',
  'sphere(3.3 + LEAF_SIZE.value())',
  'ellipsoid(3.3 + LEAF_SIZE_X.value() + LEAF_SIZE.value(), 5.8 + LEAF_SIZE_Y.value() + LEAF_SIZE.value(), 1.8 + LEAF_SIZE_Z.value() + LEAF_SIZE.value())',
];
var LEAF_SHAPE = '3';

var SPINNING;
var SPINNING_BOX;

var CAMERA_X;
var CAMERA_Y;
var CAMERA_Z;

var RANDOMIZE_VARIABLES;

function setup() {
  const controlsContainer = document.querySelector("#controls-container")
  renderer = createCanvas(windowWidth, windowHeight, WEBGL);
  renderer.parent("sketch")
  renderer.drawingContext.disable(renderer.drawingContext.DEPTH_TEST);
  angleMode(DEGREES)
  background('black');

  frameRate(60)

  ROTATION_RANGE_SLIDER = createSlider(0, 1000, 20, .001).parent(createDiv('Rotate Range').parent(controlsContainer));
  ROTATION_MODIFIER_SLIDER = createSlider(0, 360, 0, .001).parent(createDiv('Rotate Mod').parent(controlsContainer));

  EGG_MODE = createCheckbox('Egg Mode', false).parent(controlsContainer);

  THREE_D_MODE = createCheckbox('3D Mode', true).parent(controlsContainer);

  SPINNING = createCheckbox('Spinning (3D Only)', true).parent(controlsContainer);
  TREE_SWITCHING = createCheckbox('Tree Switching (2D only)', false).parent(controlsContainer);

  ROTATION_WAVE = createCheckbox('Rotation Wave', false).parent(controlsContainer);


  HIDE_BRANCHES = createCheckbox('Hide Branches', false).parent(controlsContainer);
  SWAY_MODE = createCheckbox('Sway Mode (2D Only)', false).parent(controlsContainer);
  SWAY_MODE_SLIDER = createSlider(0, 5, 2).parent(createDiv('Sway Amount').parent(controlsContainer));

  LEAF_SIZE = createSlider(0, 180, 0).parent(createDiv('Leaf Size').parent(controlsContainer));
  LEAF_SIZE_Y = createSlider(0, 180, 0).parent(createDiv('Leaf Length').parent(controlsContainer));
  LEAF_SIZE_X = createSlider(0, 180, 0).parent(createDiv('Leaf Width').parent(controlsContainer));
  LEAF_SIZE_Z = createSlider(0, 180, 0).parent(createDiv('Leaf Depth').parent(controlsContainer));

  LEAF_COLOR = color('blue')
  LEAF_COLOR_PICKER = createColorPicker(color('green')).parent(createDiv('Leaf Color').parent(controlsContainer));

  LEAF_OUTLINE_PICKER = createColorPicker(color(70, 40, 20)).parent(createDiv('Leaf Outline Color').parent(controlsContainer));
  const leafShapeWrapper = createDiv()
  leafShapeWrapper.id("leafShapeWrapper")
  createP("Shape").style('text-decoration', 'underline').parent(controlsContainer);
  LEAF_SHAPE = createRadio(leafShapeWrapper).parent(controlsContainer);
  LEAF_SHAPE.option('0', 'cylinder', 'please');
  LEAF_SHAPE.option('1', 'box');
  LEAF_SHAPE.option('2', 'sphere');
  LEAF_SHAPE.option('3', 'ellipsoid');
  const leafShapeRadios = LEAF_SHAPE.elt.querySelectorAll('input')
  for (let i = 0; i < leafShapeRadios.length; i++) {
    leafShapeRadios[i].name = "leafShapeRadio";
  }
  LEAF_SHAPE.selected('3');

  BRANCH_COLOR = color('brown')
  BRANCH_COLOR_PICKER = createColorPicker(color('brown')).parent(createDiv('Branch Color').parent(controlsContainer))
  BRANCH_RADIUS = createSlider(0, 180, 0).parent(createDiv('Branch Radius').parent(controlsContainer));
  BRANCH_LENGTH = createSlider(-180, 180, 0).parent(createDiv('Branch Length').parent(controlsContainer));


  const textureWrapper = createDiv()
  textureWrapper.id("textureWrapper")
  const shapeWrapper = createDiv()
  shapeWrapper.id("shapeWrapper")

  createP("Texture").style('text-decoration', 'underline').parent(controlsContainer);
  BRANCH_TEXTURE = createRadio(textureWrapper).parent(controlsContainer);
  BRANCH_TEXTURE.option('', 'none');
  BRANCH_TEXTURE.option('texture(images[floor(random(0, images.length))]);', 'embroidery');
  BRANCH_TEXTURE.option('texture(barks[0]);', 'bark');
  BRANCH_TEXTURE.selected('');

  createP("Shape").style('text-decoration', 'underline').parent(controlsContainer);
  BRANCH_SHAPE = createRadio(shapeWrapper).parent(controlsContainer);
  BRANCH_SHAPE.option('0', 'cylinder', 'please');
  BRANCH_SHAPE.option('1', 'box');
  BRANCH_SHAPE.option('2', 'sphere');
  BRANCH_SHAPE.option('3', 'ellipsoid');
  BRANCH_SHAPE.option('4', 'torus');
  const shapeRadios = BRANCH_SHAPE.elt.querySelectorAll('input')
  for (let i = 0; i < shapeRadios.length; i++) {
    shapeRadios[i].name = "shapeRadio";
  }
  BRANCH_SHAPE.selected('0');

  CAMERA_X = createSlider(-width / 2, width / 2, 0).parent(createDiv('X').parent(controlsContainer));
  CAMERA_Y = createSlider(-height / 2, height / 2, 0).parent(createDiv('Y').parent(controlsContainer));
  CAMERA_Z = createSlider(-width / 2, width / 2, 0).parent(createDiv('Z').parent(controlsContainer));

  // EXPORT_SECONDS.position(20, 65);

  let valueDisplayer = createP("5 second(s)").parent(controlsContainer);
  EXPORT_SECONDS = createSlider(1, 60, 4).parent(createDiv('Seconds').parent(controlsContainer));
  EXPORT_SECONDS.input(() => {
    valueDisplayer.html(EXPORT_SECONDS.value() + " second(s)")
  })
  SAVE_BUTTON = createButton('Save to gif', '5', 'number').parent(controlsContainer);

  SAVE_BUTTON.mousePressed(() => {
    saveGif('treeGif', Number(EXPORT_SECONDS.value()));
  });

  var RANDOMIZE_VARIABLES = {
    sliders: [ROTATION_MODIFIER_SLIDER, ROTATION_RANGE_SLIDER, BRANCH_RADIUS, BRANCH_LENGTH, LEAF_SIZE_X, LEAF_SIZE_Y, LEAF_SIZE_Z,
      CAMERA_X, CAMERA_Y, CAMERA_Z
    ],

    checkboxes: [EGG_MODE, THREE_D_MODE, HIDE_BRANCHES, SPINNING, ROTATION_WAVE, TREE_SWITCHING]

  };

  RANDOMIZE_BUTTON = createButton('Randomize', '5', 'number').parent(controlsContainer);

  RANDOMIZE_BUTTON.mousePressed(() => {
    for (let i = 0; i < RANDOMIZE_VARIABLES.sliders.length; i++) {
      const slider = RANDOMIZE_VARIABLES.sliders[i];
      console.log(slider.value());
    }
  });


  ROTATION_MODIFIER_SLIDER.value(18);
  BRANCH_RADIUS.value(180);
  BRANCH_LENGTH.value(180);
  LEAF_SIZE_X.value(36);
  LEAF_SIZE_Y.value(6);
  LEAF_SIZE_Z.value(0);

  CAMERA_X.value(0)
  CAMERA_Y.value(50.5)
  CAMERA_Z.value(595)

  // LEAF_COLOR_PICKER.value("#684B21");
  LEAF_OUTLINE_PICKER.value("#DADBFF")
  BRANCH_COLOR_PICKER.value("#0A030E")
  LEAF_SHAPE.selected('3')

}

let images = [];
let barks = [];

function preload() {
  // images = [loadImage('./Embroidery/pys1.png'), loadImage('./Embroidery/embroider2white.png'), loadImage('./Embroidery/3dpys.jpg'), loadImage('./Embroidery/3dpys2.jpg'), loadImage('./Embroidery/blue.png')]
  // barks = [loadImage('./textures/bark1.jpg')]
  // console.log(bg);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // ROTATION_MODIFIER_SLIDER.value(18 + map(mouseX, 0, width, -1, 1));
  // ROTATION_RANGE_SLIDER.value(18 + map(mouseY, 0, height, -1, 1));
  // LEAF_COLOR = color(map(mouseX, 0, width, 0, 255), 128, 0);
  
  // LEAF_COLOR_PICKER.value(LEAF_COLOR)

  if (THREE_D_MODE.checked()) {
    renderer.drawingContext.enable(renderer.drawingContext.DEPTH_TEST);
    background('black')
    // background(bg);

    randomSeed(1)

    // Camera Position
    translate(0 + CAMERA_X.value(), (height / 6 + CAMERA_Y.value()), height / 4 + CAMERA_Z.value())
    // rotate(map(mouseY, 0, height, 0, 2))
    SPINNING.checked() && rotateY(frameCount / 24)
    three_branch(treeLength)
    if (millis() < MINUTES_TO_FULL_SIZE) {
      treeLength = map(millis(), 0, MINUTES_TO_FULL_SIZE, maxTreeLength, maxTreeLength);
    }
  }

  // 2D MODE
  else {
    if (!(frameCount % TREES_PER_SEC)) {
      renderer.drawingContext.disable(renderer.drawingContext.DEPTH_TEST);

      !TREE_SWITCHING.checked() && randomSeed(100);
      background('black');
      translate(0 + CAMERA_X.value(), (height / 6 + CAMERA_Y.value()), height / 4 + CAMERA_Z.value())

      branch(treeLength);

      if (millis() < MINUTES_TO_FULL_SIZE) {
        treeLength = map(millis(), 0, MINUTES_TO_FULL_SIZE, 1, maxTreeLength);
      }
    }
  }
}

function branch(len) {
  push()
  if (len > 10) {
    var sinFunction = ROTATION_WAVE.checked() ? map(sin(frameCount), -1, 1, 0, 360) : 0;
    var swayFunction = SWAY_MODE.checked() ? map(sin(frameCount), -1, 1, -SWAY_MODE_SLIDER.value(), SWAY_MODE_SLIDER.value()) : 0;
    strokeWeight(map(len, 10, 100, 1, 15));
    stroke(BRANCH_COLOR_PICKER.color());
    noStroke();
    noFill()
    HIDE_BRANCHES.checked() && strokeWeight(0);
    fill(BRANCH_COLOR_PICKER.color())
    // line(0, 0, 0, -len);
    translate(0, -len / 2, 0)
    eval(BRANCH_TEXTURE.value());
    !HIDE_BRANCHES.checked() && eval(branchShapeFunctions[BRANCH_SHAPE.value()])
    translate(0, len / 2, 0)

    translate(0, -len);
    rotate((random(-20, -20 - ROTATION_RANGE_SLIDER.value())) + ROTATION_MODIFIER_SLIDER.value() + sinFunction + swayFunction);
    branch(len * random(...branchLengthRange))
    rotate(random(50, 50 + ROTATION_RANGE_SLIDER.value()) + ROTATION_MODIFIER_SLIDER.value() + sinFunction + swayFunction);
    branch(len * random(...branchLengthRange))
  } else {
    var r = LEAF_COLOR_PICKER.color().levels[0] + random(-20, 20)
    var g = LEAF_COLOR_PICKER.color().levels[1] + random(-20, 20)
    var b = LEAF_COLOR_PICKER.color().levels[2] + random(-20, 20)
    fill(r, g, b, 150);
    noStroke()
    beginShape()

    if (EGG_MODE.checked()) {
      noFill()
      image(images[0], 0, 0, 20, 20)
    } else {
      beginShape()
      // noStroke()
      strokeWeight(0)
      stroke('brown')
      noStroke()
      fill(r, g, b, 100)
      ellipsoid(5, 10, 2);
      endShape(CLOSE)
    }
    endShape(CLOSE)
  }
  pop();
}

var animation_complete = true;

function three_branch(len) {
  var sinFunction = ROTATION_WAVE.checked() || !animation_complete ? map(sin(frameCount), -1, 1, 0, 360) : 0;
  animation_complete = sinFunction === 0 || sinFunction === 360 ? true : false;

  translate(0, -len / 2, 0)

  beginShape()
  strokeWeight(0);
  !HIDE_BRANCHES.checked() && eval(branchShapeFunctions[BRANCH_SHAPE.value()])
  fill(BRANCH_COLOR_PICKER.color())
  eval(BRANCH_TEXTURE.value());
  endShape(CLOSE)
  translate(0, len / 2, 0)

  translate(0, -len, 0)

  if (len > 10) {
    for (let i = 0; i < 3; i++) {
      rotateY(random(100, 120 + ROTATION_RANGE_SLIDER.value()) + ROTATION_MODIFIER_SLIDER.value() + sinFunction);

      push()
      rotateZ(random(20, 30 + ROTATION_RANGE_SLIDER.value()) + ROTATION_MODIFIER_SLIDER.value() + sinFunction)
      three_branch(len * .68)
      pop()
    }
  } else {
    var r = LEAF_COLOR_PICKER.color().levels[0] + random(-20, 20)
    var g = LEAF_COLOR_PICKER.color().levels[1] + random(-20, 20)
    var b = LEAF_COLOR_PICKER.color().levels[2] + random(-20, 20)
    fill(r, g, b, 150);

    if (EGG_MODE.checked()) {
      // noFill()
      beginShape()
      noStroke()
      fill('red')
      texture(images[floor(random(0, images.length))])
      ellipsoid(2.5 + LEAF_SIZE_X.value() + LEAF_SIZE.value(), 3 + LEAF_SIZE_Y.value() + LEAF_SIZE.value(), 3 + LEAF_SIZE_Z.value() + LEAF_SIZE.value());
      endShape(CLOSE)
    } else {
      beginShape()
      noStroke()
      strokeWeight(.1)
      fill(r, g, b, 150)
      eval(leafShapeFunctions[LEAF_SHAPE.value()])
      endShape(CLOSE)

      push();
      fill(LEAF_OUTLINE_PICKER.color());
      // ellipsoid(3.5 + LEAF_SIZE.value(), 6.1 + LEAF_SIZE.value(), 1);
      pop();
    }
  }
}