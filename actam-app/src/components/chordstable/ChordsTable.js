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
            playChords: Array(this.props.cellsPerRow).join(".").split("."),
            // chords of the progression
            progression: chordProgressionHandler.getChordProgression(),
            // roots to be chosen
            roots: chordProgressionHandler.getRootKeyes(),
            // modal scaled to be chosen
            modalScales: chordProgressionHandler.getModalScales(),
        }

        this.clickProgressionChord = this.clickProgressionChord.bind(this);
        this.clickRoot = this.clickRoot.bind(this);
        this.clickMode = this.clickMode.bind(this);
        this.drop = this.drop.bind(this);
        this.doubleClickPlayCell = this.doubleClickPlayCell.bind(this);
    }

    /**
     * Called when a progression chord cell is clicked.
     * Sets the text of the first play-chord empty cell
     * to the chord of the clicked cell
     * @param {*} chord progression chord of the clicked cell
     */
    clickProgressionChord(chord) {
        const newPlayChords = [...this.state.playChords];
        newPlayChords.find((element, index) => {
            if(element === "") {
                newPlayChords[index] = chord;
                this.checkArraySize(newPlayChords);
                this.setState(() => ({
                    playChords: newPlayChords,
                }))
                return true;
            }
        })
    }

    /**
     * Called when a root cell is clicked.
     * It calls a method from the chordProgressionHandler
     * @param {*} index of the root cell clicked
     */
    clickRoot(index) {
        chordProgressionHandler.clickedOnRootKey(index);
    }

    /**
     * Called when a mode cell is clicked.
     * It calls a method from the chordProgressionHandler and
     * updates both "playChords" and "progression" states
     * @param {*} index of the mode cell clicked
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
     * @param {*} event drop event
     */
    drop(event) {
        try {
            const data = JSON.parse(event.dataTransfer.getData("draggedData"));
            const dropId = event.target.closest("td").id.split('-').at(-1);
            const newPlayChords = [...this.state.playChords]; //Duplicates the array

            if(dropId > "0" && this.state.playChords[dropId - 1] === "") {
                return;
            }

            // If the data has a dragId it means that it comes from a play-chord cell
            // so the two chords have to be switched
            if(data.dragId !== undefined) {
                if(newPlayChords[dropId] === "" || newPlayChords[data.dragId] === "") {
                    return;
                }
                const dragChord = newPlayChords[data.dragId];
                newPlayChords[data.dragId] = this.state.playChords[dropId];
                newPlayChords[dropId] = dragChord;
            }
            // Otherwise the data comes from a progression-cell so the value is
            // just copied
            else {
                newPlayChords[dropId] = data.chordName;
            }
            this.checkArraySize(newPlayChords);

            this.setState(() => ({
                playChords: newPlayChords,
            }))

        // An exeption is thrown if parsing fails
        } catch(e) {
            console.log("Error while parsing on Drop");
            console.log(e);
        }
    }

    /**
     * Called then a "play-chord" cell is double-clicked
     * It removes the chord from the list and adjusts the array
     * accordingly
     * @param {*} index of the cell clicked
     */
    doubleClickPlayCell(index) {
        const newPlayChords = [...this.state.playChords];
        newPlayChords.splice(index, 1);
        newPlayChords.push('');
        newPlayChords.find((element, index) => {
            if(element === '' && index % (this.props.cellsPerRow) === (this.props.cellsPerRow-1)) {
                newPlayChords.splice(index + 1, newPlayChords.length - (index + 1));
            }
        })
        this.setState(() => ({
            playChords: newPlayChords,
        }))
    }

    /**
     * Checks if an array is full to fill it with new blank string elements 
     * @param {*} array to be checked
     */
    checkArraySize(array) {
        if(array.at(-1) !== '') {
            array = array.push(...Array(this.props.cellsPerRow).join(".").split("."));
        }
    }

    render() { 
        return (
            <div className='chords-table'>
                <table className='chords-table'>
                    <tbody className='chords-table'>
                        {this.state.playChords.map((chord, index, array) => {
                            if(index % this.props.cellsPerRow === 0) {
                                return <ChordPlayRow key={index} chords={array.slice(index, index + this.props.cellsPerRow)} 
                                drop={this.drop} idNumbers={Array.from({length: this.props.cellsPerRow}, (_, i) => index + i)}
                                doubleClick={this.doubleClickPlayCell}/>
                            }
                        })}
                    <ChordProgressionRow progression={this.state.progression} click={this.clickProgressionChord}/>
                    <ChordRootRow roots={this.state.roots} click={this.clickRoot}/>
                    <ChordModeRow modes={this.state.modalScales} click={this.clickMode}/> 
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default ChordsTable;