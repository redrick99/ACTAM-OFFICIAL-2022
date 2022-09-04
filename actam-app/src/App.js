import './App.css';
import React from 'react'
import * as Tone from 'tone'
import { Piano, MidiNumbers } from 'react-piano';
import ChordsTable from './components/chordstable/ChordsTable';
import chordProgressionHandler from './scripts/ChordProgressionHandler';
import chordAudioHandler from './scripts/ChordAudioHandler';
import midiHandler from './scripts/MidiHandler';
import chordsFactory from './scripts/Chords/ChordsFactory';
import { assignables, master } from './scripts/GlobalVariables';
import ChordsVisualizer from './components/chordsvisualizer/ChordsVisualizer';
import VoicingsSelector from './components/voicingsselector/VoicingsSelector';
import 'react-piano/dist/styles.css';
import './components/piano.css'

/**
 * Array containing a set of three chords to be visualized
 */
let playChords = ['', '', ''];

function App() {
  // --- React States --- //
  // True if a MIDI is connected
  const [midiConnected, setMidiConnected] = React.useState(false);
  // Set of all chords picked by the user
  const [chords, setChords] = React.useState(Array(16).join(".").split("."));
  // Chords to be visualized while the audio is playing
  const [visualizationChords, setVisualizationChords] = React.useState(['', '', '']);
  // True if the application is currently playing chords
  const [playing, setPlaying] = React.useState(false);
  // Currently playing chord (for the keyboard)
  const [currentChord, setCurrentChord] = React.useState([]);
  // Currently playing MIDI notes (for the keyboard)
  const [currentPlayedNotes, setCurrentPlayedNotes] = React.useState([]);
  // True if the octave selector is active
  const [octaveActive, setOctaveActive] = React.useState(false);
  // First note of the keyboard
  const firstNote = MidiNumbers.fromNote('a0');
  // Last note of the keyboard
  const lastNote = MidiNumbers.fromNote('c8');

  /**
   * Async function that initializes all the components of the application.
   * Connects audio to the master node and connects MIDI devices
   */
  async function init() {
    await Tone.start().then(() => {
      chordAudioHandler.connect(master);
      midiHandler.connect(master);
      master.toDestination();
      midiHandler.init();
      setTimeout(() => {setMidiConnected(midiHandler.isMidiConnected())}, 100);
      midiHandler.setNoteChangeFunction(setMidiPlayedNotes);
      Tone.context.lookAhead = 0.05;
    });
  }

  /**
   * Sets MIDI notes currently playing to be visualized on the keyboard
   * @param {array} notes to be visualized 
   */
  function setMidiPlayedNotes(notes) {
    setCurrentPlayedNotes(notes);
  }
  
  /**
   * Sets the array of chords which the user picked
   * @param {array} chords to be visualized 
   */
  function setChordsArray(chords) {
    setChords(chords);
    assignables.chords = chords;
  }

  /**
   * Sets the octave selector to active if the voicing type
   * is to be played with two hands
   * @param {number} index of the voicing type 
   */
  function changeVoicingsType(index) {
    setOctaveActive(index > 2);
  }

  /**
   * Recursive MAIN LOOP - Plays the user-picked sequence of chords
   * Plays a chord at given index and sets a timeout to play the next chord
   * @param {number} index of the chord to play
   */
  function start(index) {
    stop();
    // Returns if there are no chords to be played
    if(assignables.chords[0] === '') {
      return;
    }

    // Checks if there are chords left to play
    const result = chordProgressionHandler.getChords(assignables.chords, index, assignables.legato);
    if(result.ended) {
      // If there are no chords left it either restarts the loop or stops
      assignables.loop ?  start(0) : stop();
      return;
    }

    // Calculates the array of three chords at the first loop iteration
    if(index === 0) {
      playChords = chordsFactory.getChords(result.chords, result.duration, assignables.selectedName, assignables.selectedType);
      chordsFactory.checkChords(playChords);
    }
    // Shifts chords and adds a new one on all other loop iterations
    else {
      playChords.shift();
      playChords.push((chordsFactory.getChords(result.chords, result.duration, assignables.selectedName, assignables.selectedType))[2]);
      chordsFactory.checkChords(playChords);
    }
    // Recalculates chords if the next chord falls out of bounds
    if(playChords[2] && playChords[2] !== '' && playChords[2].outOfBounds()) {
      playChords[2] = (chordsFactory.getChords(result.chords, result.duration, assignables.selectedName, assignables.selectedType))[2];
    }
    // Loop time depends on the bpm
    const time = result.duration*60/assignables.bpm;

    // Displays the chords
    setPlaying(true);
    setCurrentChord(playChords[1].array);
    setVisualizationChords(playChords);

    // Plays the current chord
    const startT = Tone.now();
    chordAudioHandler.playChord(playChords[1], startT, time);

    // Sets a timeout for the next chord
    assignables.waitingFunction = setTimeout(start, 1000*time, result.index);
  }

  /**
   * Stops the application
   */
  function stop() {
    clearTimeout(assignables.waitingFunction);
    
    // Stop audio
    chordAudioHandler.stop();
    // Stop animation
    setPlaying(false);
    setVisualizationChords(['', '', '']);
    setCurrentChord([]);
  }

  return (
    <div className="App">
      <div className='title'>
        <h1 className='title'>Voicings Generator</h1>
      </div>
      <ChordsTable setChords={setChordsArray} playChords={chords} cellsPerRow={16} active={playing} init={init} start={() => {chords[0] !== '' ? start(0) : stop()}} stop={stop}/>
      <ChordsVisualizer chords={visualizationChords} hidden={false} octaveActive={octaveActive} midiConnected={midiConnected} />
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
        }}
        stopNote={(midiNumber) => {
        }}
        width={904}
        disabled={false}
        activeNotes={currentChord.concat(currentPlayedNotes)}
      />
      <VoicingsSelector changeVoicingsType={changeVoicingsType}/>
    </div>
  );
}

export default App;
