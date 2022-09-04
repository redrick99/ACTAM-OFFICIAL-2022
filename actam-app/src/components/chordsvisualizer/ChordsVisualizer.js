import React, { Component } from 'react';
import ChordScore from './ChordScore';
import './ChordsVisualizer.css';
import GlobalSettings from '../settings/GlobalSettings';

/**
 * Contains the table where currently played chords are visualized
 */
class ChordsVisualizer extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <div className='chords-visualizer-container'>
                <div className={'chords-visualizer center '+(this.props.hidden ? 'hidden' : '')}>
                    <table className='chords-visualizer'>
                        <tbody>
                            <tr className='chords-visualizer'>
                                {this.props.chords.map((chord, idx) =>  
                                    <ChordScore played={idx == 1} key={idx} id={idx} chord={chord} />
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <GlobalSettings octaveActive={this.props.octaveActive} midiConnected={this.props.midiConnected} />
            </div>
        );
    }
}
 
export default ChordsVisualizer;