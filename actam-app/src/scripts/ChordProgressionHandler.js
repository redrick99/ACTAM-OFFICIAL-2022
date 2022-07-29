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

        parseChordsArray: function(array, legato) {
            const chords = [];
            if(legato) {
                let prevSymbol= ''
                let duration_ = 1;
                array.forEach((symbol) => {
                    if(symbol === '') return chords;
                    if(symbol === prevSymbol) chords[chords.length-1].duration ++;
                    else {
                        prevSymbol = symbol;
                        chords.push({
                            symbol: symbol,
                            duration: duration_,
                        })
                    }
                })
            }
            else {
                array.forEach((symbol) => {
                    if(symbol === '') return chords;
                    chords.push({
                        symbol: symbol,
                        duration: 1,
                    })
                })
            }
            return chords;
        },

        getChord: function(chords, index, legato) {
            if(legato) {
                const symbol = chords[index];
                let duration_ = 1;
                for(let i = index+1; i < chords.length; i++) {
                    if(symbol === chords[i]) { 
                        duration_ ++;
                    }
                    else {
                        return [{ symbol: symbol, duration: duration_, }, i, chords[i] === '' || chords[i] === undefined];
                    }
                }
            }
            else {
                return [{ symbol: chords[index], duration: 1, }, ++index,  chords[index] === '' || chords[index] === undefined];
            }
        }
    };
})();

export default chordProgressionHandler;