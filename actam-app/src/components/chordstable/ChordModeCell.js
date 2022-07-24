import React, { Component } from 'react';
import './ChordsTable.css'

/**
 * Table cell containing the name of a modal scale
 */
class ChordModeCell extends Component {
    constructor(props) {
        super(props);
        // Binding functions to "this"
        this.click = this.click.bind(this);
    }

    /**
     * Parent function "click" is called when the cell is clicked
     * @param {*} event click event
     */
    click(event) {
        this.props.click(this.props.idNumber)
    }
    
    render() { 
        return (
            <td id={this.props.id} className={'chord-mode-cell '+ (this.props.isClicked ? 'clicked' : '')} onClick={this.click}>
                {this.props.mode}
            </td>
        );
    }
}
 
export default ChordModeCell;