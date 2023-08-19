let channel, value, on;

let midiMap = new Array(300)
midiMap.fill(() => {})
console.log(midiMap);
midiMap[144] = () => {
    ribbons[ribbons.length] = new ribbon(images[floor(random(0, 2))], random(0, 100), random(0, width), -200);
}

midiMap[145] = () => {
    let tandyBanner = document.querySelector("#tandyBanner")
    for (let i = 0; i < 1000; i++) {
        ribbons[i] = new ribbon(images[floor(random(0, 2))], random(0, 100), random(0, width), -2000);
    }
    tandyBanner.style.opacity = 1;
}

window.addEventListener("keydown", (e)=>{
    if (e.key=="Enter"){
        let tandyBanner = document.querySelector("#tandyBanner")
        let messageOne = document.querySelector("#message1")
        let messageTwo = document.querySelector("#message2")
        let messageThree = document.querySelector("#message3")
        for (let i = 0; i < 1000; i++) {
            ribbons[i] = new ribbon(images[floor(random(0, 2))], random(0, 100), random(0, width), -2000);
        }
        setTimeout(() => {
            tandyBanner.style.opacity = 1;
        }, 700);
        var audio = new Audio('./tandy.mp3');
        setTimeout(() => {
            audio.play();
        }, 1000);
        setTimeout(() => {
            tandyBanner.style.opacity = 0
        }, 4800);
        setTimeout(() => {
            messageOne.style.opacity = 1
        }, 6000);
        setTimeout(() => {
            messageOne.style.opacity = 0
        }, 10500);
        setTimeout(() => {
            messageTwo.style.opacity = 1
        }, 11500);
        setTimeout(() => {
            messageTwo.style.opacity = 0
        }, 15500);
        setTimeout(() => {
            messageThree.style.opacity = 1
        }, 17000);
        setTimeout(() => {
            messageThree.style.opacity = 0
        }, 25000);
    }
})




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
    if (midiMessage.srcElement.name != "Scarlett 4i4 USB") {}
    console.log(on, channel, value);

    // if (value !== 0) {midiMap[on]();}
    midiMap[on]();
}