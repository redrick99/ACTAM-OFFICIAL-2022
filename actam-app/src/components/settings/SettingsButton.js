import React, { Component } from "react";
class SettingsButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        title={this.props.state ? "Close settings" : "Open settings to control chorous, reverb, attack and realise"}
        className={"settings-button " + (this.props.state ? "inactive" : "active")}
        onClick={this.props.active}
      />
    );
  }
}

export default SettingsButton;
