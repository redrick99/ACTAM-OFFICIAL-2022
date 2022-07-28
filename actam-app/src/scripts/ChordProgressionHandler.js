import { rootKeys, basicProgression, modalScales, modalScalesText, assignables} from "./GlobalVariables";
/**
 * IIFE - Singleton Implementation.
 * 
 * Handles all that has to do with progression rules as a function of the modal scale
 * and the chosen root
 */
const chordProgressionHandler = (function() {
    // -- Private functions -- //

    /**
     * Returns the progression with the chord tonality attached given the
     * modal scale
     * @param {*} index of the desired modal scale
     * @returns the chord progression in smbols
     */
    function getProgressionFromModeIndex(index) {
        const progression = [];
        const modalScale = modalScales[index];
        for(let i = 0; i < basicProgression.length; i++) {
            progression[i] = basicProgression[i].concat(modalScale[i]);
        }
        return progression;
    }

    /**
     * Changes the symbol of the chords inside an array when a new modal
     * scale is chosen
     * @param {*} oldModeIdx index of the previous modal scale 
     * @param {*} newModeIdx index of the new modal scale
     * @param {*} chords chord sybols to be changed
     * @returns a new array of chord symbols
     */
    function changeModeOfChords(oldModeIdx, newModeIdx, chords) {
        const oldProgression = getProgressionFromModeIndex(oldModeIdx);
        const newProgression = getProgressionFromModeIndex(newModeIdx);
        const newChords = [];

        for(let i = 0; i < chords.length; i++) {
            newChords[i] = chords[i] === "" ? "" : newProgression[oldProgression.indexOf(chords[i])];
        }

        return newChords;
    }
    
    // --- Public functions --- //
    return {
        /**
         * Changes the current mode and returns the new chords
         * @param {*} index of the chosen modal scale
         * @param {*} chords array containing the chord symbols to be changed
         * @returns a new array of chord symbols
         */
        clickedOnMode: function(index, chords) {
            if(index < 0 || index > modalScales.length) return;
            const newChords = changeModeOfChords(assignables.currentMode, index, chords);
            assignables.currentMode = index;
            return newChords;
        },
        /**
         * Changes the current fundamental given the root
         * @param {*} index of the chosen root
         */
        clickedOnRootKey: function(index) {
            if(index < 0 || index > rootKeys.length) return;
            assignables.currentKey = index;
        },
        /**
         * Getter of the chord progression given the current mode
         */
        getChordProgression: function() {
            assignables.currentProgression = getProgressionFromModeIndex(assignables.currentMode);
            return [...assignables.currentProgression];
        },
    };
})();

export default chordProgressionHandler;