import './App.css';
import React, { Component, useEffect } from 'react'
import * as Tone from 'tone'
import ChordsTable from './components/chordstable/ChordsTable';
import chordProgressionHandler from './scripts/ChordProgressionHandler';
import chordAudioHandler from './scripts/ChordAudioHandler';
import voicingsHandler from './scripts/VoicingsHandler';
import { assignables, master } from './scripts/GlobalVariables';
import ChordsVisualizer from './components/chordsvisualizer/ChordsVisualizer';
import Chord from './scripts/Chord';
import VoicingsSelector from './components/voicingsselector/VoicingsSelector';
import GlobalSettings from './components/settings/GlobalSettings';

function App() {
  const [chords, setChords] = React.useState(Array(16).join(".").split("."))
  const [visualizationChords, setVisualizationChords] = React.useState(['', '', '']);
  const [barWidth, setBarWidth] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [bpm, setBpm] = React.useState(60);
  const [loop, setLoop] = React.useState(false);
  const [legato, setLegato] = React.useState(true);

  async function init() {
    await Tone.start().then(() => {
      chordAudioHandler.connect(master);
      master.toDestination();
    });
  }
  
  function setChordsArray(chords) {
    setChords(chords);
    assignables.chords = chords;
  }

  function start(index) {
    stop();
    const result = chordProgressionHandler.getChords(assignables.chords, index, assignables.legato);
    if(result.ended) {
      assignables.loop ?  start(0) : stop();
      return;
    }
    //console.log("Number: "+(index+1));
    const chords = voicingsHandler.getVoicings(result.chords, result.duration);

    const time = result.duration*assignables.bpm/60;

    // Display Chord
    setPlaying(true);
    setVisualizationChords(chords);
    moveBar(time);

    // Play Chord
    const startT = Tone.now();
    chordAudioHandler.playChord(chords[1], startT, time, assignables.bpm);

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
      <ChordsVisualizer chords={visualizationChords} width={barWidth} hidden={false}/>
      <VoicingsSelector/>
    </div>
  );
}

export default App;
