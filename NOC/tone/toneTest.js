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
        "B4": "samples/multi5long.wav",
	},
	release: 1,
	baseUrl: "./",
}).toDestination();

window.addEventListener("keydown", (e) => {
    Tone.start()	
    // the loops start when the Transport is started
// ramp up to 800 bpm over 10 seconds
// Tone.Transport.bpm.rampTo(800, 10);
})