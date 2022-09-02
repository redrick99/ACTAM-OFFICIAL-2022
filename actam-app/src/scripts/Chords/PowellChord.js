import { assignables, scoreOptions } from "../GlobalVariables";
import ChordSuper from "./ChordSuper"

/**
 * Powell Voicings - ChordSuper Subclass
 */
class PowellChord extends ChordSuper {
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
        let f, n, symbol, array;

        switch(type) {
            case 0:
                f = this.fundamental+48;
                // Contains all notes intervals summed with the fundamental
                n = Array.from(intervals, x => x + f);
                symbol = this.getChordSymbol(f, this.tonality);
                array = [n[1], n[3]];
                break;

            case 1:
                f = assignables.currentKey > 7 ? this.fundamental+36 : this.fundamental+48;
        // Contains all notes intervals summed with the fundamental
                n = Array.from(intervals, x => x + f);
                symbol = this.getChordSymbol(f, this.tonality);
                array = [n[1], n[6]];
                break;

            case 2:
                f = assignables.currentKey > 7 ? this.fundamental+36 : this.fundamental+48;
                // Contains all notes intervals summed with the fundamental
                n = Array.from(intervals, x => x + f);
                symbol = this.getChordSymbol(f, this.tonality);
                array = [n[1], n[7]];
                break;

            case 3:
                f = assignables.currentKey > 7 ? this.fundamental+36 : this.fundamental+48;
                // Contains all notes intervals summed with the fundamental
                n = Array.from(intervals, x => x + f);
                symbol = this.getChordSymbol(f, this.tonality);
                array = [n[1]-12, n[10]-12];
                break;

            default:
                break;
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
        this.renderChord(this.array, divs.bass, scoreOptions.onlyOne, false);
        return [false, true];
    }

    /**
     * Checks if a chord is out of bounds, given absolute MIDI bounds
     * @returns true if the chord falls out of bounds
     */
    outOfBounds() {
        return Math.max(...this.array) > 61 || Math.min(...this.array) < 34;
    }
}

export default PowellChord;