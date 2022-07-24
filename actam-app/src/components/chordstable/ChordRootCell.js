import React, { Component } from 'react';
import './ChordsTable.css'

/**
 * Table cell containing the name of a chord root
 */
class ChordRootCell extends Component {
    constructor(props) {
        super(props);

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
            <td id={this.props.id} className={'chord-root-cell '+ (this.props.isClicked ? 'clicked' : '')} onClick={this.click}>
                {this.props.root}
            </td>
        );
    }
}
 
export default ChordRootCell;