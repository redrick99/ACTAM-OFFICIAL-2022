import voicingsFunctions from "./VoicingsFunctions";
import { ionianTonalDistance, scalesDistances, assignables, functions } from "./GlobalVariables";

const voicingsHandler = (function() {
    let intervalsPerGrade = Array.from(ionianTonalDistance, (_, grade) => getIntervals(grade, 0));
    let calculateVoicings = voicingsFunctions[0];
    assignables.currentModalIntervals = getIntervals(0, 0);

    function getIntervals(grade, modeIndex) {
        // First Grade Chord ==> grade = 0;
        const distances = scalesDistances[(grade+modeIndex) % 7];

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

    function getChordFundamental(mode, key, grade) {
        const intervals = scalesDistances[mode];
        let fund = key;
        intervals.slice(0, grade).forEach((element) => {
            fund += element;
        });
        return fund;
    }

    function getChordVoicings(symbol, duration) {
        const mode = assignables.currentMode;
        const key = assignables.currentKey;
        const grade = assignables.currentProgression.indexOf(symbol);
        const tonality = functions.getTonalityOfChord(grade);

        /*
        console.log("--------------------")
        console.log("Mode: "+mode);
        console.log("Key: "+key);
        console.log("Grade: "+grade);
        console.log("Tonality: "+tonality);
        */
    
        const fundamental = getChordFundamental(mode, key, grade);

        return calculateVoicings({
            fundamental: fundamental + 48, 
            key: key, 
            shift: 48,
            intervals: intervalsPerGrade[grade],
            tonality: tonality,
            duration: duration,
        });
    }

    return {
        clickedOnMode: function(index) {
            intervalsPerGrade = [];
            intervalsPerGrade = Array.from(ionianTonalDistance, (_, grade) => getIntervals(grade, index));
            assignables.currentModalIntervals = getIntervals(0, index);
        },

        setVoicingsType: function(index) {
            calculateVoicings = voicingsFunctions[index];
        },

        /*getVoicings: function(chord, duration) {
            if(!chord || chord === '')
                return '';
            return getChordVoicings(chord, duration);
        },*/

        getVoicings: function(chords, duration) {
            return Array.from(chords, chord => !chord || chord === '' ? '' : getChordVoicings(chord, duration));
        }
    }

})();

export default voicingsHandler;