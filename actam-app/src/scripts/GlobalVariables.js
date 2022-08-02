import { Tonalities as T } from "./Tonalities";

export const rootKeys = "C C# D D# E F F# G G# A A# B".split(" ");
export const basicProgression = "I II III IV V VI VII".split(" ");
//export const majorScale = "△ -7 -7 △ 7 -7 -7♭5".split(" ");
export const majorScale = [T.MAJ, T.MIN, T.MIN, T.MAJ, T.DOM, T.MIN, T.HDIM];
export const ionianTonalDistance = [2, 2, 1, 2, 2, 2, 1];
export const modalScalesText = "ionian dorian phrygian lydian mixolydian aeolian locrian".split(" ");
export const voicingsTypes = "Rootless A, Rootless B, Monk, Powell 1, Powell 2, Powell 3, Powell 4, Three Notes, Four Notes, Open Chord 1, Open Chord 2".split(", ");

export const modalScales = [];
export const scalesDistances = [];
for(let i = 0; i < 7; i++) {
    modalScales[i] = majorScale.slice(i, majorScale.length).concat(majorScale.slice(0, i));
    scalesDistances[i] = ionianTonalDistance.slice(i, ionianTonalDistance.length).concat(ionianTonalDistance.slice(0, i));
}

export const chordTonalityMap = new Map();
chordTonalityMap.set("△", [0, 4, 7, 11]);
chordTonalityMap.set("-7", [0, 3, 7, 10]);
chordTonalityMap.set("7", [0, 4, 7, 10]);
chordTonalityMap.set("-7♭5", [0, 3, 6, 10])

export const assignables = {
    currentKey: 0,
    currentMode: 0,
    currentProgression: Array.from(basicProgression, (element, index) => element + majorScale[index]),
    currentModalIntervals: [],
    chords: Array(16).join(".").split("."),
    bpm: 60,
    loop: false,
    legato: true,
    waitingFunction: undefined,
    loadingBarFunction: undefined,
}

export const scoreOptions = {
    rWidth: 160,
    rHeight: 200,
    sPosX: 20,
    sPosY: 30,
    sWidth: 130,
}

export const functions = {
    getTonalityOfChord: function(grade) {
        return (modalScales[assignables.currentMode])[grade];
    },
    getChordSymbol: function(fundamental, tonality) {
        return rootKeys[fundamental % 12] + tonality;
    },
}
