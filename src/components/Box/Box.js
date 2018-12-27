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
    let shining = "";
    if (
      this.props.currentPlayer === "leftPlayer" &&
      this.props.who.name === "leftPlayer"
    ) {
      shining = "radius_red_animation";
    } else if (
      this.props.currentPlayer === "rightPlayer" &&
      this.props.who.name === "rightPlayer"
    ) {
      shining = "radius_green_animation";
    }

    let radiusColor =
      this.props.who.name === "leftPlayer"
        ? ["radius", "radius_red", `${shining}`]
        : ["radius", "radius_green", `${shining}`];

    let radius =
      this.props.who.name == null ? null : (
        <div className={radiusColor.join(" ")} />
      );

    return (
      <div className="box" onClick={this.clickBox}>
        {radius}
      </div>
    );
  }
}

export default Box;
