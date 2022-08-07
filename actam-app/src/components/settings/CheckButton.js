import React, { Component } from 'react';

class CheckButton extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <div id={this.props.id} className={this.props.className + (this.props.checked ? " checked" : "")} onClick={this.props.click}>
                {this.props.text}
            </div>
        );
    }
}
 
export default CheckButton;