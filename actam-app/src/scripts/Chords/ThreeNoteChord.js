import { assignables, scoreOptions } from "../GlobalVariables";
import { Tonalities } from "../Tonalities";
import ChordSuper from "./ChordSuper"

class ThreeNoteChord extends ChordSuper {
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

        switch(this.tonality) {
            case Tonalities.MAJ:
                array = [n[1], n[3]+12, n[7]+12];
                break;

            case Tonalities.MIN:
                array = [n[1], n[3]+12, n[7]+12];
                break;

            case Tonalities.DOM:
                array = [n[1], n[3]+12, n[7]];
                break;
            default:
                array = [n[1], n[3]+12, n[7]+12];
        }
        this.name = symbol;
        this.array = array;
    }

    drawScore(divs) {
        this.renderChord(this.array.slice(0, 1), divs.bass, scoreOptions, false);
        this.renderChord(this.array.slice(1, this.array.length), divs.treble, scoreOptions, true);
        return [true, true];
    }
}

export default ThreeNoteChord;