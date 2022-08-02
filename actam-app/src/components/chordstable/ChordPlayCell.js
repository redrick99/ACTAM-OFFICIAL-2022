import React, { Component } from 'react';
import './ChordsTable.css'

/**
 * Table cell containing the name of a chord to be played
 */
class ChordPlayCell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // True if the "dragOver" event is triggered on the cell
            isDragOver: false,
        };

        this.dragStart = this.dragStart.bind(this);
        this.dragOver = this.dragOver.bind(this);
        this.dragLeave = this.dragLeave.bind(this);
        this.doubleClick = this.doubleClick.bind(this);
    }

    /**
     * Function called on "dragStart" event.
     * It sets the data to be used on drop with the dataTransfer object
     * @param {*} event drag event 
     */
    dragStart(event) {
        const data = {
            dragId: this.props.idNumber,
            chordName: this.props.chordName,
        }
        event.dataTransfer.setData("draggedData", JSON.stringify(data));
    }

    /**
     * Function called on "dragOver" event.
     * Sets "isDragOver" state to true
     * @param {*} event drag event 
     */
    dragOver(event) {
        event.preventDefault();
        this.setState(() => ({
            isDragOver: true,
        }));
    }

    /**
     * Function called on "dragLeave" event.
     * Sets "isDragOver" state to false
     * @param {*} event drag event 
     */
    dragLeave(event) {
        this.setState(() => ({
            isDragOver: false,
        }));
    }

    doubleClick(event) {
        this.props.doubleClick(this.props.idNumber);
    }

    render() {
        return (
            <td id={this.props.id} className={"chord-play-cell " + (this.state.isDragOver ? "drag-over " : "") + (this.props.chordName !== '' ? 'full' : '')}
                draggable={this.props.chordName != ""} onDragStart={this.dragStart}
                onDragOver={this.dragOver} onDragLeave={this.dragLeave} onDrop={this.props.drop} onDoubleClick={this.doubleClick}>
                {this.props.chordName}
            </td>
        );
    }
}

export default ChordPlayCell;