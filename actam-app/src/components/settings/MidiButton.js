import React, { Component } from "react";
class MidiButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        title={this.props.state ? "Close MIDI controls" : "Open MIDI controls"}
        className={"midi-button " + (this.props.state ? "inactive" : "active")}
        onClick={this.props.active}
      />
    );
  }
}

export default MidiButton;
