import React, { Component } from 'react';
import ChordModeRow from './ChordModeRow';
import ChordPlayRow from './ChordPlayRow';
import ChordProgressionRow from './ChordProgressionRow';
import ChordRootRow from './ChordRootRow';
import chordProgressionHandler from '../../scripts/ChordProgressionHandler';
import voicingsHandler from '../../scripts/VoicingsHandler';
import { modalScalesText, rootKeys, voicingsTypes } from '../../scripts/GlobalVariables'
import StartButton from '../settings/StartButton';
 
/**
 * Table where the chords to be played can be selected
 */
class ChordsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // chords of the progression
            progression: chordProgressionHandler.getChordProgression(),
            // roots to be chosen
            roots: rootKeys,
            // modal scaled to be chosen
            modalScales: modalScalesText,
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
        const newPlayChords = [...this.props.playChords];
        newPlayChords.find((element, index) => {
            if(element === "") {
                newPlayChords[index] = chord;
                this.checkArraySize(newPlayChords);
                this.props.setChords(newPlayChords);
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
        this.props.setChords(chordProgressionHandler.clickedOnMode(index, this.props.playChords));
        this.setState(() => ({
            progression: chordProgressionHandler.getChordProgression(),
        }))
        voicingsHandler.clickedOnMode(index);
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
            const newPlayChords = [...this.props.playChords]; //Duplicates the array

            if(dropId > "0" && this.props.playChords[dropId - 1] === "") {
                return;
            }

            // If the data has a dragId it means that it comes from a play-chord cell
            // so the two chords have to be switched
            if(data.dragId !== undefined) {
                if(newPlayChords[dropId] === "" || newPlayChords[data.dragId] === "") {
                    return;
                }
                const dragChord = newPlayChords[data.dragId];
                newPlayChords[data.dragId] = this.props.playChords[dropId];
                newPlayChords[dropId] = dragChord;
            }
            // Otherwise the data comes from a progression-cell so the value is
            // just copied
            else {
                newPlayChords[dropId] = data.chordName;
            }
            this.checkArraySize(newPlayChords);
            this.props.setChords(newPlayChords);

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
        const newPlayChords = [...this.props.playChords];
        newPlayChords.splice(index, 1);
        newPlayChords.push('');
        newPlayChords.find((element, index) => {
            if(element === '' && index % (this.props.cellsPerRow) === (this.props.cellsPerRow-1)) {
                newPlayChords.splice(index + 1, newPlayChords.length - (index + 1));
            }
        })
        this.props.setChords(newPlayChords);
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
            <React.Fragment>
            <div className='chords-table'>
                <table className='chord-play-table'>
                    <tbody>
                    {this.props.playChords.map((chord, index, array) => {
                        if(index % this.props.cellsPerRow === 0) {
                            return <ChordPlayRow key={index} chords={array.slice(index, index + this.props.cellsPerRow)} 
                            drop={this.drop} idNumbers={Array.from({length: this.props.cellsPerRow}, (_, i) => index + i)}
                            doubleClick={this.doubleClickPlayCell}/>
                        }
                    })}
                    </tbody>
                </table>
                <div className='play-div'>
                    <div className='chords-options'>
                    <ChordProgressionRow progression={this.state.progression} click={this.clickProgressionChord}/>
                    <ChordRootRow roots={this.state.roots} click={this.clickRoot}/>
                    <ChordModeRow modes={this.state.modalScales} click={this.clickMode}/> 
                    </div>
                    <StartButton active={this.props.active} stop={this.props.stop} start={this.props.start} init={this.props.init}/>
                </div>
            </div>
            </React.Fragment>
        );
    }
}
 
export default ChordsTable;