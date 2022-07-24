/**
 * IIFE - Singleton Implementation.
 * 
 * Handles all that has to do with progression rules as a function of the modal scale
 * and the chosen root
 */
const chordProgressionHandler = (function() {
    let fundamental = 0; //Keeps track of the current fundamental
    let currentMode = 0; //Keeps track of the current modal scale

    // Constant variables which contain: all roots, the basic progression symbols,
    // the modal scales in order, the major scale chord tonalities and the ionian
    // tonal distance
    const rootKeys = "C C# D D# E F F# G G# A A# B".split(" ");
    const basicProgression = "I II III IV V VI VII".split(" ");
    const modalScalesText = "ionian dorian phrygian lydian mixolydian aeolian locrian".split(" ");
    const majorScale = "△ -7 -7 △ 7 -7 -7♭5".split(" ");
    const ionianTonalDistance = [2, 2, 1, 2, 2, 2, 1];

    // All modal scales and intervals (referred to the scales) are put in arrays to be easilly accessed
    // Positions in array: 0 = ionian, 1 = dorian, ..., 6 = locrian
    const modalScales = [];
    const scalesInterals = [];
    for(let i = 0; i < 7; i++) {
        modalScales[i] = majorScale.slice(i, majorScale.length).concat(majorScale.slice(0, i));
        scalesInterals[i] = ionianTonalDistance.slice(i, ionianTonalDistance.length).concat(ionianTonalDistance.slice(0, i));
    }

    // Map containing the actual integer distances between the notes of a chord given
    // the symbol of the tonality of the chord
    const chordTonalityMap = new Map();
    chordTonalityMap.set("△", [0, 4, 7, 11]);
    chordTonalityMap.set("-7", [0, 3, 7, 10]);
    chordTonalityMap.set("7", [0, 4, 7, 10]);
    chordTonalityMap.set("-7♭5", [0, 3, 6, 10])

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
            const newChords = changeModeOfChords(currentMode, index, chords);
            currentMode = index;
            return newChords;
        },
        /**
         * Changes the current fundamental given the root
         * @param {*} index of the chosen root
         */
        clickedOnRootKey: function(index) {
            if(index < 0 || index > rootKeys.length) return;
            fundamental = index;
        },
        /**
         * Getter of all root keys
         */
        getRootKeyes: function() {
            return rootKeys;
        },
        /**
         * Getter of all modal scales
         */
        getModalScales: function() {
            return modalScalesText;
        },
        /**
         * Getter of the chord progression given the current mode
         */
        getChordProgression: function() {
            return getProgressionFromModeIndex(currentMode);
        },
    };
})();

export default chordProgressionHandler;