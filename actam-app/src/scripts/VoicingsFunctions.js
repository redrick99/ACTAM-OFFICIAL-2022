import { Tonalities } from "./Tonalities";
import Chord from "./Chord";
import { rootKeys, functions, assignables } from "./GlobalVariables";

function getChordSymbol(fundamental, tonality) {
    return rootKeys[fundamental % 12] + tonality;
}

function isTonic(fundamental, key) {
    return key === (fundamental % 12);
}

const voicingsFunctions = [
    /**
     * options:
     * - fundamental
     * - key
     * - intervals
     * - tonality
     * - duration
     */

    // Rootless - Type A
    (options) => {
        const f = options.fundamental;
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(options.intervals, x => x + f);

        let array;
        let symbol;

        switch(options.tonality) {
            case Tonalities.MAJ:
                array = [n[3], n[5], n[7], n[9]];
                symbol = functions.getChordSymbol(f, "△9");
                break;

            case Tonalities.MIN:
                array = [n[3], n[5], n[7], n[9]];
                symbol = functions.getChordSymbol(f, "-9");
                break;

            case Tonalities.DOM:
                array = [n[7]-12, n[9]-12, n[3], n[13]];
                symbol = functions.getChordSymbol(f, "13");
                break;
            default:
                array = [n[1], n[3], n[5], n[7]];
                symbol = functions.getChordSymbol(f, "-7♭5")
        }

        return new Chord(f, array, options.duration, symbol) // Duration #TODO
    },

    // Rootless - Type B
    (options) => {
        const f = options.fundamental;
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(options.intervals, x => x + f);

        let array;
        let symbol;

        switch(options.tonality) {
            case Tonalities.MAJ:
                array = [n[7]-12, n[9]-12, n[3], n[5]];
                symbol = functions.getChordSymbol(f, "△9");
                break;

            case Tonalities.MIN:
                array = [n[7]-12, n[9]-12, n[3], n[5]];
                symbol = functions.getChordSymbol(f, "-9");
                break;

            case Tonalities.DOM:
                array = [n[3], n[13]-12, n[7], n[9]];
                symbol = functions.getChordSymbol(f, "13");
                break;
            default:
                array = [n[1], n[3], n[5], n[7]];
                symbol = functions.getChordSymbol(f, "-7♭5")
        }

        return new Chord(f, array, options.duration, symbol); 
    },

    // Monk Chord Voicings 
    (options) => {
        const f = options.fundamental;
        const k = options.key;
        const s = options.shift;
        // Contains all notes intervals summed with the key
        const n = Array.from(assignables.currentModalIntervals, x => x + k);
        const symbol = getChordSymbol(f, options.tonality);

        let array;
        if(isTonic(f, k)) {
            array = [s+n[7]-12, s+n[1], s+n[3]];
        }
        else {
            array = [s+n[3], s+n[4], s+n[6]];
        }
        return new Chord(f, array, options.duration, symbol);
    },

    // Bud Powell Chord Voicings - Type 1
    (options) => {
        const f = options.fundamental;
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(options.intervals, x => x + f);
        const symbol = getChordSymbol(f, options.tonality);
        const array = [n[1], n[3]];

        return new Chord(f, array, options.duration, symbol);
    },

    // Bud Powell Chord Voicings - Type 2
    (options) => {
        const f = options.fundamental;
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(options.intervals, x => x + f);
        const symbol = getChordSymbol(f, options.tonality);
        const array = [n[1], n[6]];

        return new Chord(f, array, options.duration, symbol);
    },

    // Bud Powell Chord Voicings - Type 3
    (options) => {
        const f = options.fundamental;
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(options.intervals, x => x + f);
        const symbol = getChordSymbol(f, options.tonality);
        const array = [n[1], n[7]];

        return new Chord(f, array, options.duration, symbol);
    },

    // Bud Powell Chord Voicings - Type 4
    (options) => {
        const f = options.fundamental;
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(options.intervals, x => x + f);
        const symbol = getChordSymbol(f, options.tonality);
        const array = [n[1], n[10]];

        return new Chord(f, array, options.duration, symbol);
    },

    // Three Note Voicings
    (options) => {
        const f = options.fundamental;
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(options.intervals, x => x + f);
        const symbol = getChordSymbol(f, options.tonality);
        const array = [n[1]-12, n[3], n[7]];

        return new Chord(f, array, options.duration, symbol);
    },

    // Four Note Voicings
    (options) => {
        const f = options.fundamental;
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(options.intervals, x => x + f);
        const symbol = getChordSymbol(f, options.tonality);
        const array = [n[1]-12, n[3], n[5], n[7]];

        return new Chord(f, array, options.duration, symbol); 
    },

    // Open Chord Voicings - Type 1
    (options) => {
        const f = options.fundamental;
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(options.intervals, x => x + f);
        const symbol = getChordSymbol(f, options.tonality);
        const array = [n[1]-12, n[2], n[5], n[7]];

        return new Chord(f, array, options.duration, symbol); 
    },

    // Open Chord Voicings - Type 2
    (options) => {
        const f = options.fundamental;
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(options.intervals, x => x + f);
        const symbol = getChordSymbol(f, options.tonality);
        const array = [n[1]-12, n[7]-12, n[3], n[5]];

        return new Chord(f, array, options.duration, symbol); 
    }
]

export default voicingsFunctions;