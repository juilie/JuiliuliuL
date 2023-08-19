let channel, value, on;

// let samples = [()=>{sampler.triggerAttackRelease(["C4"], 4)},()=>{sampler.triggerAttackRelease(["D#4"], 4);},()=>{sampler.triggerAttackRelease(["F#4"], 4);}, ()=>{sampler.triggerAttackRelease(["A4"], 4)}]
let samples = ["C4","D#4","F#4","A4"]
let beginSamples = false

let akaiMap = new Array(300);

for (let akai = 0; akai < akaiMap.length; akai++) {
    let tempArray = new Array(300);
    tempArray.fill(()=>{})
    akaiMap[akai] = tempArray
}

const loopA = new Tone.Loop(time => {
	sampler.triggerAttackRelease(samples[Math.floor([Math.random() * samples.length])], "8n", time);
}, "4n").start(0);

let midiMap = new Array(300)
midiMap.fill(() => {})

akaiMap[144][50] = ()=>{beginSamples = true}
akaiMap[128][50] = ()=>{beginSamples = false}

akaiMap[145][50] = ()=>{Tone.Transport.start(); console.log("hello");}
akaiMap[129][50] = ()=>{Tone.Transport.stop()}
akaiMap[128][53] = ()=>{sampler.triggerAttackRelease("B4", 4);}
akaiMap[182][7] = () => {Tone.Transport.bpm.value=(value  / 127) * 1000}

midiMap[254] = () => {sampler.triggerAttackRelease(samples[Math.floor([Math.random() * samples.length])], 4);}

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

    if (midiMessage.srcElement.name == "Akai APC20") {
        akaiMap[on][channel]();
    } else {
        beginSamples ? midiMap[on]() : null;
    }
    // if (value !== 0) {midiMap[on]();}
}