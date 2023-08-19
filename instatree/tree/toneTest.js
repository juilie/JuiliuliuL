//create a synth and connect it to the main output (your speakers)
// import "https://unpkg.com/tone@14.7.77/build/Tone.js";
const Tone = window.Tone;
//play a middle 'C' for the duration of an 8th note
// const player = new Tone.Player("./samples/multi1.wav").toDestination();
const sampler = new Tone.Sampler({
	urls: {
		"C4": "samples/multi1.wav",
		"D#4": "samples/multi2.wav",
		"F#4": "samples/multi3.wav",
        "A4": "samples/multi4.wav",
	},
	release: 1,
	baseUrl: "./",
}).toDestination();

const loopA = new Tone.Loop(time => {
	sampler.triggerAttackRelease("A4", "8n", time);
}, "4n").start(0);
// play another note every off quarter-note, by starting it "8n"
const loopB = new Tone.Loop(time => {
	sampler.triggerAttackRelease("D4", "8n", time);
}, "4n").start("8n");


window.addEventListener("keydown", (e) => {
    Tone.start()
    Tone.Transport.start()
	// sampler.triggerAttackRelease(["Eb4"], 4);
    // the loops start when the Transport is started
// ramp up to 800 bpm over 10 seconds
Tone.Transport.bpm.rampTo(800, 10);
})