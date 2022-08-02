import React, { Component } from 'react';
import ChordRootCell from './ChordRootCell';

/**
 * Table row containing the name of all chord roots
 */
class ChordRootRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Array containing information about which cell is currently clicked
            isClicked: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
        this.click = this.click.bind(this);
    }

    /**
     * Updates the "isClicked" state to set the clicked cell as clicked.
     * Parent function "click" is also called
     * @param {*} index index of the clicked cell
     */
    click(index) {
        const newIsClicked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        newIsClicked[index] = 1;
        this.setState(() => ({
            isClicked: newIsClicked,
        }));
        this.props.click(index);
    }

    render() { 
        return (
            <table className='chord-root-table'>
                <tbody>
                    <tr className='chord-root-row'>
                        {this.props.roots.map((root, idx) => 
                            <ChordRootCell key={idx} id={'c-root-'+idx} idNumber={idx} root={root} click={this.click} isClicked={this.state.isClicked[idx]}/>
                        )}
                    </tr>
                </tbody>
            </table>
        );
    }
}
 
export default ChordRootRow;