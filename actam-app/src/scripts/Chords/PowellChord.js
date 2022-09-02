import { assignables, scoreOptions } from "../GlobalVariables";
import ChordSuper from "./ChordSuper"

class PowellChord extends ChordSuper {
    constructor(symbol, duration, type) {
        super(symbol, duration);
        this.calculateVoicings(type, ChordSuper.intervalsPerGrade[this.grade]);
    }

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

    drawScore(divs) {
        this.renderChord(this.array, divs.bass, scoreOptions.onlyOne, false);
        return [false, true];
    }

    outOfBounds() {
        return Math.max(...this.array) > 61 || Math.min(...this.array) < 34;
    }
}

export default PowellChord;