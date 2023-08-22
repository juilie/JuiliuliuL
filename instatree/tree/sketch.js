let renderer
var treeLength = 1;
var maxTreeLength = 98;
var MINUTES_TO_FULL_SIZE = .1;
MINUTES_TO_FULL_SIZE = MINUTES_TO_FULL_SIZE * 60000
let LEAF_TEXTURE = '-1'
let leafTextures = []

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
var LEAF_COLOR;
var LEAF_COLOR_PICKER;
var LEAF_OUTLINE_PICKER;
var BRANCH_COLOR_PICKER;
var BRANCH_COLOR;
var BRANCH_TEXTURE = '';
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

var sliderRate;
var sliderPan;

document.addEventListener("midimessage", (event) => {
  console.log("hello")
});

p5.disableFriendlyErrors = true;

function setup() {
  var isMobile = screen.width <= 480;
  let leavesContainer = document.querySelector('#leaves')
  let branchesContainer = document.querySelector('#branches')
  let animationsContainer = document.querySelector('#animations')
  let miscContainer = document.querySelector('#misc')
  let cameraContainer = document.querySelector('#camera')
  let exportContainer = document.querySelector('#export')

  sliderRate = createSlider(0, 1.5, 1, 0.01);
  sliderPan = createSlider(-1, 1, 0, 0.01);

  renderer = createCanvas(windowWidth, windowHeight, WEBGL);
  renderer.drawingContext.disable(renderer.drawingContext.DEPTH_TEST);
  angleMode(DEGREES)
  background('black');

  frameRate(60)

  ROTATION_RANGE_SLIDER = createSlider(0, 1000, 20).parent(createDiv('Rotate Range').parent(animationsContainer));
  ROTATION_MODIFIER_SLIDER = createSlider(0, 360, 0).parent(createDiv('Rotate Mod').parent(animationsContainer));

  EGG_MODE = createCheckbox('Egg Mode', false).parent(miscContainer);
  console.log(EGG_MODE);

  THREE_D_MODE = createCheckbox('3D Mode', true).parent(miscContainer);

  SPINNING = createCheckbox('Spinning (3D Only)', true).parent(animationsContainer);
  TREE_SWITCHING = createCheckbox('Tree Switching (2D only)', false).parent(animationsContainer);

  ROTATION_WAVE = createCheckbox('Rotation Wave', false).parent(animationsContainer);


  HIDE_BRANCHES = createCheckbox('Hide Branches', false).parent(branchesContainer);
  SWAY_MODE = createCheckbox('Sway Mode (2D Only)', false).parent(animationsContainer);
  SWAY_MODE_SLIDER = createSlider(0, 5, 2).parent(createDiv('Sway Amount').parent(animationsContainer));

  LEAF_SIZE = createSlider(0, 580, 0).parent(createDiv('Leaf Size').parent(leavesContainer));
  LEAF_SIZE_Y = createSlider(0, 580, 0).parent(createDiv('Leaf Length').parent(leavesContainer));
  LEAF_SIZE_X = createSlider(0, 580, 0).parent(createDiv('Leaf Width').parent(leavesContainer));
  LEAF_SIZE_Z = createSlider(0, 580, 0).parent(createDiv('Leaf Depth').parent(leavesContainer));

  LEAF_COLOR = color('green')
  LEAF_COLOR_PICKER = createColorPicker(color('green')).parent(createDiv('Leaf Color').parent((leavesContainer)));

  LEAF_OUTLINE_PICKER = createColorPicker(color(70, 40, 20)).parent(createDiv('Leaf Outline Color').parent((leavesContainer)));

  const leafTextureWrapper = createDiv()
  leafTextureWrapper.id("leafTextureWrapper")

  createP("Leaf Texture").parent(leavesContainer).style('text-decoration', 'underline');
  LEAF_TEXTURE = createRadio(leafTextureWrapper).parent(leavesContainer);
  LEAF_TEXTURE.option('-1', 'none');
  LEAF_TEXTURE.option('2', 'stained glass');
  LEAF_TEXTURE.option('0', 'rain');
  LEAF_TEXTURE.selected('-1');

  // The radios need to be given an id to differentiate from other p5 generated radios
  const leafTextureRadios = LEAF_TEXTURE.elt.querySelectorAll('input')
  for (let i = 0; i < leafTextureRadios.length; i++) {
    leafTextureRadios[i].name = "leafTextureRadio";
  }

  const leafShapeWrapper = createDiv()
  leafShapeWrapper.id("leafShapeWrapper")
  createP("Shape").parent(leavesContainer).style('text-decoration', 'underline');
  LEAF_SHAPE = createRadio(leafShapeWrapper).parent(leavesContainer);
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
  BRANCH_COLOR_PICKER = createColorPicker(color('brown')).parent(createDiv('Branch Color').parent(branchesContainer))
  BRANCH_RADIUS = createSlider(-200, 400, 0).parent(createDiv('Branch Radius').parent(branchesContainer));
  BRANCH_LENGTH = createSlider(-100, 580, 0).parent(createDiv('Branch Length').parent(branchesContainer));


  const textureWrapper = createDiv()
  textureWrapper.id("textureWrapper")
  const shapeWrapper = createDiv()
  shapeWrapper.id("shapeWrapper")

  createP("Texture").parent(branchesContainer).style('text-decoration', 'underline');
  BRANCH_TEXTURE = createRadio(textureWrapper).parent(branchesContainer);
  BRANCH_TEXTURE.option('', 'none');
  BRANCH_TEXTURE.option('texture(images[floor(random(0, images.length))]);', 'embroidery');
  BRANCH_TEXTURE.option('texture(barks[0]);', 'bark');
  BRANCH_TEXTURE.selected('');

  createP("Shape").parent(branchesContainer).style('text-decoration', 'underline');
  BRANCH_SHAPE = createRadio(shapeWrapper).parent(branchesContainer);
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

  CAMERA_X = createSlider(-width * .5, width *.5, 0).parent(createDiv('X').parent(cameraContainer));
  CAMERA_Y = createSlider(-height * .5, height * .5, 0).parent(createDiv('Y').parent(cameraContainer));
  CAMERA_Z = createSlider(-width * .5, width * .5, 0).parent(createDiv('Z').parent(cameraContainer));


  let valueDisplayer = createP("6 second(s)").parent(exportContainer);
  EXPORT_SECONDS = createSlider(1, 60, 6).parent(createDiv('Seconds').parent(exportContainer));
  EXPORT_SECONDS.input(() => {
    valueDisplayer.html(EXPORT_SECONDS.value() + " second(s)")
  })
  SAVE_BUTTON = createButton('Save to gif', '6', 'number').parent(exportContainer);

  SAVE_BUTTON.mousePressed(() => {
    saveGif('treeGif', Number(EXPORT_SECONDS.value()));
  });

  var RANDOMIZE_VARIABLES = {
    sliders: [ROTATION_MODIFIER_SLIDER, ROTATION_RANGE_SLIDER, BRANCH_RADIUS, BRANCH_LENGTH, LEAF_SIZE_X, LEAF_SIZE_Y, LEAF_SIZE_Z,
      CAMERA_X, CAMERA_Y, CAMERA_Z
    ],

    checkboxes: [EGG_MODE, THREE_D_MODE, HIDE_BRANCHES, SPINNING, ROTATION_WAVE, TREE_SWITCHING]

  };
}

let images = [];
let barks = []
let amplitude = {"volNorm": 0};


function preload() {
  images = [loadImage('./Embroidery/pys1.png'), loadImage('./Embroidery/embroider2white.png'), loadImage('./Embroidery/3dpys.jpg'), loadImage('./Embroidery/3dpys2.jpg'), loadImage('./Embroidery/blue.png')]
  barks = [loadImage('./textures/bark1.jpg')]
  leafTextures = [loadImage('./textures/wet.jpg'), loadImage('./textures/cloud.jpg'), loadImage('./textures/glass.jpeg')]
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  if (THREE_D_MODE.checked()) {
    renderer.drawingContext.enable(renderer.drawingContext.DEPTH_TEST);
    background('black')

    randomSeed(1)

    // Camera Position
    translate(0 + CAMERA_X.value(), (height * .2 + CAMERA_Y.value()), height * .25 + CAMERA_Z.value())
    SPINNING.checked() && rotateY(frameCount)
    three_branch(treeLength)
    if (millis() < MINUTES_TO_FULL_SIZE) {
      treeLength = map(millis(), 0, MINUTES_TO_FULL_SIZE, 1, maxTreeLength);
    }
  }

  // 2D MODE
  else {
    if (!(frameCount % TREES_PER_SEC)) {
      renderer.drawingContext.disable(renderer.drawingContext.DEPTH_TEST);

      !TREE_SWITCHING.checked() && randomSeed(100);
      background('black');
      translate(0 + CAMERA_X.value(), (height * 0.16666666666 + CAMERA_Y.value()), height * 0.25 + CAMERA_Z.value())

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
    translate(0, -len * 0.5, 0)
    eval(BRANCH_TEXTURE.value());
    !HIDE_BRANCHES.checked() && eval(branchShapeFunctions[BRANCH_SHAPE.value()])
    translate(0, len / 2, 0)

    translate(0, -len);
    rotate((random(-20, -20 - ROTATION_RANGE_SLIDER.value())) + ROTATION_MODIFIER_SLIDER.value() + sinFunction + swayFunction);
    branch(len * random(...branchLengthRange))
    rotate(random(50, 50 + ROTATION_RANGE_SLIDER.value()) + ROTATION_MODIFIER_SLIDER.value()+ sinFunction + swayFunction);
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

  translate(0, -len * 0.5, 0)

  beginShape()
  strokeWeight(0);
  !HIDE_BRANCHES.checked() && eval(branchShapeFunctions[BRANCH_SHAPE.value()])
  fill(BRANCH_COLOR_PICKER.color())
  eval(BRANCH_TEXTURE.value());
  endShape(CLOSE)
  translate(0, len * 0.5, 0)

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
      LEAF_TEXTURE.value() && Number(LEAF_TEXTURE.value()) != -1? texture(leafTextures[Number(LEAF_TEXTURE.value())]) : console.log("huh");;
      eval(leafShapeFunctions[LEAF_SHAPE.value()])
      endShape(CLOSE)

      push();
      fill(LEAF_OUTLINE_PICKER.color());
      pop();
    }
  }
}