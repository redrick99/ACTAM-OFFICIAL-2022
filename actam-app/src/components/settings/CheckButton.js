import React, { Component } from 'react';

class CheckButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
        this.click = this.click.bind(this);
    }
    
    click(event) {
        const status = !this.state.checked;
        this.setState((prevState) => ({
            checked: !prevState.checked,
        }))
        this.props.click(status);
    }

    render() { 
        return (
            <div className={this.props.className}>
                <button id={this.props.id} className={this.props.className + (this.state.checked ? " checked" : "")} onClick={this.click}>
                    {this.props.text}
                </button>
            </div>
        );
    }
}
 
export default CheckButton;