import React, { Component } from "react";
import ReactDOM from "react-dom";
import imageKnob from "./knob.png";

import "./Knob.css";

class Knob extends Component {
  constructor(props) {
    super(props);

    this.change = this.change.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);

    this.rotate = this.rotate.bind(this);
  }

  state = {
    isClicked: false,
  };

  change(event) {
    this.props.change(event.target.value, this.props.idNumber);
  }

  mouseDown(event) {
    if (!this.state.isClicked) {
      this.setState(() => ({
        isClicked: true,
      }));
    }
  }

  mouseUp(event) {
    if (this.state.isClicked) {
      this.setState(() => ({
        isClicked: false,
      }));

      console.log("ESCOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    }
  }

  mouseLeave(event) {
    if (this.state.isClicked) {
      this.mouseUp();
    }
  }

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
        event.target.style.transform = "translate(0%, -100%) rotate(" + deg + "deg)";
      } else this.mouseUp();

      //this.props.rotate(deg);
    }
  }

  componentDidMount() {
    document.getElementById(this.props.id).style.transform = "translate(0%, -100%) rotate(225deg)";
  }

  render() {
    return (
      <div className={this.props.className}>
        <div>
          <label htmlFor={this.props.id}>{this.props.name}</label>
          <div className="imgKnobIndicator"></div>
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
        </div>
      </div>
    );
  }
}

export default Knob;
