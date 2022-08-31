import './App.css';
import React, { Component, useEffect } from 'react'
import * as Tone from 'tone'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import ChordsTable from './components/chordstable/ChordsTable';
import chordProgressionHandler from './scripts/ChordProgressionHandler';
import chordAudioHandler from './scripts/ChordAudioHandler';
import midiHandler from './scripts/MidiHandler';
import chordsFactory from './scripts/Chords/ChordsFactory';
import { assignables, master } from './scripts/GlobalVariables';
import ChordsVisualizer from './components/chordsvisualizer/ChordsVisualizer';
import VoicingsSelector from './components/voicingsselector/VoicingsSelector';
import ChordSuper from './scripts/Chords/ChordSuper';
import GlobalSettings from './components/settings/GlobalSettings';
import 'react-piano/dist/styles.css';
import './components/piano.css'

function App() {
  const [chords, setChords] = React.useState(Array(16).join(".").split("."))
  const [visualizationChords, setVisualizationChords] = React.useState(['', '', '']);
  const [barWidth, setBarWidth] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [currentChord, setCurrentChord] = React.useState([]);
  const [octaveActive, setOctaveActive] = React.useState(false);
  const firstNote = MidiNumbers.fromNote('a0');
  const lastNote = MidiNumbers.fromNote('c8');
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });

  async function init() {
    await Tone.start().then(() => {
      chordAudioHandler.connect(master);
      midiHandler.connect(master);
      master.toDestination();
      midiHandler.init();
      Tone.context.lookAhead = 0.05;
    });
  }
  
  function setChordsArray(chords) {
    setChords(chords);
    assignables.chords = chords;
  }

  function changeVoicingsType(index) {
    setOctaveActive(index > 2);
  }

  function start(index) {
    stop();
    const result = chordProgressionHandler.getChords(assignables.chords, index, assignables.legato);
    if(result.ended) {
      assignables.loop ?  start(0) : stop();
      return;
    }
    //console.log("Number: "+(index+1));
    const chords = chordsFactory.getChords(result.chords, result.duration, assignables.selectedName, assignables.selectedType);
    const time = result.duration*60/assignables.bpm;

    // Display Chord
    setPlaying(true);
    setCurrentChord(chords[1].array);
    setVisualizationChords(chords);
    moveBar(time);

    // Play Chord
    const startT = Tone.now();
    chordAudioHandler.playChord(chords[1], startT, time);

    assignables.waitingFunction = setTimeout(start, 1000*time, result.index);
  }

  function stop() {
    clearTimeout(assignables.waitingFunction);
    
    // Stop audio
    chordAudioHandler.stop();
    // Stop animation
    setPlaying(false);
    setBarWidth(0);
    setVisualizationChords(['', '', '']);
    setCurrentChord([]);
  }

  function moveBar(time) {
    if(assignables.loadingBarFunction) {
      clearInterval(assignables.loadingBarFunction)
    }
    let width = 0;
    assignables.loadingBarFunction = setInterval(() => {
      if(width >= 100) {
        clearInterval(assignables.loadingBarFunction);
      }
      else {
        width++;
        setBarWidth(width);
      }
    }, time/0.1);
     
  }

  return (
    <div className="App">
      <h1 className='title'>Voicings Generator</h1>
      <ChordsTable setChords={setChordsArray} playChords={chords} cellsPerRow={16} active={playing} init={init} start={() => {chords[0] !== '' ? start(0) : stop()}} stop={stop}/>
      <ChordsVisualizer chords={visualizationChords} width={barWidth} hidden={false} octaveActive={octaveActive}  />
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          // Play a given note - see notes below
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={904}
        disabled={false}
        activeNotes={currentChord}
      />
      <VoicingsSelector changeVoicingsType={changeVoicingsType}/>
    </div>
  );
}

export default App;
