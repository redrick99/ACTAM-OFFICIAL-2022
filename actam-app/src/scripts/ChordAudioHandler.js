import * as Tone from 'tone'
import Instrument from './Instrument';
import Chord from './Chord';

const chordAudioHandler = (function() {
    const frequencies = [];
    const instrument = new Instrument();
    for (let i = 0; i < 128; i++) {
        frequencies[i] = Tone.Frequency(i, "midi").toFrequency();
    }

    return {
        playChord: function(chord, tStart, tDuration) {
            const freqsArray = Array.from(chord.array, element => frequencies[element]);
            instrument.play(freqsArray, tStart, tDuration);
        },
        stop: function() {
            instrument.stop(frequencies);
        },
        getInstrument: function() {
            return instrument;
        },
        connect: function(node) {
            instrument.connect(node);
        }
    }
})();

export default chordAudioHandler;