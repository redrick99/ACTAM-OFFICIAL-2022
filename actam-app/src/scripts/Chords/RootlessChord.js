import { assignables, scoreOptions } from "../GlobalVariables";
import { Tonalities } from "../Tonalities";
import ChordSuper from "./ChordSuper"

class RootlessChord extends ChordSuper {
    constructor(symbol, duration, type) {
        super(symbol, duration);
        this.calculateVoicings(type, ChordSuper.intervalsPerGrade[this.grade]);
    }

    calculateVoicings(type, intervals) {
        const f = assignables.currentKey > 7 ? (this.fundamental+36) : (this.fundamental+48);
        const n = Array.from(intervals, x => x + f);
        let array;
        let symbol;

        switch(type) {
            case 0:
                switch(this.tonality) {
                    case Tonalities.MAJ:
                        array = [n[3], n[5], n[7], n[9]];
                        symbol = this.getChordSymbol(f, "△9");
                        break;
        
                    case Tonalities.MIN:
                        array = [n[3], n[5], n[7], n[9]];
                        symbol = this.getChordSymbol(f, "m9");
                        break;
        
                    case Tonalities.DOM:
                        array = [n[7]-12, n[9]-12, n[3], n[13]-12];
                        symbol = this.getChordSymbol(f, "13");
                        break;
                    default:
                        array = [n[1], n[3], n[5]-12, n[7]-12];
                        symbol = this.getChordSymbol(f, Tonalities.HDIM)
                }
                break;

            case 1:
                switch(this.tonality) {
                    case Tonalities.MAJ:
                        array = [n[7], n[9], n[3]+12, n[5]+12];
                        symbol = this.getChordSymbol(f, "△9");
                        break;
        
                    case Tonalities.MIN:
                        array = [n[7], n[9], n[3]+12, n[5]+12];
                        symbol = this.getChordSymbol(f, "m9");
                        break;
        
                    case Tonalities.DOM:
                        array = [n[3], n[13]-12, n[7], n[9]];
                        symbol = this.getChordSymbol(f, "13");
                        break;
                    default:
                        array = [n[1], n[3], n[5], n[7]];
                        symbol = this.getChordSymbol(f, Tonalities.HDIM)
                }
                break;
            
                default:
                    break;
        }
        this.name = symbol;
        this.array = array;
    }

    drawScore(divs) {
        this.renderChord(this.array, divs.treble, scoreOptions.onlyOne, true);
        return [true, false];
    }
}

export default RootlessChord;