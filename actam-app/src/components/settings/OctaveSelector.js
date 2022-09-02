import React, { Component } from 'react';

/**
 * Changes the octave
 */
class OctaveSelector extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <div className={'octave-selector '+(this.props.active ? 'active ' : ' ')}>
                <div className='octave-selector-buttons'>
                    <div 
                        className={'up '+(this.props.active ? 'active ' : ' ')+(this.props.value === this.props.max ? 'hid' : '')} 
                        onClick={this.props.active ? this.props.clickUp : null}
                    ></div>
                    <div 
                        className={'down '+(this.props.active ? 'active ' : ' ')+(this.props.value === this.props.min ? 'hid' : '')} 
                        onClick={this.props.active ? this.props.clickDown : null}
                    ></div>
                </div>
                <div className='octave-selector-indicator'>
                    {this.props.value}
                </div>
            </div>
        );
    }
}
 
export default OctaveSelector;