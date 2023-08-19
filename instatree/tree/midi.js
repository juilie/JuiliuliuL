let channel, value, on;
let glitch = false
let sliderMode = 0;

let leaf_r = 0;
let leaf_g = 0;
let leaf_b = 0;

let branch_r = 0;
let branch_g = 0;
let branch_b = 0;

let glitchMap = new Array(300)
glitchMap.fill(()=>{})

let keyboardMap = new Array(300)
keyboardMap.fill(()=>{})

let akaiMap = new Array(300);

for (let akai = 0; akai < akaiMap.length; akai++) {
    let tempArray = new Array(300);
    tempArray.fill(()=>{})
    akaiMap[akai] = tempArray
}

// \

// AKAI MAP === [on][channel]
    // MODE SWITCH
    akaiMap[176][16] = () => {sliderMode=0}
    akaiMap[177][16] = () => {sliderMode=1}
    akaiMap[178][16] = () => {sliderMode=2}
    akaiMap[179][16] = () => {sliderMode=3}
    // akaiMap[177][16] = () => {sliderMode=0}
    // akaiMap[177][16] = () => {sliderMode=0}
    // akaiMap[177][16] = () => {sliderMode=0}
    // akaiMap[177][16] = () => {sliderMode=0}
    // akaiMap[177][16] = () => {sliderMode=0}
    // akaiMap[177][16] = () => {sliderMode=0}
    // akaiMap[177][16] = () => {sliderMode=0}


    // SLIDERS
    let sliderOne = [() => { CAMERA_Z.value(map(value, 0, 127, -width * .5, width * .5));}, () => { LEAF_SIZE_X.value(map(value, 0, 127, 0, 580))}, () => {leaf_r=map(value, 0, 127, 0, 255); LEAF_COLOR = color(leaf_r,leaf_g,leaf_b)}]
    akaiMap[176][7] = () => { sliderOne[sliderMode]()}
    
    let sliderTwo = [() => { CAMERA_X.value(map(value, 0, 127, -width * .5, width * .5))}, () => { LEAF_SIZE_Y.value(map(value, 0, 127, 0, 580))}, () => {leaf_g=map(value, 0, 127, 0, 255); LEAF_COLOR = color(leaf_r,leaf_g,leaf_b)}]
    akaiMap[177][7] = () => { sliderTwo[sliderMode]()}
    
    let sliderThree = [() => { CAMERA_Y.value(map(value, 0, 127, -height * .5, height * .5))}, () => { LEAF_SIZE_Z.value(map(value, 0, 127, 0, 580))}, () => {leaf_b=map(value, 0, 127, 0, 255); LEAF_COLOR = color(leaf_r,leaf_g,leaf_b)}]
    akaiMap[178][7] = () => { sliderThree[sliderMode]()}

    let sliderFour = [() => { LEAF_SIZE.value(map(value, 0, 127, 0, 580))}, () => { LEAF_SIZE.value(map(value, 0, 127, 0, 580))}]
    akaiMap[179][7] = () => { sliderFour[sliderMode]()}

    // Slider 5 is jank

    let sliderSix = [() => { LEAF_SIZE_X.value(map(value, 0, 127, 0, 580))}, () => {BRANCH_LENGTH.value(map(value, 0, 127, -100, 580))}, () => {branch_r=map(value, 0, 127, 0, 255); BRANCH_COLOR = color(branch_r,branch_g,branch_b)}]
    akaiMap[181][7] = () => {sliderSix[sliderMode]()}
    
    let sliderSeven = [() => { LEAF_SIZE_Y.value(map(value, 0, 127, 0, 580))}, () => {BRANCH_RADIUS.value(map(value, 0, 127, 0, 400))}, () => {branch_g=map(value, 0, 127, 0, 255); BRANCH_COLOR = color(branch_r,branch_g,branch_b)}]
    akaiMap[182][7] = () => {sliderSeven[sliderMode]()}
    
    let sliderEight = [() => { LEAF_SIZE_Z.value(map(value, 0, 127, 0, 580))}, () => {ROTATION_RANGE_SLIDER.value(map(value, 0, 127, 0, 1000))}, () => {branch_b=map(value, 0, 127, 0, 255); BRANCH_COLOR = color(branch_r,branch_g,branch_b)}]
    akaiMap[183][7] = () => {sliderEight[sliderMode]()}
    
    
    let sliderNine = [() => { treeLength = map(value, 0, 127, 0, 99);}, () => {ROTATION_MODIFIER_SLIDER.value(map(value, 0, 127, 0, 360))}]
    akaiMap[176][14] = () => {sliderNine[sliderMode]()}

    // NAVIGATION SELECTION
    akaiMap[151][50] = () => {glitch = true}
    akaiMap[135][50] = () => {glitch = false}
    
    akaiMap[151][49] = () => {EGG_MODE.checked(true)}
    akaiMap[135][49] = () => {EGG_MODE.checked(false)}    
    
    akaiMap[150][50] = () => {SPINNING.checked(false)}
    akaiMap[134][50] = () => {SPINNING.checked(true)}    
    
    akaiMap[150][49] = () => {ROTATION_WAVE.checked(true)}
    akaiMap[134][49] = () => {ROTATION_WAVE.checked(false)}  
    
    
    akaiMap[144][82] = () => {BRANCH_TEXTURE.selected(''); BRANCH_COLOR = color('brown')}
    akaiMap[144][83] = () => {BRANCH_TEXTURE.selected('texture(barks[0]);');}
    akaiMap[144][84] = () => {BRANCH_TEXTURE.selected('texture(images[floor(random(0, images.length))]);');}
    
    akaiMap[151][53] = () => {BRANCH_SHAPE.selected('0');}
    akaiMap[151][54] = () => {BRANCH_SHAPE.selected('1');}
    akaiMap[151][55] = () => {BRANCH_SHAPE.selected('2');}
    akaiMap[151][56] = () => {BRANCH_SHAPE.selected('3');}
    akaiMap[151][57] = () => {BRANCH_SHAPE.selected('4');}
    
    akaiMap[150][53] = () => {LEAF_SHAPE.selected('3');}
    akaiMap[150][54] = () => {LEAF_SHAPE.selected('1');}
    akaiMap[150][55] = () => {LEAF_SHAPE.selected('0');}
    akaiMap[150][56] = () => {LEAF_SHAPE.selected('2');}
    
    akaiMap[149][53] = () => {LEAF_TEXTURE = -1; LEAF_COLOR = color('green')}
    akaiMap[149][54] = () => {LEAF_TEXTURE = 0}
    akaiMap[149][55] = () => {LEAF_TEXTURE = 1}
    akaiMap[149][56] = () => {LEAF_TEXTURE = 2}
// KEYBOARD MAP === [channel]




// GLITCH MAP
glitchMap[176] = () => { CAMERA_Z.value(map(value, 0, 127, -width * .5, width * .5));}
glitchMap[177] = () => { CAMERA_X.value(map(value, 0, 127, -width * .5, width * .5))}
glitchMap[178] = () => { CAMERA_Y.value(map(value, 0, 127, -height * .5, height * .5))}
glitchMap[179] = () => { LEAF_SIZE_X.value(map(value, 0, 127, -height * .5, height * .5))}
glitchMap[180] = () => { CAMERA_Y.value(map(value, 0, 127, -height * .5, height * .5))}
glitchMap[254] = () => { CAMERA_Z.value(0)}
// midiMap[144] = () => { song.play()}
// midiMap[128] = () => { song.play()}


if (navigator.requestMIDIAccess) {
    console.log('This browser supports WebMIDI!');
} else {
    console.log('WebMIDI is not supported in this browser.');
}

navigator.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    console.log(midiAccess);

    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}

function getMIDIMessage(midiMessage) {
    value = midiMessage.data[2];
    channel = midiMessage.data[1];

    on = midiMessage.data[0];
    // if(on !== 254){
        console.log(on, channel, value);
    // }

    if (midiMessage.srcElement.name == "Akai APC20") {
        akaiMap[on][channel]();
    } else {
        glitch ? glitchMap[on]() : keyboardMap[channel]();
    }
}