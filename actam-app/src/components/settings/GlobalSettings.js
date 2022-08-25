import React, { Component } from "react";
import CheckButton from "./CheckButton";
import Knob from "./Knob";
import { assignables, master } from "../../scripts/GlobalVariables";
import "./GlobalSettings.css";
import SettingsButton from "./SettingsButton";

class GlobalSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loop: false,
      legato: false,
      masterVolume: 0.5,
    };

    this.clickLoop = this.clickLoop.bind(this);
    this.clickLegato = this.clickLegato.bind(this);
    this.changeKnob = this.changeKnob.bind(this);
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

  changeKnob(value) {
    this.setState(() => ({
      masterVolume: value,
    }));
    master.gain.value = value;
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
        <div className="global-settings-div2">
          <Knob
            id="master-volume-knob"
            idNumber="0"
            dispText={this.state.knobText}
            change={this.changeKnob}
            name="master"
            minRange={0}
            maxRange={1}
            initial={0.5}
            img="k0-1-2"
          />
        </div>
      </div>
    );
  }
}

export default GlobalSettings;
