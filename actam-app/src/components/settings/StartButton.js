import React, { Component } from 'react';

class StartButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false,
        }

        this.start = this.start.bind(this);
    }

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