import React, { Component } from 'react';
import Knob from './Knob';

class VolumeControls extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const array = ["Master Volume", "Chords Volume", "MIDI Volume"]; 
        return (
            <div className='volume-controls'>
                <table className='volume-controls'>
                    <tbody className='volume-controls'>
                        <tr className='volume-controls'>
                            {array.map((name, idx) => 
                                <td key={idx} className='volume-controls'>
                                    <Knob
                                        key={idx}
                                        idNumber={idx}
                                        change={this.props.change[idx]}
                                        name={name}
                                        id={"knob-"+idx+'-v'}
                                        minRange={0}
                                        maxRange={1}
                                        initial={0.7}
                                        img='k0-1-2'
                                    ></Knob>
                                </td>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default VolumeControls;