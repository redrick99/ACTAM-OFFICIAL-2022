import React, { Component } from "react";
class SettingsButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"settings-button " + (this.props.state ? "inactive" : "active")} onClick={this.props.active} />
    );
  }
}

export default SettingsButton;
