import { ionianTonalDistance, rootKeys, scalesDistances, modalScales, assignables } from "../GlobalVariables";
import * as Vex from "vexflow";
const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;

/**
 * Super class of all Chord Types
 */
class ChordSuper {
    // Contains all intervals divided by grade
    static intervalsPerGrade = Array.from(ionianTonalDistance, (_, grade) => ChordSuper.getIntervals(grade, 0));

    /**
     * Constructor of the ChordSuper class
     * @param {string} symbol of the chord 
     * @param {number} duration of the chord
     */
    constructor(symbol, duration) {
        this.duration = duration;
        // Grade is found using the current progression
        this.grade = assignables.currentProgression.indexOf(symbol);
        this.fundamental = this.#getChordFundamental(assignables.currentMode, assignables.currentKey, this.grade);
        this.tonality = this.#getChordTonality(this.grade);
    }

    /**
     * Finds the tonality of the chord given its grade
     * @param {number} grade of the chord
     * @returns the tonality of the chord
     */
    #getChordTonality(grade) {
        return (modalScales[assignables.currentMode])[grade];
    }

    /**
     * Finds the fundamental of the chord (at octave 0) given certain parameters
     * @param {number} mode currently clicked
     * @param {number} key currently clicked
     * @param {number} grade of the chord
     * @returns the fundamental of the chord (integer)
     */
    #getChordFundamental(mode, key, grade) {
        const intervals = scalesDistances[mode];
        let fund = key;
        intervals.slice(0, grade).forEach((element) => {
            fund += element;
        });
        return fund;
    }

    /**
     * Static method that calculates the intervals of the chord given
     * its grade and the current mode
     * @param {number} grade of the chord
     * @returns an array of intervals
     */
    static getIntervals(grade) {
        // First Grade Chord ==> grade = 0;
        const distances = scalesDistances[(grade+assignables.currentMode) % 7];

        // Initialized to 2 zeros to have the fundamental of the chord
        // corresponding to intervals[1]
        const intervals = [0, 0]; 
        
        let currentDistance = 0;
        
        // This way the array contains all notes of the chord up to the 14th
        // which will be useful in a later function to save computational time
        [...distances, ...distances.slice(0, 6)].forEach((element, index) => {
            currentDistance += element;
            intervals.push(currentDistance);
        });
        return intervals;
    }

    /**
     * Constructs the symbol of a chord
     * @param {number} fundamental of the chord
     * @param {string} tonality of the chord
     * @returns 
     */
    getChordSymbol(fundamental, tonality) {
        return rootKeys[fundamental % 12] + tonality;
    }

    /**
     * Abstract Method
     * Calculates the chords voicings
     */
    calculateVoicings() {
        throw new Error("Method has to be implemented!");
    }

    /**
     * Abstract Method
     * Draws the score of the chord inside two divs
     * @param {object} divs contains the bass and treble divs used to draw the score 
     * @returns two booleans being the treble and bass visualization options
     */
    drawScore(divs) {
        throw new Error("Method has to be implemented");
    }

    /**
     * Checks if a chord is out of bounds, given absolute MIDI bounds
     * @returns true if the chord falls out of bounds
     */
    outOfBounds() {
        return Math.max(...this.array) > 100 || Math.min(...this.array) < 10;
    }

    /**
     * Renders a score inside a div
     * @param {array} array containing the notes in integer form 
     * @param {element} div where to draw the score
     * @param {object} opt GUI options of the score
     * @param {boolean} treble true if the key is treble, false if bass 
     */
    renderChord(array, div, opt, treble, stemDirection = 0) {
        const score = this.#calculateScore(this.duration, array.sort((a, b) => a - b));

        div.innerHTML = '';
        const renderer = new Renderer(div, Renderer.Backends.SVG);
        renderer.resize(opt.rWidth, opt.rHeight);
        const context = renderer.getContext();

        const stave = new Stave(opt.sPosX, opt.sPosY, opt.sWidth);
        stave.addClef((treble ? 'treble' : 'bass'));
        stave.setContext(context).draw();

        if(score.length > 0) {
            const staveNote = new StaveNote({clef: (treble ? "treble" : "bass"), keys: score, duration: 'q' });
            staveNote.setStemDirection(stemDirection); 
            score.forEach((element, index) => {
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

    /**
     * Calculates the score of a chord given its array
     * @param {number} duration of the chord
     * @param {array} array containing the notes
     * @returns 
     */
    #calculateScore(duration, array) {
        const score = Array.from(array, (element) => {
            const octave = Math.floor(element/12) - ((assignables.octaveShift < 0 && assignables.selectedName > 2) ? 0 : 1);
            return rootKeys[element%12].toLowerCase() + '/' + octave;
        })
        return score;
    }

    /**
     * Static method
     * Recalculates the intervalsPerGrade array each time a mode is clicked
     * @param {number} index of the clicked mode 
     */
    static clickedOnMode(index) {
        ChordSuper.intervalsPerGrade = [];
        ChordSuper.intervalsPerGrade = Array.from(ionianTonalDistance, (_, grade) => ChordSuper.getIntervals(grade, index));
        assignables.currentModalIntervals = ChordSuper.getIntervals(0, index);
    }
}

export default ChordSuper;