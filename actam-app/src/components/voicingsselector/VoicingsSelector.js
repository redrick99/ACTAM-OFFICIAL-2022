import React, { Component } from "react";
import Selector from "./Selector";
import textParagraphs from "./VoicingsSelectorDescriptions";
import "./VoicingsSelector.css";
import SettingsButton from "../settings/SettingsButton";
import KnobHandler from "../settings/KnobHandler";
import PrinterButton from "../settings/PrinterButton";
import chordAudioHandler from "../../scripts/ChordAudioHandler";
import midiHandler from "../../scripts/MidiHandler";
import CheckButton from "../settings/CheckButton";
import VolumeControls from "../settings/VolumeControls";
import { assignables, master } from "../../scripts/GlobalVariables";
import Knob from "../settings/Knob";

// Names of the voicings types
const names = ["Rootless", "Monk", "Powell", "Three Notes", "Four Notes", "Open Chord"];

// Types of voicings divided by the voicings' indexes
const types = [
  ["Type 1", "Type 2"],
  ["Type 1"],
  ["Type 1", "Type 2", "Type 3", "Type 4"],
  ["Type 1"],
  ["Type 1"],
  ["Type 1", "Type 2"],
];

/**
 * Functions to be used by knobs to control chord audio settings
 */
const audioChordSettings = [
  (value) => {
    chordAudioHandler.getInstrument().cGain.gain.value = value;
  },
  (value) => {
    chordAudioHandler.getInstrument().rGain.gain.value = value;
  },
  (value) => {
    chordAudioHandler.getInstrument().sampler.attack = value;
  },
  (value) => {
    chordAudioHandler.getInstrument().sampler.release = value;
  },
];

/**
 * Functions to be used by knobs to control MIDI audio settings
 */
const audioMelodySettings = [
  (value) => {
    midiHandler.getInstrument().cGain.gain.value = value;
  },
  (value) => {
    midiHandler.getInstrument().rGain.gain.value = value;
  },
  (value) => {
    midiHandler.getInstrument().sampler.attack = value;
  },
  (value) => {
    midiHandler.getInstrument().sampler.release = value;
  },
];

/**
 * Functions to be used by knobs to control volume settings
 */
const volumeSettings = [
  (value) => {
    master.gain.value = value;
  },
  (value) => {
    chordAudioHandler.getInstrument().volume.gain.value = value;
  },
  (value) => {
    midiHandler.getInstrument().volume.gain.value = value;
  },
];

/**
 * Changes the bpm of the played chords
 * @param {number} value of the bpm
 */
const changeBpm = (value) => {
  if (value == 0) value = 1;
  assignables.bpm = Math.trunc(value);
};

/**
 * Contains the selectors for the types of voicings, their descriptions and
 * Buttons to change the app's settings
 */
class VoicingsSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Currently selected voicings type
      selectedName: 0,
      // Currently selected voicings sub-type
      selectedType: 0,
      // Used to show the settings
      settings: false,
      globalSettings: false,
    };

    this.clickName = this.clickName.bind(this);
    this.clickType = this.clickType.bind(this);
    this.activeSettings = this.activeSettings.bind(this);
    this.activeMidi = this.activeMidi.bind(this);
    this.print = this.print.bind(this);
  }

  /**
   * Fired when the name of a voicing is clicked inside the selector
   * @param {number} index of the clicked option
   */
  clickName(index) {
    this.setState(() => ({
      selectedName: index,
      selectedType: 0,
    }));
    assignables.selectedName = index;
    assignables.selectedType = 0;
    this.props.changeVoicingsType(index);
  }

  /**
   * Fired when the type of voicing is clicked inside the selector
   * @param {number} index of the clicked option
   */
  clickType(index) {
    this.setState(() => ({
      selectedType: index,
    }));
    assignables.selectedType = index;
  }

  activeSettings() {
    if (!this.state.settings) {
      this.setState(() => ({
        settings: true,
        globalSettings: false,
      }));
    } else {
      this.setState(() => ({
        settings: false,
        globalSettings: false,
      }));
    }
  }

  activeMidi() {
    if (!this.state.globalSettings) {
      this.setState(() => ({
        globalSettings: true,
        settings: false,
      }));
    } else {
      this.setState(() => ({
        globalSettings: false,
        settings: false,
      }));
    }
  }

  print() {
    // Function to print all the chords and maybe the sheet
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
                  <CheckButton
                    id="global-settings-button"
                    className="global-settings-button"
                    click={this.activeMidi}
                    checked={this.state.globalSettings}
                    title="Open global settings to control the volume and the bpm"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <PrinterButton id="printer-button" className="printer-button" print={this.print} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className={
            "voicings-description-container" + (this.state.settings || this.state.globalSettings ? " hidden" : " ")
          }
        >
          <h2 className="voicings-name">{names[this.state.selectedName]}</h2>
          <div className="voicings-description">
            <div className="paragraph-1">{tP[0]}</div>
            <div className="paragraph-2">{tP[1]}</div>
            <div className="paragraph-3">{tP[2]}</div>
          </div>
        </div>
        <div className={"voicings-description-container" + (this.state.settings ? " " : " hidden")}>
          <div className="chords-player-settings">
            <p className="settings-name">
              <b>Chords Player Settings</b>
            </p>
            <KnobHandler idNumber={0} change={audioChordSettings}></KnobHandler>
          </div>
          <div className="melody-player-settings">
            <p className="settings-name">
              <b>MIDI Keyboard Settings</b>
            </p>
            <KnobHandler idNumber={4} change={audioMelodySettings}></KnobHandler>
          </div>
        </div>
        <div className={"voicings-description-container" + (this.state.globalSettings ? " " : " hidden")}>
          <h2 className="voicings-name">Global Settings</h2>
          <VolumeControls change={volumeSettings}></VolumeControls>
          <div className="other-controls">
            <Knob
              key={10}
              idNumber={10}
              change={changeBpm}
              name="bpm"
              id="knob-1-bpm"
              minRange={1}
              maxRange={200}
              initial={60}
              img="k0-200"
              discrete="true"
            ></Knob>
          </div>
        </div>
      </div>
    );
  }
}

export default VoicingsSelector;
