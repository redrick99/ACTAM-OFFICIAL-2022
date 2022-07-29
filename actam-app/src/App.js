import './App.css';
import React from 'react'
import ChordsTable from './components/chordstable/ChordsTable';
import chordProgressionHandler from './scripts/ChordProgressionHandler';
import voicingsHandler from './scripts/VoicingsHandler';

function App() {
  const [chords, setChords] = React.useState(Array(16).join(".").split("."))
  const [bpm, setBpm] = React.useState(60);
  const [loop, setLoop] = React.useState(false);
  const [legato, setLegato] = React.useState(true);

  let waitingFunction;

  function setChordsArray(chords) {
    setChords(chords);
  }

  function start(index) {
    console.log("----- PLAY -----");
    if(waitingFunction) {
      clearTimeout(waitingFunction);
    }

    const [chordPreVoicings, index_, hasEnded] = chordProgressionHandler.getChord(chords, index, legato);

    const chord = voicingsHandler.getVoicings(chordPreVoicings);

    console.log(chord);

    // Play Chord
    // Display Chord

    if(hasEnded) {
      loop ?  waitingFunction = setTimeout(start, 1000*chordPreVoicings.duration*bpm/60, 0) : 
      waitingFunction = setTimeout(stop, 1000*chordPreVoicings.duration*bpm/60);
      return;
    }
    waitingFunction = setTimeout(start, 1000*chordPreVoicings.duration*bpm/60, index_);
  }

  function stop() {
    console.log("-----STOP-----");
    clearTimeout(waitingFunction);

    // Stop audio
    // Stop animation
  }

  return (
    <div className="App">
      <ChordsTable setChords={setChordsArray} playChords={chords} cellsPerRow={16} />
      <button onClick={() => {chords[0] !== '' ? start(0) : stop()}}>START</button>
    </div>
  );
}

export default App;
