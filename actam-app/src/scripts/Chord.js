import { rootKeys } from "./GlobalVariables";
import * as Vex from "vexflow";
const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;

class Chord {
    constructor(fundamental, array, duration, name) {
        this.fundamental = fundamental;
        this.array = array;
        this.duration = duration;
        this.score = this.#calculateScore(duration, array, fundamental);
        this.name = name;
    }

    #calculateScore(duration, array) {
        const score = Array.from(array, (element) => {
            return rootKeys[element%12].toLowerCase() + '/' + (Math.floor(element/12)-1);
        })
        return score;
    }

    renderScore(trebleDiv, opt) {
        trebleDiv.innerHTML = '';
        const renderer = new Renderer(trebleDiv, Renderer.Backends.SVG);
        renderer.resize(opt.rWidth, opt.rHeight);
        const context = renderer.getContext();

        const stave = new Stave(opt.sPosX, opt.sPosY, opt.sWidth);
        stave.addClef('treble');
        stave.setContext(context).draw();

        const staveNote = new StaveNote({ keys: this.score, duration: 'q' });
        this.score.forEach((element, index) => {
            if(element.includes("#")) {
                staveNote.addModifier(new Accidental('#'), index);
            }
        });

        const notes = [
            staveNote,
        ];
        const voice = new Voice({ num_beats: 1, beat_value: 4 });
        voice.addTickables(notes);

        new Formatter().joinVoices([voice]).format([voice], opt.sWidth);
        voice.draw(context, stave);
    }
}

export default Chord;