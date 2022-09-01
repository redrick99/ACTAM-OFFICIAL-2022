import { assignables, scoreOptions } from "../GlobalVariables";
import { Tonalities } from "../Tonalities";
import ChordSuper from "./ChordSuper"

class OpenChord extends ChordSuper {
    constructor(symbol, duration, type) {
        super(symbol, duration);
        this.calculateVoicings(type, ChordSuper.intervalsPerGrade[this.grade]);
    }

    calculateVoicings(type, intervals) {
        const f = this.fundamental+48+(assignables.octaveShift*12);
        // Contains all notes intervals summed with the fundamental
        const n = Array.from(intervals, x => x + f);
        const symbol = this.getChordSymbol(f, this.tonality);
        let array;

        switch(type) {
            case 0:
                array = [n[1], n[10], n[5]+12, n[7]+12];
                break;

            case 1:
                array = [n[1], n[7], n[3]+12, n[5]+12];
                break;
            
            default:
                break;
        }
        this.name = symbol;
        this.array = array;
    }

    drawScore(divs) {
        this.renderChord(this.array.slice(0, 2), divs.bass, scoreOptions.bass, false, 0);
        this.renderChord(this.array.slice(2, this.array.length), divs.treble, scoreOptions.treble, true, -1);
        return [true, true];
    }
}

export default OpenChord;