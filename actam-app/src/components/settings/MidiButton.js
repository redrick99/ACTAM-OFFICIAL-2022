import React, { Component } from "react";
class MidiButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={"midi-button " + (this.props.state ? "inactive" : "active")} onClick={this.props.active} />;
  }
}

export default MidiButton;
