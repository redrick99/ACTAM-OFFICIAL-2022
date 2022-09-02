import * as Tone from 'tone'
import Instrument from './Instrument';

/**
 * IIFE - Singleton
 * Handles the audio of the chords being played
 */
const chordAudioHandler = (function() {
    const frequencies = [];
    // Contains an instrument used to play the chords
    const instrument = new Instrument();
    // Frequencies are pre-calculated 
    for (let i = 0; i < 128; i++) {
        frequencies[i] = Tone.Frequency(i, "midi").toFrequency();
    }

    return {
        /**
         * Plays a chord on a certain time with a certain duration
         * @param {array} chord integers defining the chord
         * @param {number} tStart when the chord's sound has to start
         * @param {number} tDuration when the chord's sound has to end
         */
        playChord: function(chord, tStart, tDuration) {
            const freqsArray = Array.from(chord.array, element => frequencies[element]);
            instrument.play(freqsArray, tStart, tDuration);
        },
        /**
         * Stops the chord from being played
         */
        stop: function() {
            instrument.stop(frequencies);
        },
        /**
         * Returns the instrument used to play the chords (to change its parameters)
         * @returns the instrument
         */
        getInstrument: function() {
            return instrument;
        },
        /**
         * Connects the instrument to an upper Gain Node
         * @param {Tone.Gain} node to connect to
         */
        connect: function(node) {
            instrument.connect(node);
        }
    }
})();

export default chordAudioHandler;