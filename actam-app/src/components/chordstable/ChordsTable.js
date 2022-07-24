import React, { Component } from 'react';
import ChordModeRow from './ChordModeRow';
import ChordPlayRow from './ChordPlayRow';
import ChordProgressionRow from './ChordProgressionRow';
import ChordRootRow from './ChordRootRow';
import chordProgressionHandler from '../../scripts/ChordProgressionHandler';
 
/**
 * Table where the chords to be played can be selected
 */
class ChordsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // chords to be played
            playChords: Array(16).join(".").split("."),
            // chords of the progression
            progression: chordProgressionHandler.getChordProgression(),
            // roots to be chosen
            roots: chordProgressionHandler.getRootKeyes(),
            // modal scaled to be chosen
            modalScales: chordProgressionHandler.getModalScales(),
        }

        this.clickRoot = this.clickRoot.bind(this);
        this.clickMode = this.clickMode.bind(this);
        this.drop = this.drop.bind(this);
    }

    /**
     * Called when a root cell is clicked.
     * It calls a method from the chordProgressionHandler
     * @param {*} index 
     */
    clickRoot(index) {
        chordProgressionHandler.clickedOnRootKey(index);
    }

    /**
     * Called when a root cell is clicked.
     * It calls a method from the chordProgressionHandler and
     * updates both "playChords" and "progression" states
     * @param {*} index 
     */
    clickMode(index) {
        this.setState(() => ({
            playChords: chordProgressionHandler.clickedOnMode(index, this.state.playChords),
            progression: chordProgressionHandler.getChordProgression(),
        }))
    }

    /**
     * Called when a progression or play-chord cell is dropped.
     * It sets the "playChords" state accordingly
     * @param {*} index 
     */
    drop(event) {
        try {
            const data = JSON.parse(event.dataTransfer.getData("draggedData"));
            const dropId = parseInt(event.target.closest("td").id.slice(-1));
            const newPlayChords = [...this.state.playChords]; //Duplicates the array

            // If the data has a dragId it means that it comes from a play-chord cell
            // so the two chords have to be switched
            if(data.dragId !== undefined) {
                const dragChord = newPlayChords[data.dragId];
                newPlayChords[data.dragId] = this.state.playChords[dropId];
                newPlayChords[dropId] = dragChord;
            }
            // Otherwise the data comes from a progression-cell so the value is
            // just copied
            else {
                newPlayChords[dropId] = data.chordName;
            }

            this.setState(() => ({
                playChords: newPlayChords,
            }))

        // An exeption is thrown if parsing fails
        } catch(e) {
            console.log("Error while parsing on Drop");
            console.log(e);
        }
    }

    render() { 
        return (
            <table>
                <tbody>
                   <ChordPlayRow chords={this.state.playChords} drop={this.drop}/>
                   <ChordProgressionRow progression={this.state.progression}/>
                   <ChordRootRow roots={this.state.roots} click={this.clickRoot}/>
                   <ChordModeRow modes={this.state.modalScales} click={this.clickMode}/> 
                </tbody>
            </table>
        );
    }
}
 
export default ChordsTable;