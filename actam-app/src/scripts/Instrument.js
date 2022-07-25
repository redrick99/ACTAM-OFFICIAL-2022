import * as Tone from 'tone'
import Chord from './Chord';

class Instrument {
    constructor() {
        this.sampler = new Tone.Sampler();

        //this.parentNode = parentNode;
        this.volume = new Tone.Gain();
        this.reverb = new Tone.Reverb();
        this.chorus = new Tone.Chorus();

        this.sampler.connect(this.reverb);
        this.reverb.connect(this.chorus);
        this.chorus.connect(this.volume);
        //this.volume.connect(this.parentNode);

        this.createSampler("https://tonejs.github.io/audio/salamander/");

        this.volume.gain.value = 0.8;
        this.reverb.wet.value = 0;
        this.chorus.wet.value = 0;
    }

    play(notes, start, duration) {
        this.sampler.triggerAttackRelease(notes, start, duration);
    }

    stop() {
        this.sampler.triggerRelease();
    }
    
    connect(node) {
        this.volume.connect(node);
    }

    createSampler(baseUrl_) {
        const sampAttack = this.sampler.attack;
        const sampRelease = this.sampler.release;
        this.sampler.disconnect(this.reverb);

        this.sampler = new Tone.Sampler({
            urls: {
                "A0": "A0.mp3",
                "C1": "C1.mp3",
                "D#1": "Ds1.mp3",
                "F#1": "Fs1.mp3",
                "A1": "A1.mp3",
                "C2": "C2.mp3",
                "D#2": "Ds2.mp3",
                "F#2": "Fs2.mp3",
                "A2": "A2.mp3",
                "C3": "C3.mp3",
                "D#3": "Ds3.mp3",
                "F#3": "Fs3.mp3",
                "A3": "A3.mp3",
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
                "C5": "C5.mp3",
                "D#5": "Ds5.mp3",
                "F#5": "Fs5.mp3",
                "A5": "A5.mp3",
                "C6": "C6.mp3",
                "D#6": "Ds6.mp3",
                "F#6": "Fs6.mp3",
                "A6": "A6.mp3",
                "C7": "C7.mp3",
                "D#7": "Ds7.mp3",
                "F#7": "Fs7.mp3",
                "A7": "A7.mp3",
                "C8": "C8.mp3",
            },
            attack: sampAttack,
            release: sampRelease,
            baseUrl: baseUrl_,
        }).connect(this.reverb);
    };
}

export default Instrument;