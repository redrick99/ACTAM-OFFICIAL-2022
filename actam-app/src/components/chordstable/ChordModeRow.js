import React, { Component } from 'react';
import ChordModeCell from './ChordModeCell';

/**
 * Table row containing the name of all modal scales
 */
class ChordModeRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Array containing information about which cell is currently clicked
            isClicked: [1, 0, 0, 0, 0, 0, 0] 
        }
        this.click = this.click.bind(this);
    }

    /**
     * Updates the "isClicked" state to set the clicked cell as clicked.
     * Parent function "click" is also called
     * @param {*} index index of the clicked cell
     */
    click(index) {
        const newIsClicked = [0, 0, 0, 0, 0, 0, 0];
        newIsClicked[index] = 1;
        this.setState(() => ({
            isClicked: newIsClicked,
        }))
        this.props.click(index);
    }

    render() { 
        return (
            <table className='chord-mode-table'>
                <tbody>
                    <tr className='chord-mode-row'>
                        {this.props.modes.map((mode, idx) => 
                            <ChordModeCell key={idx} id={'c-mode-'+idx} idNumber={idx} mode={mode} click={this.click} isClicked={this.state.isClicked[idx]}/>
                        )}
                    </tr>
                </tbody>
            </table>
        );
    }
}
 
export default ChordModeRow;