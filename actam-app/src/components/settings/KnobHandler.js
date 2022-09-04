import React, { Component } from "react";
import Knob from "./Knob";

/**
 * Handles the knobs of the instrument settings
 */
class KnobHandler extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="divCont">
        <table className="controller">
          <tbody>
            <tr>
              <td>
                <Knob
                  key="1"
                  idNumber={1}
                  dispText={this.props.value}
                  change={this.props.change[0]}
                  name="chorus"
                  id={"knob-" + (1 + this.props.idNumber)}
                  minRange={0}
                  maxRange={1}
                  initial={0}
                  img="k0-1-2"
                ></Knob>
              </td>
              <td>
                <Knob
                  key="2"
                  idNumber={2}
                  dispText={this.props.value}
                  change={this.props.change[1]}
                  name="reverb"
                  id={"knob-" + (2 + this.props.idNumber)}
                  minRange={0}
                  maxRange={1}
                  initial={0}
                  img="k0-10"
                ></Knob>
              </td>
              <td>
                <Knob
                  key="3"
                  idNumber={3}
                  dispText={this.props.value}
                  change={this.props.change[2]}
                  name="attack"
                  id={"knob-" + (3 + this.props.idNumber)}
                  minRange={0}
                  maxRange={100}
                  initial={0}
                  img="k0-100"
                ></Knob>
              </td>
              <td>
                <Knob
                  key="4"
                  idNumber={4}
                  dispText={this.props.value}
                  change={this.props.change[3]}
                  name="release"
                  id={"knob-" + (4 + this.props.idNumber)}
                  minRange={0}
                  maxRange={1000}
                  initial={0}
                  img="k0-1000"
                  discrete="true"
                ></Knob>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default KnobHandler;
