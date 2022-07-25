import React, { Component } from 'react';
import ChordProgressionCell from './ChordProgressionCell';
import './ChordsTable.css'

/**
 * Table row containing the names of the progression chords
 */
class ChordProgressionRow extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <tr className='chord-progression-row'>
                {this.props.progression.map((prog, idx) => 
                    <ChordProgressionCell key={idx} id={'c-prog-'+idx} chordName={prog} click={this.props.click} />
                )}
            </tr>
        );
    }
}
 
export default ChordProgressionRow;