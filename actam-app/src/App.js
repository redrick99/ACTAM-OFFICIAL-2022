import './App.css';
import React, { Component, useEffect } from 'react'
import * as Tone from 'tone'
import ChordsTable from './components/chordstable/ChordsTable';
import chordProgressionHandler from './scripts/ChordProgressionHandler';
import chordAudioHandler from './scripts/ChordAudioHandler';
import voicingsHandler from './scripts/VoicingsHandler';
import { assignables } from './scripts/GlobalVariables';
import ChordsVisualizer from './components/chordsvisualizer/ChordsVisualizer';

function App() {
  const [chords, setChords] = React.useState(Array(16).join(".").split("."))
  const [visualizationChords, setVisualizationChords] = React.useState(['', '', '']);
  const [barWidth, setBarWidth] = React.useState(0);
  const [hiddenVisualization, setHiddenVisualization] = React.useState(true);
  const [bpm, setBpm] = React.useState(60);
  const [loop, setLoop] = React.useState(false);
  const [legato, setLegato] = React.useState(true);

  async function init() {
    await Tone.start().then(() => {
      const master = new Tone.Gain();
      master.gain.value = 0.8;
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
    setHiddenVisualization(false);
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
    setHiddenVisualization(true);
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
      <ChordsTable setChords={setChordsArray} playChords={chords} cellsPerRow={16} />
      <button id='start-button' onClick={() => {chords[0] !== '' ? start(0) : stop()}}>START</button>
      <button id='init' onClick={init}>INIT</button>
      <ChordsVisualizer chords={visualizationChords} width={barWidth} hidden={hiddenVisualization}/>
    </div>
  );
}

export default App;
