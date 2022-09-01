import { assignables, scoreOptions } from "../GlobalVariables";
import ChordSuper from "./ChordSuper"

class MonkChord extends ChordSuper {
    constructor(symbol, duration, type) {
        super(symbol, duration);
        this.calculateVoicings(type, ChordSuper.intervalsPerGrade[this.grade]);
    }

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

    drawScore(divs) {
        this.renderChord(this.array, divs.treble, scoreOptions.onlyOne, true);
        return [true, false];
    }

    #isTonic(fundamental, key) {
        return key === (fundamental % 12);
    }
}

export default MonkChord;