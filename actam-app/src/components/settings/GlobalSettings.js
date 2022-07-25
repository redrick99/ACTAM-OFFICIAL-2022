import React, { Component } from 'react';
import CheckButton from './CheckButton';
import SimpleInputSetting from './SimpleInputSetting';

class GlobalSettings extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <div className='global-settings'>
                <div className='global-settings-sliders'>
                    <SimpleInputSetting className='master-volume-slider' id='master-volume-slider' labelText='Master Volume' type='range' min={0} max={1} step={0.05}
                    onChange={this.props.changeMasterVolume}/>
                    <SimpleInputSetting className='bpm-slider' id='bpm-slider' labelText='bpm' type='range' min={40} max={210} step={1}
                    onChange={this.props.changeBpm}/>
                    <SimpleInputSetting className='signature-slider' id='signature-slider' labelText='Signature (/4)' type='range' min={1} max={16} step={1}
                    onChange={this.props.changeSignature}/>
                </div>
                <div className='global-settings-buttons'>
                    <CheckButton id="midi-check-button" className="global-settings-check-button" text="MIDI Melody" click={() => console.log("Clicked")} />
                    <CheckButton id="beat-check-button" className="global-settings-check-button" text="Beat" click={() => console.log("Clicked")} />
                </div>
            </div>
        );
    }
}
 
export default GlobalSettings;