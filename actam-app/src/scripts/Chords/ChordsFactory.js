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
            const chords = Array.from(symbols, symbol => !symbol || symbol === '' ? '' : this.createChord(symbol, duration, voicingName, voicingType));
            return chords;
        },

        /**
         * Shifts the next chord according to the values of the previous chord.
         * @param {array} chords to check 
         * @returns 
         */
        checkChords: function(chords) {
            if(!chords[2] || chords[2] === '') {
                return;
            }
            const maxPrevChord = Math.max(...chords[1].array);
            const minPrevChord = Math.min(...chords[1].array);
            const maxNextChord = Math.max(...chords[2].array);
            const minNextChord = Math.min(...chords[2].array);
            if(minNextChord >= (minPrevChord+6)) {
                chords[2].array = Array.from(chords[2].array, element => element-12);
            }
            else if(maxNextChord <= (maxPrevChord-6)) {
                chords[2].array = Array.from(chords[2].array, element => element+12);
            }
        },

        /**
         * Calculates chords when the sequence is printed
         * @param {array} symbols of the chords
         * @param {number} duration of the chords
         * @param {number} voicingName index of the voicing type selected
         * @param {number} voicingType index of the type of voicing type selected
         * @returns 
         */
        getChordsToPrint: function(symbols, duration, voicingName, voicingType) {
            const chords = this.getChords(symbols, duration, voicingName, voicingType);
            const printChords = [chords[0]];
            for(let i = 1; i < chords.length; i++) {
                if(chords[i] === '') {
                    break;
                }
                const maxPrevChord = Math.max(...chords[i-1].array);
                const minPrevChord = Math.min(...chords[i-1].array);
                const maxNextChord = Math.max(...chords[i].array);
                const minNextChord = Math.min(...chords[i].array);
                if(minNextChord >= (minPrevChord+6)) {
                    console.log(chords[i].array);
                    chords[i].array = Array.from(chords[i].array, element => element-12);
                }
                else if(maxNextChord <= (maxPrevChord-6)) {
                    chords[i].array = Array.from(chords[i].array, element => element+12);
                }
                if(chords[i].outOfBounds()) {
                    chords[i] = this.createChord(symbols[i], duration, voicingName, voicingType)
                    printChords.push(chords[i]);
                }
                else {
                    printChords.push(chords[i])
                }
            }
            return printChords;
        }
    }
})();

export default chordsFactory;