---
layout: post
topic: "tutorial"
title: "We made an Apple ][ Selfie Studio"
excerpt_separator: <!--more-->
---

I'm currently at the <a href="https://www.recurse.com/">Recurse Center</a> in  New York, basically having fun and learning a lot...ok

A few of us have been hacking at the Apple ][ in the space, and decided to make a web/rust/audio selfie studio maker, here's what it looks like:

<div style="text-align: center;">
    <img src="/assets/images/apple2.jpg" style="width:400px">
</div>


<!--more-->

## What is all of this?

### Apple ][
The Apple ][ can accept audio as data to write directly to memory. It also has a '[high graphics mode](https://en.wikipedia.org/wiki/Apple_II_graphics#High-Resolution_(Hi-Res)_graphics)' which we can write directly to using the audio method. I basically just wanted a quick way to make drawings on my computer and put them onto the Apple ][...
The [memory mapping](https://archive.org/details/Apple_IIe_Technical_Reference_Manual/page/n67/mode/2up?view=theater) is crazy, idk what to say

### Rust bas2wav
Kevan Hollbach, also at RC, recently published [bas2wav](https://crates.io/crates/bas2wav), a rust crate which converts BASIC programs to wav files to run on the Apple ][. It wasn't too much of a leap for us to adapt the code to translate images and other arbitrary data to a wav file. We followed a [wasm tutorial](https://rustwasm.github.io/docs/book/introduction.html), and surprisingly it just worked - we could pass data from javascript to the rust code and get audio back, all client-side!!

Here's a snippet from Kevan's crate:

<pre>
<code class="language-rust">
/// Three-quarters of the maximum voltage value, assuming each sample is i8.
const AMPLITUDE: f64 = i8::MAX as f64 * 3. / 4.;

fn sine_wave(wav: &mut Wav, freq: f64, dur: Duration, invert: bool) -> Result<()> {
    let num_samples = dur.as_secs_f64() * wav.spec().sample_rate as f64;
    for i in 0..num_samples as u32 {
        let time = i as f64 / wav.spec().sample_rate as f64; // (in seconds)
        let sign = if invert { -1. } else { 1. };
        let sample = (time * freq * 2. * PI).sin() * sign; // [-1, 1]
        wav.write_sample((sample * AMPLITUDE) as i8)?; // [i8::MIN, i8::MAX]
    }
    Ok(())
}
</code>
</pre>

### Website
First we made a little pixel editor with html, envisioning a sort of MS Paint that exports to wav files for the Apple ][.
If you upload an image, we convert the data to HSL, pick some lightness threshold with a slider, and use that to convert to black and white.

Whatever is on the canvas is mapped in an array to the correct Apple ][ graphics memory layout, then the most significant bit is discarded, then the 7 bit-memory-mapped pixel data is fed into the rust crate, and the audio that comes out of that is finally played using an &lt;audio&gt; element.


<pre>
<code class="language-javascript">
// I told you the memory mapping's crazy
function pixelsToMemory(pixelBytes) {
    let mem = new Array(8192).fill(0);
    let i = 0;
    for (let band = 0; band < 3; band++) {
        for (let block_row = 0; block_row < 8; block_row++) {
            for (let pixel_row = 0; pixel_row < 8; pixel_row++) {
                for (let block_column = 0; block_column < 40; block_column++) {
                    let mem_offset = band * 0x28 + block_row * 0x80 + pixel_row * 0x400 + block_column;
                    mem[mem_offset] = pixelBytes[i];
                    i++;
                }
            }
        }
    }
    return mem;
}
</code>
</pre>

### Go ahead

Upload a picture, have fun! Make a drawing :)
Oh yeah if you have access to an Apple ][, here are the steps:
- Control + Reset
- HGR
- CALL -151
- 2000.3FFFR
- Click the "Save" button (Make sure you computer's audio output is going into the Apple ][)
- We'll release the web page soon that you can use to transmit data -- stay tuned!!