import ChordSuper from "./ChordSuper";
import FourNoteChord from "./FourNoteChord";
import MonkChord from "./MonkChord";
import OpenChord from "./OpenChord";
import PowellChord from "./PowellChord";
import RootlessChord from "./RootlessChord"
import ThreeNoteChord from "./ThreeNoteChord";

/**
 * IIFE - Singleton and Factory used to create chords of a certain sub-class
 */
const chordsFactory = (function() {
    return {
        /**
         * Creates a chord of a certain sub-class given a chord symbol and other parameters
         * @param {string} symbol of the chord
         * @param {number} duration of the chord in "ticks"
         * @param {number} voicingName index of the voicing type selected
         * @param {number} voicingType index of the type of voicing type selected
         * @returns a chord of a certain sub-class 
         */
        createChord: function(symbol, duration, voicingName, voicingType) {
            switch(voicingName) {
                case 0:
                    return new RootlessChord(symbol, duration, voicingType);
                case 1:
                    return new MonkChord(symbol, duration, voicingType);
                case 2:
                    return new PowellChord(symbol, duration, voicingType);
                case 3:
                    return new ThreeNoteChord(symbol, duration, voicingType);
                case 4:
                    return new FourNoteChord(symbol, duration, voicingType);
                case 5:
                    return new OpenChord(symbol, duration, voicingType);
                default:
                    return new ChordSuper(symbol, duration);
            }
        },
        /**
         * Creates a list of chords of a certain sub-class given their symbols
         */
        getChords: function(symbols, duration, voicingName, voicingType) {
            return Array.from(symbols, symbol => !symbol || symbol === '' ? '' : this.createChord(symbol, duration, voicingName, voicingType));
        },
    }
})();

export default chordsFactory;