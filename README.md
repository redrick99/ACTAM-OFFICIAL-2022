# ACTAM-OFFICIAL-2022
## Introduction and Tools
In music, in particular jazz, voicing is the vertical displacement of the notes in a chord. The goal of this web application is to propose an easy way to generate the most common voicing types.

The tools that has been used for this application are:
* Tone.js
* Node.js
* React
* *LINK ALLA PAGINA DELLA LIBRERIA PER SCRIVERE SUL PENTAGRAMMA*

## User Interface
The web application is very easy to use and understand. At the beginning it is possible to choose the key signature and the modal scale, then, with a double click or a drag and drop, it is possible to insert the chords in the top cells. It is possible to change the key signature and the modal scale, also after the insert of the chords or even when the player is running.

## Folder Structure
    src
    ├── components
    │   ├── chordstable
    │   │   ├── ChordModeCell.js
    │   │   ├── ChordModeRow.js
    │   │   ├── ChordPlayCell.js
    │   │   ├── ChordPlayRow.js
    │   │   ├── ChordProgressionCell.js
    │   │   ├── ChordProgressionRow.js
    │   │   ├── ChordRootCell.js
    │   │   ├── ChordRootRow.js
    │   │   ├── ChordsTable.css
    │   │   └── ChordsTable.js
    │   ├── chordsvisualizer
    │   │   ├── ChordsScore.js
    │   │   ├── ChordsVisualizer.css
    │   │   ├── ChordsVisualizer.js
    │   │   └── LoadingaBar.js
    │   ├── settings
    │   │   ├── CheckButton.js
    │   │   ├── GlobalSettings.css
    │   │   ├── GlobalSettings.js
    │   │   ├── Knob.css
    │   │   ├── Knob.js
    │   │   ├── KnobHandler.js
    │   │   ├── MidiButton.js
    │   │   ├── SettingsButton.js
    │   │   ├── SimpleInputSettings.js
    │   │   └── StartButton.js
    │   ├── voicingsselector
    │   │   ├── Selector.js
    │   │   ├── VoicingsSelector.css
    │   │   ├── VoicingsSelector.js
    │   │   └── VoicingsSelectorDescriptions.js
    │   ├── resources
    │   │   ├── Knob.png
    │   │   └── KnobIndicator.png
    │   ├── scripts
    │   │   ├── Chord.js
    │   │   ├── ChordAudioHandler.js
    │   │   ├── ChordProgressionHandler.js
    │   │   ├── GlobalVariables.js
    │   │   ├── Instruments.js
    │   │   ├── Tonalities.js
    │   │   ├── VoicingsFunctions.js
    │   │   └── VoicingsHandler.js
    │   ├── App.css
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    └──

