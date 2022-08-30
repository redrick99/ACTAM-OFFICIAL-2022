import React, { Component } from "react";
import './GlobalSettings.css';

class CheckButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={this.props.className + (this.props.checked ? " checked" : "")}
        onClick={this.props.click}
        title={this.props.title}
      >
        {this.props.text}
      </div>
    );
  }
}

export default CheckButton;
