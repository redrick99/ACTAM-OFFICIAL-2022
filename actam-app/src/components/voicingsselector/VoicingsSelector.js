import React, { Component } from "react";
import Selector from "./Selector";
import textParagraphs from "./VoicingsSelectorDescriptions";
import voicingsHandler from "../../scripts/VoicingsHandler";
import "./VoicingsSelector.css";
import SettingsButton from "../settings/SettingsButton";
import MidiButton from "../settings/MidiButton";
import KnobHandler from "../settings/KnobHandler";
import chordAudioHandler from "../../scripts/ChordAudioHandler";

const functionsMap = [
  "Rootless-Type 1",
  "Rootless-Type 2",
  "Monk-Type 1",
  "Powell-Type 1",
  "Powell-Type 2",
  "Powell-Type 3",
  "Powell-Type 4",
  "Three Notes-Type 1",
  "Four Notes-Type 1",
  "Open Chord-Type 1",
  "Open Chord-Type 2",
];

const names = ["Rootless", "Monk", "Powell", "Three Notes", "Four Notes", "Open Chord"];

const types = [
  ["Type 1", "Type 2"],
  ["Type 1"],
  ["Type 1", "Type 2", "Type 3", "Type 4"],
  ["Type 1"],
  ["Type 1"],
  ["Type 1", "Type 2"],
];

const audioChordSettings = [
  (value) => {
    chordAudioHandler.getInstrument().volume.gain.value = value;
  },
  (value) => {
    chordAudioHandler.getInstrument().chorus.wet.value = value;
  },
  (value) => {
    chordAudioHandler.getInstrument().rever.wet.value = value;
  },
  (value) => {
    chordAudioHandler.getInstrument().attack = value;
  },
  (value) => {
    chordAudioHandler.getInstrument().release = value;
  },
];

class VoicingsSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedName: 0,
      selectedType: 0,
      settings: false,
      midi: false,
    };

    this.clickName = this.clickName.bind(this);
    this.clickType = this.clickType.bind(this);
    this.activeSettings = this.activeSettings.bind(this);
    this.activeMidi = this.activeMidi.bind(this);
  }

  clickName(index) {
    this.setState(() => ({
      selectedName: index,
      selectedType: 0,
    }));
    const fIndex = functionsMap.indexOf(names[index] + "-" + "Type 1");
    if (fIndex) {
      voicingsHandler.setVoicingsType(fIndex);
    }
  }

  clickType(index) {
    this.setState(() => ({
      selectedType: index,
    }));
    const fIndex = functionsMap.indexOf(names[this.state.selectedName] + "-" + types[this.state.selectedName][index]);
    if (fIndex) {
      voicingsHandler.setVoicingsType(fIndex);
    }
  }

  activeSettings() {
    if (!this.state.settings) {
      this.setState(() => ({
        settings: true,
        midi: false,
      }));
    } else {
      this.setState(() => ({
        settings: false,
        midi: false,
      }));
    }
  }

  activeMidi() {
    if (!this.state.midi) {
      this.setState(() => ({
        midi: true,
        settings: false,
      }));
    } else {
      this.setState(() => ({
        midi: false,
        settings: false,
      }));
    }
  }

  render() {
    const tP = textParagraphs[this.state.selectedName];
    return (
      <div className="voicings-selector-container">
        <div className="voicings-selector">
          <Selector
            id="name-selector"
            className="names-selector"
            options={names}
            selectedOption={this.state.selectedName}
            click={this.clickName}
          />
          <Selector
            id="type-selector"
            className="names-selector"
            options={types[this.state.selectedName]}
            selectedOption={this.state.selectedType}
            click={this.clickType}
          />
          <table>
            <tbody>
              <tr>
                <td>
                  <SettingsButton
                    id="settings-button"
                    className="settings-button"
                    active={this.activeSettings}
                    state={this.state.settings}
                  />
                </td>
                <td>
                  <MidiButton
                    id="midi-button"
                    className="midi-button"
                    active={this.activeMidi}
                    state={this.state.midi}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={"voicings-description-container" + (this.state.settings || this.state.midi ? " hidden" : " ")}>
          <h2 className="voicings-name">{names[this.state.selectedName]}</h2>
          <div className="voicings-description">
            <div className="paragraph-1">{tP[0]}</div>
            <div className="paragraph-2">{tP[1]}</div>
            <div className="paragraph-3">{tP[2]}</div>
          </div>
        </div>
        <div className={"voicings-description-container" + (this.state.settings ? " " : " hidden")}>
          <h2 className="voicings-name">Settings</h2>
          <KnobHandler change={audioChordSettings}></KnobHandler>
        </div>
        <div className={"voicings-description-container" + (this.state.midi ? " " : " hidden")}>
          <h2 className="voicings-name">MIDI controls</h2>
        </div>
      </div>
    );
  }
}

export default VoicingsSelector;
