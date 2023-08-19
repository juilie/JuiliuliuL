// ml5.js: Object Detection with COCO-SSD (Webcam)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ

// let img;
// import * as cvstfjs from './custom.js';
const customVision = window.cvstfjs;
let video;
let detector;
let detections = [];
let testCoin;

// let model = new cvstfjs.ObjectDetectionModel();
// await model.loadModelAsync('model.json');
// const image = document.getElementById('image');
// const result = await model.executeAsync(image);

function preload() {
    // img = loadImage('dog_cat.jpg');
    coin = loadImage('./coin.png');
    detector = ml5.objectDetector('https://raw.githubusercontent.com/juilie/ShrimpShow/main/model.json', {}, () => {
        console.log(detector);
    });
}

function gotDetections(error, results) {
    if (error) {
        console.error(error);
    }
    detections = results;
    detector.detect(video, gotDetections);
}
function vidLoad() {
    video.loop();
    video.volume(0);
    console.log("hello");
  }
function setup() {
    createCanvas(1280,720);
    // video = createCapture(VIDEO);
    video =  createVideo(["./fish.mp4"]);
    video.size(1280, 720);
    video.volume(0);
    video.loop();
    video.hide();
    detector.detect(video, gotDetections);
    testCoin = new coinClass(300, 200, 50);
    console.log(window);

    
}


function draw() {
    image(video, 0, 0);

    for (let i = 0; i < detections.length; i++) {
        let object = detections[i];
        stroke(0, 255, 0);
        strokeWeight(4);
        noFill();
        rect(object.x, object.y, object.width, object.height);
        noStroke();
        fill(255);
        textSize(24);
        text(object.label, object.x + object.width * .5, object.y + 24);
        if (object.label == "cell phone") {
            checkCollision(object, testCoin) ? testCoin.collectCoin() : null;
        }
    }

    testCoin.show();
}


class coinClass {
    constructor(x, y, r, img) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.coin = coin;
    }

    collectCoin() {

        this.r -= 10; //random(kittens);
        this.x += 5; //random(kittens);
        this.y += 5; //random(kittens);te
    }

    move() {
        this.x = this.x + random(-2, 2);
        this.y = this.y + random(-2, 2);
    }

    show() {
        image(this.coin, this.x, this.y, this.r, this.r);
        // stroke(255);
        // strokeWeight(4);
        // fill(this.brightness, 125);
        // ellipse(this.x, this.y, this.r * 2);
    }
}

function checkCollision(rect, circle) {
    let hit = collideRectCircle(rect.x, rect.y, rect.width, rect.height, circle.x, circle.y, circle.r)
    return hit
}