import React, { Component } from "react";
class PrinterButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={"printer-button "} onClick={this.props.print} />;
  }
}

export default PrinterButton;
