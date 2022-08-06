import React, { Component } from "react";
import Knob from "./Knob";

class KnobHandler extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="divCont">
        <table className="controller" height="190px">
          <tbody height="190px">
            <tr height="190px">
              <td height="190px">
                <Knob
                  key="0"
                  idNumber={0}
                  dispText={this.props.value}
                  change={this.props.change[0]}
                  name="volume"
                  id={"knob-0"}
                  minRange={0}
                  maxRange={10}
                  initial={3}
                  img="k0-10"
                ></Knob>
              </td>
              <td height="190px">
                <Knob
                  key="1"
                  idNumber={1}
                  dispText={this.props.value}
                  change={this.props.change[1]}
                  name="chorous"
                  id={"knob-1"}
                  minRange={0}
                  maxRange={1}
                  initial={0.1}
                  img="k0-1-2"
                ></Knob>
              </td>
              <td height="190px">
                <Knob
                  key="2"
                  idNumber={2}
                  dispText={this.props.value}
                  change={this.props.change[2]}
                  name="reverb"
                  id={"knob-2"}
                  minRange={0}
                  maxRange={1}
                  initial={0.7}
                  img="k0-10"
                ></Knob>
              </td>
              <td height="190px">
                <Knob
                  key="3"
                  idNumber={3}
                  dispText={this.props.value}
                  change={this.props.change[3]}
                  name="attack"
                  id={"knob-3"}
                  minRange={0}
                  maxRange={1}
                  initial={0.7}
                  img="k0-10"
                ></Knob>
              </td>
              <td height="190px">
                <Knob
                  key="4"
                  idNumber={4}
                  dispText={this.props.value}
                  change={this.props.change[4]}
                  name="release"
                  id={"knob-4"}
                  minRange={0}
                  maxRange={100}
                  initial={90}
                  img="k0-10"
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
