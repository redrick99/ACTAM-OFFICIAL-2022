import './App.css';
import React from 'react'
import ChordsTable from './components/chordstable/ChordsTable';
import GlobalSettings from './components/settings/GlobalSettings';

function App() {
  return (
    <div className="App">
      <ChordsTable cellsPerRow={16}/>
    </div>
  );
}

export default App;
