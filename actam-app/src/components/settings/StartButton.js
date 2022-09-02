import React, { Component } from 'react';

/**
 * Start button of the application
 */
class StartButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Used to initialize Tone at the first click
            initialized: false,
        }

        this.start = this.start.bind(this);
    }

    /**
     * Initializes and starts the application
     */
    start() {
        if(!this.state.initialized) {
            this.props.init();
            this.setState(() => ({
                initialized: true,
            }));
        }
        this.props.start();
    }

    render() { 
        return (
            <div className={'start-button '+(this.props.active ? 'active' : 'inactive')} onClick={this.props.active ? this.props.stop : this.start}>
                {this.props.active ? 'STOP' : 'START'}
            </div>
        );
    }
}
 
export default StartButton;