import React, { Component } from 'react';
import './ChordsTable.css'

/**
 * Table cell containing the name of a progression chord
 */
class ChordProgressionCell extends Component {
    constructor(props) {
        super(props);

        this.dragStart = this.dragStart.bind(this);
        this.click = this.click.bind(this);
    }

    /**
     * Function called on "dragStart" event.
     * It sets the data to be used on drop with the dataTransfer object
     * @param {*} event drag event 
     */
    dragStart(event) {
        const data = {
            chordName: this.props.chordName,
        }
        event.dataTransfer.setData("draggedData", JSON.stringify(data));
    }

    /**
     * Function called on "dragStart" event.
     * It calls the "click" function from the component's properties
     * @param {*} event drag event 
     */
    click(event) {
        this.props.click(this.props.chordName);
    }

    render() { 
        return (  
            <td id={this.props.id} className="chord-progression-cell"
                draggable="true" onDragStart={this.dragStart} onClick={this.click}>
                {this.props.chordName}
            </td>
        );
    }
}
 
export default ChordProgressionCell;