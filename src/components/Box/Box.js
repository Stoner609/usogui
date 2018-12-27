import React, { Component } from "react";

import "./Box.css";

export class Box extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {}

  clickBox = () => {
    let locationIndex = this.props.index;
    this.props.clickBox(locationIndex);
  };

  render() {
    let radiusColor =
      this.props.who.name === "leftPlayer"
        ? "radius radius_red"
        : "radius radius_green";
    let radius =
      this.props.who.name == null ? null : <div className={radiusColor} />;

    return (
      <div className="box" onClick={this.clickBox}>
        {radius}
      </div>
    );
  }
}

export default Box;
