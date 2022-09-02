import { assignables, scoreOptions } from "../GlobalVariables";
import { Tonalities } from "../Tonalities";
import ChordSuper from "./ChordSuper"

/**
 * Four Note Voicings - ChordSuper Subclass
 */
class FourNoteChord extends ChordSuper {
    constructor(symbol, duration, type) {
        super(symbol, duration);
        this.calculateVoicings(type, ChordSuper.intervalsPerGrade[this.grade]);
    }

    /**
     * Calculates the chord's voicings
     * @param {number} type sub-type of the voicings type
     * @param {array} intervals of the chord's grade referring to the current mode
     */
    calculateVoicings(type, intervals) {
        const f = this.fundamental+(assignables.currentKey > 7 ? 36 : 48)+(assignables.octaveShift*12);;
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(intervals, x => x + f);
        const symbol = this.getChordSymbol(f, this.tonality);
        let array;

        switch(this.tonality) {
            case Tonalities.MAJ:
                array = [n[1], n[3]+12, n[5]+12, n[7]+12];
                break;

            case Tonalities.MIN:
                array = [n[1], n[3]+12, n[5]+12, n[7]+12];
                break;

            case Tonalities.DOM:
                array = [n[1], n[3]+12, n[5], n[7]];
                break;

            default:
                array = [n[1], n[3]+12, n[5]+12, n[7]+12];
        }
        this.name = symbol;
        this.array = array;
    }

    /**
     * Draws the score of the chord inside two distinct html elements
     * @param {object} divs contains the two html elements to which to draw the treble and bass staves 
     * @returns an array of booleans to hide or show the divs
     */
    drawScore(divs) {
        this.renderChord(this.array.slice(0, 1), divs.bass, scoreOptions.bass, false);
        this.renderChord(this.array.slice(1, this.array.length), divs.treble, scoreOptions.treble, true, -1);
        return [true, true];
    }

    /**
     * Checks if a chord is out of bounds, given absolute MIDI bounds
     * @returns true if the chord falls out of bounds
     */
    outOfBounds() {
        return Math.max(...this.array) > 88 || Math.min(...this.array) < 34;
    }
}

export default FourNoteChord;