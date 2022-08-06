import React, { Component } from "react";
import ReactDOM from "react-dom";
import imageKnob from "./knob.png";

import "./Knob.css";

class Knob extends Component {
  constructor(props) {
    super(props);

    // Binding all functions to "this"
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.rotate = this.rotate.bind(this);
  }
  /**
   * Every knob has a private state to monitor if the knob is or not active and the value of itself
   */
  state = {
    isClicked: false,
    value: 0,
  };

  /**
   * If the knob is clicked, state.isClicked turns to true
   * @param {click} event
   */
  mouseDown(event) {
    if (!this.state.isClicked) {
      this.setState(() => ({
        isClicked: true,
      }));
    }
  }

  /**
   * When the mouse is released state.isClicked turns to false
   * @param {mouse release} event
   */
  mouseUp(event) {
    if (this.state.isClicked) {
      this.setState(() => ({
        isClicked: false,
      }));
    }
  }

  /**
   * When the mouse leaves the component state.isClicked turns to false
   * @param {mouse leave} event
   */
  mouseLeave(event) {
    if (this.state.isClicked) {
      this.mouseUp();
    }
  }

  /**
   * When the mouse is moved this function handle the rotation of the knob image basing it on the position of the mouse
   * @param {mouse move} event
   */
  rotate(event) {
    if (this.state.isClicked) {
      const knobPos = event.target.getBoundingClientRect();

      const centerKnobY = (knobPos.bottom - knobPos.top) / 2;
      const centerKnobX = (knobPos.right - knobPos.left) / 2;

      const posX = event.clientX - knobPos.left;
      const posY = event.clientY - knobPos.top;
      const x = posX - centerKnobX;
      const y = posY - centerKnobY;

      var deg = (Math.atan(y / x) * 180) / Math.PI;

      if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
        deg += 270;
      } else {
        deg += 90;
      }
      if (deg < 135 || deg > 225) {
        event.target.style.transform = "translate(35%, -160%) rotate(" + deg + "deg)";
        if (deg > 225 && deg <= 360) {
          deg = deg / 360 - 225 / 360;
          if (deg >= 1) deg = 0;
        } else {
          deg = deg / 360 + 1 - 225 / 360;
        }
        deg = ((deg * 4) / 3) * (this.props.maxRange - this.props.minRange) + this.props.minRange;
        this.props.change(deg);
        this.setState(() => ({
          value: deg,
        }));
      } else this.mouseUp();
    }
  }

  /**
   * After the render the position of the knob is set to the one specified on the props
   */
  componentDidMount() {
    var unity;
    var initialDeg = this.props.initial;
    unity = 135 / ((this.props.maxRange - this.props.minRange) / 2);
    initialDeg = unity * initialDeg - 135 - this.props.minRange * unity;
    document.getElementById(this.props.id).style.transform = "translate(35%, -160%) rotate(" + initialDeg + "deg)";
    this.setState(() => ({
      value: this.props.initial,
    }));
  }

  /**
   *
   * @param {input change} event
   */
  changeValue(event) {
    if (
      (event.target.value >= this.props.minRange && event.target.value <= this.props.maxRange) ||
      event.target.value == 0
    ) {
      var initialDeg = event.target.value;
      var unity;
      unity = 135 / ((this.props.maxRange - this.props.minRange) / 2);
      initialDeg = unity * initialDeg - 135 - this.props.minRange * unity;
      document.getElementById(this.props.id).style.transform = "translate(35%, -160%) rotate(" + initialDeg + "deg)";
      this.setState(() => ({
        value: event.target.value,
      }));
    }
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor={this.props.id}>{this.props.name}</label>
        <div>
          <input
            onInputCapture={this.changeValue}
            id={"input" + this.props.id}
            value={this.state.value.toString().slice(0, 4)}
            onChange={this.changeValue}
            className="inputField"
          />
        </div>

        <div className={"imgKnobIndicator " + this.props.img}></div>

        <div
          className="imgKnob"
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onMouseMove={this.rotate}
          onDrag={(e) => {
            e.preventDefault();
          }}
          onDragStart={(e) => e.preventDefault()}
          onDragEnd={(e) => e.preventDefault()}
          onMouseLeave={this.mouseLeave}
          id={this.props.id}
        />
      </React.Fragment>
    );
  }
}

export default Knob;
