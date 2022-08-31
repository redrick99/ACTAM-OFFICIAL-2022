import React, { Component } from "react";
import CheckButton from "./CheckButton";
import Knob from "./Knob";
import { assignables, master } from "../../scripts/GlobalVariables";
import "./GlobalSettings.css";
import SettingsButton from "./SettingsButton";
import OctaveSelector from "./OctaveSelector";

class GlobalSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loop: false,
      legato: false,
      octave: 0,
    };

    this.clickLoop = this.clickLoop.bind(this);
    this.clickLegato = this.clickLegato.bind(this);
    this.clickUp = this.clickUp.bind(this);
    this.clickDown = this.clickDown.bind(this);
  }

  clickLoop() {
    assignables.loop = !this.state.loop;
    this.setState((prevState) => ({
      loop: !prevState.loop,
    }));
  }

  clickLegato() {
    assignables.legato = !this.state.legato;
    this.setState((prevState) => ({
      legato: !prevState.legato,
    }));
  }

  clickUp() {
    if(this.state.octave === 1) {
      return;
    }
    assignables.octaveShift++;
    this.setState((prevState) => ({
      octave: prevState.octave + 1,
    }));
  }

  clickDown() {
    if(this.state.octave === -1) {
      return;
    }
    assignables.octaveShift--;
    this.setState((prevState) => ({
      octave: prevState.octave - 1,
    }));
  }

  render() {
    return (
      <div className="global-settings">
        <div className="global-settings-div1">
          <CheckButton
            id="loop-button"
            className="loop-button"
            checked={this.state.loop}
            text=""
            title={this.state.loop ? "Deactivate Loop" : "Activate Loop"}
            click={this.clickLoop}
          />
          <CheckButton
            id="legato-button"
            className="legato-button"
            checked={this.state.legato}
            text=""
            title={this.state.legato ? "Deactivate Legato" : "Activate Legato"}
            click={this.clickLegato}
          />
        </div>
        <OctaveSelector active={this.props.octaveActive} value={this.state.octave} min={-1} max={0} clickUp={this.clickUp} clickDown={this.clickDown} />
      </div>
    );
  }
}

export default GlobalSettings;
