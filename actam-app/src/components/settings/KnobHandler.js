import React, { Component } from "react";
import ReactDOM from "react-dom";
import Knob from "./Knob";

class KnobHandler extends Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }

  state = {
    knobs: [
      { id: 0, value: 50, name: "volume" },
      { id: 1, value: 50, name: "wet" },
      { id: 2, value: 50, name: "harmonic" },
      { id: 3, value: 50, name: "voiceTension" },
    ],
  };

  change(value, id) {
    const newKnobs = [...this.state.knobs];
    newKnobs[id].value = value;

    this.setState(() => ({
      knobs: newKnobs,
    }));
  }

  render() {
    return (
      <div>
        {this.state.knobs.map((knob, index) => (
          <Knob
            key={index}
            idNumber={knob.id}
            dispText={knob.value}
            change={this.change}
            name={knob.name}
            id={"knob-" + index}
          ></Knob>
        ))}
      </div>
    );
  }
}

export default KnobHandler;
