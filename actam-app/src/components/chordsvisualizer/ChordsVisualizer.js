import React, { Component } from 'react';
import ChordScore from './ChordScore';
import './ChordsVisualizer.css';

class ChordsVisualizer extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <table className='chords-visualizer center'>
                <tbody>
                    <tr className='chords-visualizer'>
                        {this.props.chords.map((chord, idx) =>  
                            <ChordScore played={idx == 1} key={idx} id={idx} chord={chord} />
                        )}
                    </tr>
                </tbody>
            </table>
        );
    }
}
 
export default ChordsVisualizer;