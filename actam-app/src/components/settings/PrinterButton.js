import React, { Component } from "react";
class PrinterButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div title="Print the chords" className={"printer-button "} onClick={this.props.print} />;
  }
}

export default PrinterButton;