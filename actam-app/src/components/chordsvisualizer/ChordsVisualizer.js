import React, { Component } from 'react';
import ChordScore from './ChordScore';
import LoadingBar from './LoadingBar'
import './ChordsVisualizer.css';

class ChordsVisualizer extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
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
                <LoadingBar id={0} width={this.props.width} />
            </div>
        );
    }
}
 
export default ChordsVisualizer;