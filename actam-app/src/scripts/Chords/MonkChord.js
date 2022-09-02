import { assignables, scoreOptions } from "../GlobalVariables";
import ChordSuper from "./ChordSuper"

/**
 * Monk Voicings - ChordSuper Subclass
 */
class MonkChord extends ChordSuper {
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
        const f = this.fundamental;
        const k = assignables.currentKey;
        const s = k > 3 ? 36 : 48;
        // Contains all notes intervals summed with the key
        const n = Array.from(assignables.currentModalIntervals, x => x + k);
        const symbol = this.getChordSymbol(f, this.tonality);

        let array;
        if(this.#isTonic(f, k)) {
            array = [s+n[7], s+n[1]+12, s+n[3]+12];
        }
        else {
            array = [s+n[3]+12, s+n[4]+12, s+n[6]+12];
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
        this.renderChord(this.array, divs.treble, scoreOptions.onlyOne, true);
        return [true, false];
    }

    /**
     * Checks if a chord is out of bounds, given absolute MIDI bounds
     * @returns true if the chord falls out of bounds
     */
    outOfBounds() {
        return Math.max(...this.array) > 73 || Math.min(...this.array) < 48;
    }

    /**
     * Checks if the chord is tonic given its fundamental and the current root key
     * @param {*} fundamental of the chord
     * @param {*} key currently used
     * @returns true if the chord is tonic
     */
    #isTonic(fundamental, key) {
        return key === (fundamental % 12);
    }
}

export default MonkChord;