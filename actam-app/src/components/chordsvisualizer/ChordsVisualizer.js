import React, { Component } from 'react';
import ChordScore from './ChordScore';
import LoadingBar from './LoadingBar'
import './ChordsVisualizer.css';
import GlobalSettings from '../settings/GlobalSettings';

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
                <GlobalSettings />
            </div>
        );
    }
}
 
export default ChordsVisualizer;