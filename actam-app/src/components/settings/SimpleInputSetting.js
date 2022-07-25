import React, { Component } from 'react';

class SimpleInputSetting extends Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
    }

    change(event) {
        this.props.change(parseInt(event.target.value));
    }

    render() { 
        return (
            <div className={this.props.className}>
                <label htmlFor={this.props.id} className={this.props.className}>{this.props.labelText}</label>
                <input id={this.props.id} className={this.props.className} type={this.props.type} min={this.props.min} step={this.props.step}
                onChange={this.props.change ? this.change : null} onClick={this.props.click} />
            </div>
        );
    }
}
 
export default SimpleInputSetting;