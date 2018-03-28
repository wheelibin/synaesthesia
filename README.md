Live demo: https://wheelibin.github.io/synaesthesia/
### Intro
This is a little experiment with creating randomly generated music in the browser.
It uses the amazing [Tone.js](https://tonejs.github.io/) (a wrapper around the Web Audio API).

All the sounds are generated using various Synth instruments from Tone.js, there are no samples.

### How it works
The "song" is generated like so:
 - A key is chosen (root note and scale, e.g. A Minor) 
 - A chord progression is generated for the key
 - A bassline is generated for the chord progression
 - A simple higher octave part is generated for the chord progression
 - Drums patterns for kick, snare, hihat, shaker, openhat are chosen to create percussion
 - A random BPM is chosen within a certain range
 - A random swing amount is chosen

All the elements are randomly chosen from various arrays, collections of instruments, and patterns.

The random number generator is seeded to allow recreation of the same randomly selected song.

### Have a play
Live demo available here: https://wheelibin.github.io/synaesthesia/

### Getting started
    npm install
    npm start

### Credits
 - This project is built on the amazing [Tone.js](https://tonejs.github.io/) library.
 - Lots of input and music theory assistance from [McHarper](https://github.com/mcharper) 
 - Javascript random number seed mechanism from https://github.com/davidbau/seedrandom