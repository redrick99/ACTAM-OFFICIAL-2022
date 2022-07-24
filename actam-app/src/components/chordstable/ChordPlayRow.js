import React, { Component } from 'react';
import ChordPlayCell from './ChordPlayCell';
import './ChordsTable.css'

/**
 * Table row containing the names of the chords to be played
 */
class ChordPlayRow extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <tr className='chord-play-row'> 
                {this.props.chords.map((chord, idx) => 
                    <ChordPlayCell key={idx} id={'c-play-'+idx} idNumber={idx} chordName={chord} drop={this.props.drop}/>
                )} 
            </tr>
        );
    }
}
 
export default ChordPlayRow;